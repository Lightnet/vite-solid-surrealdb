https://github.com/surrealdb/surrealdb

https://surrealdb.com/docs/integration/libraries/javascript

```
surreal start --log debug --user root --pass root memory
```


```js
import Surreal from 'surrealdb.js';

const db = new Surreal('http://127.0.0.1:8000/rpc');

async function main() {

	try {

		// Signin to a scope from the browser
		await db.signin({
			NS: 'test',
			DB: 'test',
			SC: 'user',
			user: 'info@surrealdb.com',
			pass: 'my-secret-password',
		});

		// Select a specific namespace / database
		await db.use('test', 'test');

		// Create a new person with a random id
		let created = await db.create("person", {
			title: 'Founder & CEO',
			name: {
				first: 'Tobie',
				last: 'Morgan Hitchcock',
			},
			marketing: true,
			identifier: Math.random().toString(36).substr(2, 10),
		});

		// Update a person record with a specific id
		let updated = await db.change("person:jaime", {
			marketing: true,
		});

		// Select all people records
		let people = await db.select("person");

		// Perform a custom advanced query
		let groups = await db.query('SELECT marketing, count() FROM type::table($tb) GROUP BY marketing', {
			tb: 'person',
		});

	} catch (e) {

		console.error('ERROR', e);

	}

}

main();
```

Thunder client ext vscode

header
```
NS: root
DB: root
```
Auth:
```
username: root
password:root
```



Body > Text > Text Content
```
CREATE human CONTENT {
   nickname: "test",
   age: "99", 
   gender: "male"
};
```




