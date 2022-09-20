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