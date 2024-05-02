# README

This example demonstrates various gaps in the functionality of the `@flatfile/plugin-convert-json-schema` plugin, including:

* No support for labels found in the JSON Schema
* No support for Regular Expression validation found in the JSON Schema
* No support for enumerations found in the JSON Schema

## Steps

1. Rename `.env.example` to `.env` and `/demo/public/env.example.js` to `/demo/public/env.js` and provide appropriate values
2. Run `npx flatfile develop`
3. Open `/demo/public/index.html`
4. Drop and drop `/demo/local/example.xlsx`
5. **NOTE** that the destination fields **do not** use the values for "label" in `example-schema.js`
6. Map fields and click **Continue**
7. **NOTE** that the following values are considered valid when they **should be invalid** based on the JSON Schema definition:
    * A value of 'asdf' for "employee_number"
    * A value of '13' for "birth_month"
    * A value of '100' for "birth_day"
    * A value of '123' for "cell_phone"
    * A value of 'fizz.buzz' for "email_address"
    * A value of 'asdf' for "start_date" and "end_date"
    * A value of 'Space' for "location"
    * A value of 'Astronaut' for "role"
8. **NOTE** that clicking into the "location" or "role" fields **does not** provide a drop down with enum values from the JSON Schema definition
