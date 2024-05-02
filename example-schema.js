export const exampleSchema = {
	"schema": {
		"properties": {
			"employee_number": {
				"type": "string",
				"label": "Employee Number",
				"regexp": {
					"pattern": "^\\d{6}$",
					"flags": "",
					"ignoreBlanks": true
				}
			},
			"first_name": {
				"type": "string",
				"label": "First Name"
			},
			"middle_initial": {
				"type": "string",
				"label": "MI",
				"regexp": {
					"pattern": "^\\w$",
					"flags": "",
					"ignoreBlanks": true
				}
			},
			"last_name": {
				"type": "string",
				"label": "Last Name"
			},
			"birth_month": {
				"type": "number",
				"label": "Birth Month",
				"minimum": 1,
				"maximum": 12
			},
			"birth_day": {
				"type": "number",
				"label": "Birth Day",
				"minimum": 1,
				"maximum": 31
			},
			"cell_phone": {
				"type": "string",
				"label": "Cell Phone",
				"regexp": {
					"pattern": "^\\d{10}$",
					"flags": "",
					"ignoreBlanks": false
				}
			},
			"email_address": {
				"type": "string",
				"label": "Email Address",
				"regexp": {
					"pattern": "^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$",
					"flags": "",
					"ignoreBlanks": false
				}
			},
			"start_date": {
				"type": "string",
				"label": "Start Date (mm/dd/yyyy)",
				"regexp": {
					"pattern": "^(0?[1-9]|1[012])[\\/](0?[1-9]|[12][0-9]|3[01])[\\/](19|20)\\d\\d$",
					"flags": "",
					"ignoreBlanks": false
				}
			},
			"end_date": {
				"type": "string",
				"label": "End Date (mm/dd/yyyy)",
				"regexp": {
					"pattern": "^(0?[1-9]|1[012])[\\/](0?[1-9]|[12][0-9]|3[01])[\\/](19|20)\\d\\d$",
					"flags": "",
					"ignoreBlanks": false
				}
			},
			"location": {
				"type": "string",
				"label": "Location",
				"enumLabel": [
					"Avengers Tower",
					"Taj Mahal",
					"Eiffel Tower",
					"Grand Canyon",
					"Space Needle",
					"Hogwarts School of Witchcraft and Wizardry"
				],
				"enum": [
					"88092753-fc29-45a7-a4cb-2fa6e25ba99e",
					"2bfe7626-9a91-4781-b97e-78afbe4e972c",
					"b668fc61-f9fe-47d7-b519-a3be3fb9dbc9",
					"3a93f975-8ff2-4486-9b2b-04e158c553b5",
					"6460725f-bb16-4632-841f-eca17f3a3953",
					"7775e980-ff42-4e3f-9f05-d85d3c3290c4"
				]
			},
			"role": {
				"type": "string",
				"label": "Role",
				"enumLabel": [
					"Administrator",
					"User",
					"Moderator",
					"Customer",
					"Developer",
					"Analyst"
				],
				"enum": [
					"d7be7881-1397-4a1e-9a33-e465588ad347",
					"51637fbe-b763-41d8-83af-2e5c8493214d",
					"61cbecb8-9a5f-411e-b4f3-6009aa8e0b1e",
					"0466916f-b1a3-43e7-a875-ab57900b7aa1",
					"ca9ca293-befd-4bd5-8503-0972e9389ab6",
					"c2e66860-da87-4edd-8424-98d3fb4b0c7d"
				]
			}
		},
		"type": "object",
		"required": [
			"first_name",
			"last_name",
			"birth_month",
			"birth_day",
			"cell_phone",
			"email_address",
			"start_date",
			"end_date",
			"location",
			"role"
		],
		"unique": []
	}
}