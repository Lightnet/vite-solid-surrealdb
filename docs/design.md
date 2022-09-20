
# Setting up database:
  SurrealDB has good features.

  Note still learning some copy for easy to read.

## Features:

- https://surrealdb.com/features

- DEFINE https://surrealdb.com/docs/surrealql/statements/define
- DEFINE TABLE @table SCHEMALESS
- DEFINE TABLE @table DROP;
- DEFINE INDEX email ON TABLE user COLUMNS email UNIQUE;
- LET $@parameter = @value;
- BEGIN [ TRANSACTION ];
 
```sql
-- Create a new event whenever a user changes their email address
DEFINE EVENT email ON TABLE user WHEN $before.email != $after.email THEN (
	CREATE event SET user = $this, time = time::now(), value = $after.email, action = 'email_changed'
);
```

```sql
DEFINE TABLE reading DROP;
```

```sql
-- Create a new article record with a specific id
CREATE article:surreal SET name = "SurrealDB: The next generation database";

-- Update the article record, and add a new field
UPDATE article:surreal SET time.created = time::now();

-- Select all matching articles
SELECT * FROM article, post WHERE name CONTAINS 'SurrealDB';

-- Delete the article
DELETE article:surreal;
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


  The sureal database have trigger events.
