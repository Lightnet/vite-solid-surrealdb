

# Permissions:
  Note the permission check required some set up.


  One reason is have table set up for permission else user will have no permssion or create table if error out.

  There is low to high level permissions.

  One is view all table is restrict who just signup.

  Two root user has full access.

# sign up and in:


```
DEFINE TABLE user SCHEMALESS
  PERMISSIONS
    FOR select, update WHERE id = $auth.id, 
    FOR create, delete NONE;
```
  Empty database need set up user table for event trigger for sign up and sign in.

```sql
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
  Not they are simple.
```
SESSION 1w
```
  For token config.


# other table:

```
DEFINE TABLE message SCHEMALESS;
```
No permission user for message.