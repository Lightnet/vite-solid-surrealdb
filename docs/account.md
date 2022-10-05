
# Account:
 - auth.id is null might not work...
  Work in progress.

# sql variable
```
$auth - current user login or access
$auth.id 
$this - current table
$event - for select, create, update, delete 
$scope - access
$token - jwt
```

# url
```
/signup
/signin
/health
```
 
 SQL
```
DEFINE TOKEN ... ON SCOPE ...
```

https://discord.com/channels/902568124350599239/902568124350599242/1025066682135359710
```
DEFINE LOGIN test ON NAMESPACE PASSWORD '123456'
DEFINE TOKEN test ON NAMESPACE TYPE HS512 VALUE 'somekey'

DEFINE LOGIN test ON DATABASE PASSWORD '123456'
DEFINE TOKEN test ON DATABASE TYPE HS512 VALUE 'somekey'
```

https://discord.com/channels/902568124350599239/1025048139968815194/1025055707952844863
```
DEFINE SCOPE account SESSION 24h
  SIGNUP ( CREATE user SET email = $email, pass = crypto::argon2::generate($pass) )
  SIGNIN ( SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass) )
;
```
```
DEFINE FIELD account ON TABLE note
  PERMISSIONS
    FOR create, update, select, delete
      WHERE account = $auth.account -- The user can only access/modify notes, if the account matches the account they belong to
;
```

```
DEFINE SCOPE account;
DEFINE TOKEN my_token ON SCOPE account TYPE HS512 VALUE "my_secret_encryption_key";
```

https://discord.com/channels/902568124350599239/1025048139968815194/1025056823239258152

```
DEFINE TABLE contact SCHEMAFULL
  PERMISSIONS
    FOR select
        WHERE ($scope = "account" AND account = $account AND (SELECT * FROM $auth.access WHERE account = $account AND (admin = true OR permissions.crm ∋ "s") LIMIT 1))
        OR ($scope = "contact" AND id = $auth.id)
        OR ($scope = "contact" AND distinct(applications.*.campaign.*.connections.*.contact) ∋ $auth.id)
        OR ($scope = "contact" AND distinct(connections.*.campaign.*.connections.*.contact) ∋ $auth.id)
    FOR create
        WHERE ($scope = "account" AND account = $account AND (SELECT * FROM $auth.access WHERE account = $account AND (admin = true OR permissions.crm ∋ "c") LIMIT 1))
    FOR update
        WHERE ($scope = "account" AND account = $account AND (SELECT * FROM $auth.access WHERE account = $account AND (admin = true OR permissions.crm ∋ "u") LIMIT 1))
        OR ($scope = "contact" AND id = $auth.id)
        OR ($scope = "contact" AND distinct(applications.*.campaign.*.connections.*.contact) ∋ $auth.id)
    FOR delete
        WHERE ($scope = "account" AND account = $account AND (SELECT * FROM $auth.access WHERE account = $account AND (admin = true OR permissions.crm ∋ "d") LIMIT 1))
```

https://discord.com/channels/902568124350599239/902568124350599242/1018954702706188368

```
{
    "iss": "auth.hakio.io",
    "iat": 1662994800,
    "exp": 1694530800,
    "nbf": 1662994800,
    "ns": "nordgreen",
    "db": "nordgreen",
    "tk": "workflows",
    "role": [
       "developer", 
       "guest"
    ],
    "company": "nordgreen",
    "aud": "app.hakio.com",
    "sub": "devops@nordgreen.com"
}
```

https://discord.com/channels/902568124350599239/1024230275661709313/1024233104291934268
```
DEFINE FIELD username ON TABLE user TYPE string
  PERMISSIONS
    FOR select FULL,
    FOR create, update, delete NONE
;
```
```
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
            WHERE user = $auth.id && http::post('/api/validate', this) != NONE
        FOR delete
            -- A user can delete their own posts
            WHERE user = $auth.id
            -- Or an admin can delete any posts
            OR $auth.admin = true
;
```

https://discord.com/channels/902568124350599239/970338835990974484/1026455501225066566
```
define table user PERMISSIONS FOR select where $token.id.role == 'admin' or id == $token.id;
DEFINE FIELD role ON TABLE user PERMISSIONS FOR select WHERE $auth.role == "admin" || id == $auth.id;
```










```
// It is now possible to define a new Record ID as normal
LET $friend = (CREATE person SET name = 'Jaime');
// There is no need to select the `id` field using `$friend.id`
CREATE person SET name = 'Tobie', friend = $friend;
```

https://discord.com/channels/902568124350599239/1025048139968815194

```
DEFINE FIELD account ON TABLE note
  PERMISSIONS
    FOR create, update, select, delete
      WHERE account = $auth.account -- The user can only access/modify notes, if the account matches the account they belong to
;
```

```
DEFINE SCOPE account;
DEFINE TOKEN my_token ON SCOPE account TYPE HS512 VALUE "my_secret_encryption_key";
```









https://discord.com/channels/902568124350599239/1023677689082683514/1023678228398886952
```
let res = await db.info();
console.log(res);
// or
let res = await db.query('SELECT * FROM $auth');
console.log(res);
```

https://discord.com/channels/902568124350599239/902568124350599242/1021349915714138213
```
DEFINE TABLE user PERMISSIONS WHERE id = $auth.id; -- The logged-in user can only select/update/delete their own user account...
-- A normal query would be...
-- $username = `tobiemh`
SELECT * FROM user WHERE username = $username; -- Ok all good. I am this user, so I can select it
-- Imagine I then try to inject the query...
-- $username = `tobiemh' OR admin = true`
SELECT * FROM user WHERE username = $username; -- Uhoh they are trying to access the admins too!
```

work partly...
```
query = `USE NS test DB test;
DEFINE TABLE todolist SCHEMALESS
  PERMISSIONS
    FOR select WHERE $in = $auth.id AND http::post('http://localhost:1337/echo', {data: $this, auth: $auth.id}) != NONE,
    FOR create, update
      WHERE $in = $auth.id,
    FOR delete
      WHERE $in = $auth.id;
`;
```
https://discord.com/channels/902568124350599239/1013527402674139268/1023325991516516382
```
let info = await db.info();
-- or
let info = await db.query('SELECT * FROM $auth');
```


https://discord.com/channels/902568124350599239/902568124350599242/1023665441807282256
```
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
            WHERE user = $auth.id && http::post('/api/validate', this) != NONE
        FOR delete
            -- A user can delete their own posts
            WHERE user = $auth.id
            -- Or an admin can delete any posts
            OR $auth.admin = true
;
```


https://discord.com/channels/902568124350599239/902568124350599242/1020490083079573504
```
DEFINE FIELD password ON user TYPE string PERMISSIONS NONE;
```


# sql varablie
```
$auth.id ???
$this
$event
$scope ???
```

```
-- Specify a field on the user table
DEFINE FIELD email ON TABLE user TYPE string ASSERT is::email($value);
```

```
INFO FOR DB;
```

```
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
```

https://discord.com/channels/902568124350599239/970338835990974484/1021596353580773447
```
DEFINE TABLE account SCHEMAFULL;
DEFINE FIELD username ON TABLE account TYPE string;
DEFINE FIELD auth ON TABLE account TYPE object;
DEFINE FIELD auth.id ON TABLE account TYPE string;
DEFINE FIELD auth.pub_key ON TABLE account TYPE string;
```

https://discord.com/channels/902568124350599239/970338835990974484/1021122292543144076
```
DEFINE TOKEN test_token ON DATABASE TYPE HS512 VALUE "sNSYneezcr8kqphfOC6NwwraUHJCVAt0XjsRSNmssBaBRh3WyMa9TRfq8ST7fsU2H2kGiOpU4GbAF1bCiXmM1b3JGgleBzz7rsrz6VvYEM4q3CLkcO8CMBIlhwhzWmy8";
```



```
IF $scope = "admin" THEN
	( SELECT * FROM account )
ELSE IF $scope = "user" THEN
	( SELECT * FROM $auth.account )
ELSE
	[]
END
```
```
UPDATE person SET railcard =
	IF age <= 10 THEN
		'junior'
	ELSE IF age <= 21 THEN
		'student'
	ELSE IF age >= 65 THEN
		'senior'
	ELSE
		NULL
	END
;
```



# Notes:
- 'id = $auth.id' >  'user = $auth.id' incorrect? depend which table?

```
user:tk1t5yj9b9i57m0rcfa6 = $auth.id

{
  "alias": "test",
  "email": "test@test.test",
  "id": "user:tk1t5yj9b9i57m0rcfa6",
  "pass": "xx=xxx=xxx,t=3,p=xxx/xxx/xxx"
}
```

```
let query = `
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR SELECT,UPDATE WHERE user = $auth.id,
    FOR CREATE, DELETE NONE;
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
`;
```

```
`UPDATE ${dataToken.id} SET alias = '${alias()}';`
```
update field
```
`UPDATE ${dataToken.id} SET alias = ${alias()};`
```
Delete field

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
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE user = $auth.id,
    FOR create, delete NONE;
```
  user can only view self only.

```
DEFINE INDEX idx_email ON user COLUMNS email UNIQUE;
```
  Only one email on this user account id


Any change on account and if alias change name sent to post
```
DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" AND $after.alias THEN
	http::post('http://localhost:3000/api/user', { action: $event, data: $this })
;
```

Any change on account sent to post
```
DEFINE EVENT fetch_alias ON TABLE user WHEN $event = "UPDATE" THEN
	http::post('http://localhost:3000/api/user', { action: $event, data: $this, auth: $auth, scope: $scope })
;
```
https://discord.com/channels/902568124350599239/970338835990974484/1022177498345263204


```
CREATE person:sid() SET name = 'Tobie'; -- create an semi-auto-incrementing id which is 'close' to each other on storage (based off machine id and time)
CREATE person:seq() SET name = 'Tobie'; -- create an auto-incrementing sequential integer id, starting at 1
CREATE person:uuid() SET name = 'Tobie'; -- create a uuidv4 id
CREATE person:rand() SET name = 'Tobie'; -- the current default
```

https://discord.com/channels/902568124350599239/970338835990974484/1021395076842262558

```
-- metadata
DEFINE FIELD _metadata ON TABLE user TYPE object VALUE $value OR {} PERMISSIONS FOR select FULL, FOR create, update, delete NONE;
DEFINE FIELD _metadata.created ON TABLE user TYPE datetime VALUE $value OR time::now() PERMISSIONS FOR select FULL, FOR create, update, delete NONE;
DEFINE FIELD _metadata.updated ON TABLE user TYPE datetime VALUE time::now() PERMISSIONS FOR select FULL, FOR create, update, delete NONE;
```


https://discord.com/channels/902568124350599239/970338835990974484/1021373077709410366


```
DEFINE FIELD created ON waitlist TYPE datetime VALUE $before OR time::now();
DEFINE FIELD updated ON waitlist TYPE datetime VALUE time::now();
```


```
DEFINE FIELD alias_id ON TABLE todolist TYPE string VALUE $auth;
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


https://discord.com/channels/902568124350599239/970338835990974484/1019407854874136634
```
-- Set a readonly field which is always a certain value
DEFINE FIELD enabled ON TABLE user VALUE true;
-- Set a field which is always a certain value and can't be updated
DEFINE FIELD created_at ON TABLE user VALUE $value OR time::now();
-- Set a field which can have a value set, but can't be changed after that
DEFINE FIELD purchased_at ON TABLE user VALUE $before OR $value;
-- Set a field which starts at 1, and allows for a new value to be set, but only if it increments
DEFINE FIELD score ON TABLE user VALUE $value OR $before OR 1 ASSERT $after >= $before;
```

https://discord.com/channels/902568124350599239/970338835990974484/1018602029121282141


```
DEFINE TABLE account SCHEMAFULL;
DEFINE FIELDS [
    verified TYPE boolean,
    email TYPE string,
    password TYPE string
] on TABLE account;
```
not yet...

```
DEFINE FIELD role ON TABLE person TYPE record (role);
```


https://discord.com/channels/902568124350599239/970338835990974484/1017798457819406406
```
DEFINE TOKEN my_token ON NAMESPACE TYPE HS512 VALUE "1kvjevk283uksjfvnefv";
DEFINE TOKEN external_auth ON DATABASE TYPE RS512 VALUE "----- PEM ENCODED PUBLIC KEY -----";
```

https://discord.com/channels/902568124350599239/970338835990974484/1012705493732564993


```
UPDATE person:tobie SET name = 'Tobie', friend = person:jaime;
UPDATE person:jaime SET name = 'Jaime', friend = person:tobie;
SELECT friend.name FROM person:tobie; -- Will return 'Jaime'
-- You can traverse records as many times as you want in a query
SELECT friend.friend.friend.friend.friend.name FROM person:tobie; -- Will return 'Jaime'
```














