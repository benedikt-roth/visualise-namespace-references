# Visualise TypeScript namespace references

## Goal

Visualise namespace usage within a monorepo.

## Approach

Scan file by file and output found references.

## CLI usage

```
npm run start -- --include <glob pattern>
```


## Problems

* How to identify namespace TypeReferences from object accessors?
  * Idea: Exclude imports within file ✅
* How can global declarations be ignored?
  * Specify a global ignore list ⚠️

