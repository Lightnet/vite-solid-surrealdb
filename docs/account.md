
# Account:
  Work in progress.


# sql varablie
```
$auth.id ???
$this
$event
$scope ???
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