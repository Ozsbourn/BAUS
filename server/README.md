# Server for BAUS

First of all use command for download packages:
```
npm i
```
or similar for another package managers.

For set up server side you need create a PostgreSQL DB manually with parameters that marked in connection string, defined in .env file. (Have no need do it with any extended params, only name enough (of course if PORT for your instance of Postgre is '5432' (default) - in other variant change it into the .env file)).

After the creation of DB, use 
```
	npx prisma migrate dev
```
for migrate prisma scheme at DB side and create DB structure.
(!Server side doesn't have now scripts for seed DB!)

## Features

This template comes with the following features:

- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io)


## npm scripts

### Build and dev scripts

- `dev` – start dev server

### Testing scripts

--removed

### Other scripts

--removed
