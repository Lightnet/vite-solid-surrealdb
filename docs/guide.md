
# Surreal Database Features:

	To have up to date modern type of database in sql.

	Required some knowlege using some http request for REST SQL.

	There is client REST API.

	Note learning not read the docs fully.

# Guide:
 - https://www.youtube.com/watch?v=LCAIkx1p1k0

## Types / Features:
- graph
- relatational
- key,value
- document
- REST Endpoints
- user / auth

## table system
	The sql logic is diferent. But update to reflect features.

```
CREATE table:id
```

```
CREATE table
```
by default random id


https://www.youtube.com/watch?v=DPQbuW9dQ7w


```js
// ns = namespace
// db = database
db.use(ns, db)

```

```js
// https://github.com/surrealdb/surrealdb/issues/144
// ns = namespace
// db = database
// sc = scope 
// 
let token = await db.signup({
	NS: 'test',
	DB: 'test',
	SC: 'user',
	email: 'info@surrealdb.com',
	pass: '123456',
});

```
	Note need to set up event call checks.
```
DEFINE SCOPE allusers 
SESSION 14d
SIGNUP (
  CREATE type::thing("user", string::lowercase(string::trim($id)))
  SET pass = crypto::argon2::generate($pass)
)
SIGNIN (
  SELECT * FROM type::thing("user", string::lowercase(string::trim($id)))
  WHERE crypto::argon2::compare(pass, $pass)
)
```
	Link to ref:
- https://surrealdb.com/docs/integration/http
- https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b
```
```


https://discord.com/channels/902568124350599239/970336107206176768/1021171970118795356


If authenticating as a NAMESPACE user...
```
USE NS test;
DEFINE LOGIN my_login ON NAMESPACE PASSWORD '123456';

db.signin({
  NS: 'test',
  user: 'my_login',
  pass: '123456',
});
```


```
USE NS test DB test;
DEFINE LOGIN my_login ON DATABASE PASSWORD '123456';


db.signin({
  NS: 'test',
  DB: 'test',
  user: 'my_login',
  pass: '123456',
});
```

If authenticating as a SCOPE user...
```
USE NS test DB test;
DEFINE SCOPE allusers SESSION 24h
  SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```
```
db.signup({
  NS: 'test',
  DB: 'test',
  SC: 'mu_scope',
  email: 'me@acme.com',
  pass: '123456',
  interests: ['my', 'hobbies'],
});
db.signin({
  NS: 'test',
  DB: 'test',
  SC: 'mu_scope',
  email: 'me@acme.com',
  pass: '123456',
});
```
```js
let jwt = await fetch(`http://localhost:8000/signup`, {
	method: 'POST',
	mode: 'no-cors',
	//credentials:"omit",
	headers: {
		'Content-Type': 'application/json',
		'NS': 'test', // Specify the namespace
		'DB': 'test', // Specify the database
		'SC': 'allusers' // Specify the scope
	},
	body: JSON.stringify({
		NS: 'test',
		DB: 'test',
		SC:'allusers',
		email: 'test2@test.test',
		pass: 'pass'
	}),
})
```
	Note error check if signup again there no feedback on fail.

	Note that dev fetch does not work for some reason.
```

```

# browser client
```
Surreal
-constructor
-static get Instance()
-static get AuthenticationError()
-static get PermissionError()
-static get RecordError()
-static get Live()
-connect(url)
-
-sync(query, vars)
-wait()
-close()
-ping()
-use(ns, db)
-info()
-signup(vars)
-signin(vars) 
-invalidate()
-authenticate(token)
-live(table)
-kill(query) 
-let(key, val)
-query(query, vars)
-select(thing)
-create(thing, data)
-update(thing, data)
-change(thing, data)
- modify(thing, data)
- delete(thing)

```


```
USE NS test DB test;
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, create NONE;
```

```
USE NS test DB test;
DEFINE TABLE message DROP;
SELECT * FROM message;
```