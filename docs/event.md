```sql
-- Specify a field on the user table
DEFINE FIELD email ON TABLE user TYPE string ASSERT is::email($value);

-- Add a unique index on the email field to prevent duplicate values
DEFINE INDEX email ON TABLE user COLUMNS email UNIQUE;

-- Create a new event whenever a user changes their email address
DEFINE EVENT email ON TABLE user WHEN $before.email != $after.email THEN (
	CREATE event SET user = $this, time = time::now(), value = $after.email, action = 'email_changed'
);
```

https://discord.com/channels/902568124350599239/970338835990974484/1021373493738221589
```sql
DEFINE EVENT name ON TABLE waitlist WHEN $before.name != $after.name THEN ( 
  CREATE event SET from=$before.name, to=$after.name, event="waitlist_name_changed", field=$before.id
);
```

https://discord.com/channels/902568124350599239/902568124350599242/1020143374268907550

```
In events there are...
1. $before which is a reference to the document/record before any updates were made.
2. $after which is a reference to the document/record after any updates were made.
3. $event which is the event type (CREATE, UPDATE, DELETE).
4. $value which is an alias of $after.
```


https://discord.com/channels/902568124350599239/970338835990974484/1020097007064449044
```
DEFINE EVENT user_created ON TABLE user WHEN $event = "CREATE" THEN http::post('https://my_stripe_endpoint/create', $after);
```


https://discord.com/channels/902568124350599239/1014970959461105664/1019355392880427109
```
DEFINE EVENT my_notification ON TABLE user WHEN $event = "UPDATE" THEN http::post('https://my-remote-endpoint.com', { action: $event, data: $this });
```

```
{
    action: 'UPDATE',
    data: {
        id: 'user:testing',
        name: 'some name',
        age: 22,
    }
}
```

```
DEFINE EVENT email ON TABLE user WHEN $before.email != $after.email THEN http::post('https://my-api.com/update', $after);
DEFINE EVENT email ON TABLE user WHEN $event = "CREATE" AND $after.email THEN http::post('https://my-api.com/created', $after.email);
DEFINE EVENT email ON TABLE user WHEN $event = "DELETE" AND $before.email THEN http::post('https://my-api.com/deleted', $before.email);
```
Or for creating a record in another table...
```
DEFINE EVENT activity ON TABLE user WHEN $event = "UPDATE" AND $before.email != $after.email THEN (
  CREATE activity_log SET action = 'updated_user', user = $this, new_email = $after.email
);
```

https://discord.com/channels/902568124350599239/902568124350599242/1020096250697224242
```
DEFINE EVENT delete_user ON TABLE user WHEN $event = "DELETE" THEN (DELETE FROM $before.addresses);
```

https://discord.com/channels/902568124350599239/902568124350599242/1016992925474897980
```
DEFINE EVENT tester ON user
  WHEN $after.email != $before.email
  THEN http::post('https://my-api-endpoint', $this)
;
```


https://discord.com/channels/902568124350599239/1009081534130692186/1009400909408776192
```
-- This is an event - you can 
DEFINE EVENT email ON TABLE user WHEN $before.email != $after.email THEN (
    CREATE event SET user = $this, time = time::now(), value = $after.email, action = 'email_changed'
);
-- This could effectively be used to stream all changes somewhere
DEFINE EVENT feed ON TABLE user WHEN true THEN http::post('https://my-remote-endpoint.com', { action: $event, data: $this });
```