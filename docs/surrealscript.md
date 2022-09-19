

```sql
-- Create a new parameter
LET $value = "SurrealDB";
-- Create a new parameter
LET $words = ["awesome", "advanced", "cool"];
-- Pass the parameter values into the function
CREATE article SET summary = function($value, $words) {
	return `${arguments[0]} is ${arguments[1].join(', ')}`;
};
```

```sql
```

```sql
```

```sql
```

```sql
```