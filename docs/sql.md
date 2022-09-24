

https://discord.com/channels/902568124350599239/1013527402674139268/1021058706080813166

Each request is an object (SurrealQL object) which needs
1.  id field (random id, no necessary length, just a string)
2. method field (a string)
3. params field (an array of values)...

method can be... ping info use signup signin authenticate invalidate authenticate kill live let set query select create update change modify delete

params is an array with different requirements depending on the method...

ping empty array (ping is just used to keep connection open over some proxies - maybe set a poller to call this every 30 seconds or so)...
info empty array (used to get the current $auth object of the currently authenticated user - I'll explain better in due course)
use array with two string values [NS, DB],
    NS if set (and not undefined) will set the NAMESPACE
    DB if set (and not undefined) will set the DATABASE
signup takes one value which is an object (can accept any keys in the object)
signin takes one value which is an object (can accept any keys in the object)
authenticate takes one value which is a string (a JWT token)
invalidate empty array
kill takes one value which is a string (specifically a uuid)
live takes one value which is a string (the name of a table)
let takes two values, the first a string (the param name), the second any value (treated like JSON)
set alias for let
query takes two values, the first a string (SurrealQL query text), the second an object with any keys (parameters to be used in the sql query)
        returns an array of query results, each with an array of records (because you can send multiple statements in a single query)
select takes one value (the name of a table or a record id)
        returns an array of records (it takes just the first query resultset)
create takes two values, the first is the name of a table or a record id, the second is either undefined or an object (the record content)
        returns an array of records (it takes just the first query resultset)
update takes two values, the first is the name of a table or a record id, the second is either undefined or an object (the record content)
        returns an array of records (it takes just the first query resultset)
change takes two values, the first is the name of a table or a record id, the second is either undefined or an object (the record content)
        returns an array of records (it takes just the first query resultset)
modify takes two values, the first is the name of a table or a record id, the second is an array of JSONPatch objects to apply to the records
        returns an array of record DIFFS after thenchanges were made (it takes just the first query resultset)
delete takes one value,  the name of a table or a record id
        returns an array of records (which will be empty)


https://discord.com/channels/902568124350599239/970338835990974484/1021055305917931710

-  $auth will refer to the record which was returned in the SIGNUP or SIGNIN query. 
- $scope will be the name of the scope that the user signed in to
- $token will be the JWT token contents itself (coming in 1.0.0-beta.8)
- $session has various data about the session including ip/origin/ns/db/sc/auth data

https://discord.com/channels/902568124350599239/1020745271354851358/1020748427275018321

```
DEFINE SCOPE user SESSION 1h SIGNIN ( SELECT * FROM user WHERE user = $user AND crypto::argon2::compare(pass, $pass) AND $foo );
```
```
db.signin({
  NS: "experiments",
  DB: "test",
  SC: "user",
  user: "someuser",
  pass: "foobar",
  foo: true,
});
```

```
USE NS test DB test;
DEFINE SCOPE my_scope SESSION 24h
  SIGNUP (
    IF string::length($pass) > 6 THEN
      ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass), interests = $interests )
    ELSE
      NONE -- don't really need this else as it's the default...
    END
  )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```

https://discord.com/channels/902568124350599239/902568124350599242/1020694911680528384


```
-- Create a way for admin users to signin (you can also use external auth for this)...
DEFINE SCOPE admin SESSION 1h
  SIGNIN ( SELECT * FROM admin WHERE email = $email AND crypto::argon2::compare(pass, $pass) );
-- You can only update the role of a user if you are logged in as an admin user to the 'admin' scope.
DEFINE FIELD role ON TABLE user
  PERMISSIONS
    FOR select FULL,
    FOR create, update, delete WHERE $scope = 'admin';
```






```
CREATE message SET content ="Hello World!"
```

```
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
```

```
USE NS test DB test;
SELECT * FROM message;
DEFINE TABLE message SCHEMALESS
  PERMISSIONS
    FOR select, create NONE;
```


```
USE NS test DB test;
SELECT * FROM message;
DEFINE TABLE message SCHEMALESS
  PERMISSIONS NONE;
```


https://discord.com/channels/902568124350599239/1013527402674139268/1021485587091427449
```
DEFINE SCOPE user SESSION 1w
  SIGNUP (
    CREATE user
      SET
        email = $email,
        pass = crypto::argon2::generate($pass),
    )
    SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```

https://discord.com/channels/902568124350599239/970338835990974484/1020507595498324049

```
DEFINE TABLE lobby
  PERMISSIONS
    FOR select FULL
    FOR create, update, delete NONE;
DEFINE FIELD game ON lobby TYPE object;
DEFINE FIELD game.roles ON lobby TYPE array;
DEFINE FIELD game.roles[0] ON lobby TYPE object;
DEFINE FIELD game.roles[0].player ON lobby TYPE string;
DEFINE FIELD game.roles[0].role ON lobby TYPE string
  PERMISSIONS
    FOR select WHERE game.roles[0].player = $auth.id
    FOR update, create, delete NONE;
DEFINE FIELD game.roles[1] ON lobby TYPE object;
DEFINE FIELD game.roles[1].player ON lobby TYPE string;
DEFINE FIELD game.roles[1].role ON lobby TYPE string
  PERMISSIONS
    FOR select WHERE game.roles[1].player = $auth.id
    FOR update, create, delete NONE;
```

```
DEFINE TABLE lobby PERMISSIONS FOR SELECT WHERE $scope = "admin";
```

```
SELECT * FROM $auth.account; -- This would select the accunt field from the logged in user
```

https://discord.com/channels/902568124350599239/970338835990974484/1016425169797009479
```
DEFINE SCOPE allusers
  -- the JWT session will be valid for 14 days
  SESSION 14d
  -- The optional SIGNUP clause will be run when calling the signup method for this scope
  -- It is designed to create or add a new record to the database.
  -- If set, it needs to return a record or a record id
  -- The variables can be passed in to the signin method
  SIGNUP ( CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags )
  -- The optional SIGNIN clause will be run when calling the signin method for this scope
  -- It is designed to check if a record exists in the database.
  -- If set, it needs to return a record or a record id
  -- The variables can be passed in to the signin method
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
  -- this optional clause will be run when calling the signup method for this scope
```


https://discord.com/channels/902568124350599239/970338835990974484/1012104085811495034

```
DEFINE SCOPE admin;
DEFINE TOKEN firebase_auth ON SCOPE admin HS512 VALUE 'your-512-bit-secret'; -- This is disabled currently, but I'll get this re-enabled for the 1.0.0-beta.7 release (hopefully tomorrow)
```
```
SELECT name FROM $auth; -- This will then pull the name field from the user:snb1984nbvk184n record
```
https://discord.com/channels/902568124350599239/970338835990974484/1012112877949296812
```
INFO FOR NS; -- Will show you all databases, logins, tokens for the namespace
INFO FOR DB; -- Will show you all tables, scopes, logins, tokens for the database
INFO FOR TABLE user; -- Will show you all fields, events, indexes, foreign tables
```

```
surreal export --conn http://localhost:8000 --user root --pass root --ns test --db test export.sql
```



https://discord.com/channels/902568124350599239/970338835990974484/1022625034277232770
```
LET $my_records = [person:one, person:two, person:three, person:four];
CREATE $my_records; -- will create the records, but will cause an error if any exist
UPDATE $my_records; -- will create the records if they don't exist, and will not cause an error if any exist
```

