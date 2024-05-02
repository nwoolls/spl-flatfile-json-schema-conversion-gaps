import { FlatfileEvent, FlatfileListener } from '@flatfile/listener';
import { FlatfileRecord, recordHook } from '@flatfile/plugin-record-hook';

import api from '@flatfile/api';

import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { configureSpaceWithJsonSchema } from "@flatfile/plugin-convert-json-schema";

import { blueprint } from './blueprint';
import { exampleSchema } from "./example-schema";

const namespace = ['space:example-import']
const webhookReceiver = process.env.WEBHOOK_SITE_URL || "YOUR_WEBHOOK_URL";

export default function flatfileEventListener(listener: FlatfileListener) {
  listener.use(ExcelExtractor());

  listener.use(
    configureSpaceWithJsonSchema({
      workbooks: [
        {
          name: "Example Workbook",
          sheets: [
            {
              name: "Example Sheet",
              source: {
                ...exampleSchema.schema
              }
            },
          ],
        },
      ],
    })
  );

  listener.on('**', (event: FlatfileEvent) => {
    console.log('Event Received: ' + event.topic);
  })

  listener.namespace(namespace, (namespacedEvents) => {
    namespacedEvents.filter({ job: 'space:configure' }, (configure) => {
      configure.on(
        'job:ready',
        async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
          try {
            await api.jobs.ack(jobId, {
              info: "Gettin started.",
              progress: 10,
            })

            await api.workbooks.create({
              spaceId,
              environmentId,
              ...blueprint,
              actions: [
                {
                  operation: 'submitAction',
                  mode: 'foreground',
                  label: 'Submit',
                  primary: true
                },
              ],
            })

            await api.jobs.complete(jobId, {
              outcome: {
                message: "Your Space was created. Let's get started.",
                acknowledge: true,
              },
            })
          } catch (error) {
            await api.jobs.fail(jobId, {
              outcome: {
                message: "Creating a Space encountered an error. See Event Logs.",
                acknowledge: true,
              },
            })
          }
        }
      )
    })

    namespacedEvents.use(
      recordHook('example', (record: FlatfileRecord) => {
        // Validate and transform a Record's first name
        const value = record.get("first_name");
        if (typeof value === "string") {
          record.set("first_name", value.toLowerCase());
        } else {
          record.addError("first_name", "Invalid first name");
        }

        // Validate a Record's email address
        const email = record.get("email") as string;
        const validEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!validEmailAddress.test(email)) {
          console.log("Invalid email address");
          record.addError("email", "Invalid email address");
        }

        return record;
      })
    )

    namespacedEvents
      .filter({ job: 'workbook:submitAction' })
      .on('job:ready', async (event: FlatfileEvent) => {
        const { payload } = event;
        const { jobId, workbookId } = event.context;

        // Acknowledge the job
        try {
          await api.jobs.ack(jobId, {
            info: "Starting job to submit action to webhook.site",
            progress: 10,
          });

          // Collect all Sheet and Record data from the Workbook
          const { data: sheets } = await api.sheets.list({ workbookId });
          const records: { [name: string]: any } = {};
          for (const [index, element] of sheets.entries()) {
            records[`Sheet[${index}]`] = await api.records.get(element.id);
          }

          console.log(JSON.stringify(records, null, 2));

          // Send the data to our webhook.site URL
          const response = await fetch(webhookReceiver, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...payload,
              method: "fetch",
              sheets,
              records,
            }),
          });

          if (response.status !== 200) {
            throw new Error("Failed to submit data to webhook.site");
          }

          // Otherwise, complete the job
          await api.jobs.complete(jobId, {
            outcome: {
              message: `Data was successfully submitted to Webhook.site. Go check it out at ${webhookReceiver}.`,
            },
          });
        } catch (error) {
          // If an error is thrown, fail the job
          console.log(`webhook.site[error]: ${JSON.stringify(error, null, 2)}`);
          await api.jobs.fail(jobId, {
            outcome: {
              message: `This job failed. Check your ${webhookReceiver}.`,
            },
          });
        }
      }
    );
  });
}
