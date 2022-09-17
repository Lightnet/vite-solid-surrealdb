

# set up guide:
- Install Nodejs
- install SurrealDB or download the window execute.


## database:
  Need to set up database first else it will hang. When loading the http server.

```
@echo off
surreal start --log debug --user root --pass root memory
pause
```

First we need to set up database. No script yet.

- https://surrealdb.com/docs/surrealql/datamodel/simple
# users:
  Need to set up user and permission. As for the reason for permission is to make sure that email use once.

```sql
CREATE user SET children = null;
```
  Needed for signup else it will error if not exist.

```sql
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
```

# SCOPE for signup and signin:

```sql
DEFINE SCOPE allusers
SESSION 14d
SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
```

  Reason for this DEFINE SCOPE for signup params.

```js
let token = await db.signup({
  NS: 'test',
  DB: 'test',
  SC: 'allusers',
  email: alias +'@surrealdb.test',
  pass: passphrase,
  marketing: true,
  tags: ['rust', 'golang', 'javascript'], // We can add any variable here to use in the SIGNUP clause
});
```

```sql
SELECT * FROM user;
```
  show all user list from http rest api request.


