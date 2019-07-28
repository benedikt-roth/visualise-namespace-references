# Visualise TypeScript namespace references

## Goal

Visualise namespace usage within a monorepo.

## Approach

Scan file by file.


## Problems

* How to identify namespace TypeReferences from object accessors?
** Idea: Exclude imports within file
* How can global declarations be ignored?
** Specify a global ignore list

