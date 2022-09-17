
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



