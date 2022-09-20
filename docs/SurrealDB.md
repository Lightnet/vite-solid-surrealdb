https://github.com/surrealdb/surrealdb

https://surrealdb.com/docs/integration/libraries/javascript

```
surreal start --log debug --user root --pass root memory
```

- https://surrealdb.com/features

```sql
-- Enable scope authentication directly in SurrealDB
DEFINE SCOPE account SESSION 24h
	SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
	SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```

```js
// Signin and retrieve a JSON Web Token
let jwt = fetch('https://api.surrealdb.com/signup', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'NS': 'google', // Specify the namespace
		'DB': 'gmail', // Specify the database
    },
	body: JSON.stringify({
		email: 'test@test.test',
		pass: 'root'
	}),
});
```

```sql
-- Specify access permissions for the 'post' table
DEFINE TABLE post SCHEMALESS
	PERMISSIONS
		FOR select
			-- Published posts can be selected
			WHERE published = true
			-- A user can select all their own posts
			OR user = $auth.id
		FOR create, update
			-- A user can create or update their own posts
			WHERE user = $auth.id
		FOR delete
			-- A user can delete their own posts
			WHERE user = $auth.id
			-- Or an admin can delete any posts
			OR $auth.admin = true
;
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
```sql
CREATE human CONTENT {
   nickname: "test",
   age: "99", 
   gender: "male"
};
```




