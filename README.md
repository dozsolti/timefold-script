# Timefold Script

> Write it in Fold.

```sh
NAME: PATTERN [TIME] ~ MODIFIER
```

# Steps

1. User inputs (eg. `Work: weekdays` = `CommandInput`)
2. parseCommand turns them into `{ name, rules: [ pattern, time, modifiers[] ] }` = `CommandOutput`
3. This will become into compiled down into an exact calendar viewable format like (to be determined) `{ name, dates }`, where `dates[] = "2010-01-01" | [2010-01-01, 2012-01-02] | [2010-01-02-07-59, 20210-01-02-16-59]`
4. Will be used into the web app to display in the calendar view

Format not supported + alternatives:

1. Day ranges `School: Monday-Friday 08:00-15:00`. Alternatives: Use `weekdays` or list them out one by one.
