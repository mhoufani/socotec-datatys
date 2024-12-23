# Coding Test `Datatys`

## 1. initial installation project test
- Clone the repository and create new branch
- [Install Docker Compose](https://docs.docker.com/compose/install/)
- copy the .env.example (backend/frontend) file into a new .env file
- run backend/ `npm install`
- run backend/ `npm run docker:up`
- run frontend/ `npm install`
- run frontend/ `npm run start`
- run backend/ test `npm run test`
- use db function in `backend/sql/db.cjs` to communicate with db

## 2. form registration test application

### install project test 
- Clone the repository and execute command `git checkout hm-coding-test`
- install `node@22.12`
- run `npm i -g yarn`
- run backend/ `yarn install`
- run backend/ `yarn docker:up`
- run frontend/ `yarn install`
- run frontend/ `yarn docker:up`
- open browser at [localhost:3000](http://localhost:3000) 

### Inspiration
I would like to propose at SOCOTEC a real context application and not just only a basic form interface.
So I decided to create a small concept with the use case to register a profile based on my experience with a short time.
I propose a frontend application based on `Nextjs` and for extending easily features like router.
I use `sass` and specially `scss.modules` for keeping styles react components isolated from context while using power of sass functions.

### Features

- Profile registration page based on `formik`.
- Field validation on form based on `yup` for managing schema validation on `formik`.
- Field for uploading profile picture with preview (this field is optional on form validation).
- Api based on `ExpressJs` with a service for register profile on route `/api/user/register`.
- Control, validate and sanitize data send at route `/api/user/register` with middlewares based on `express-validator`.
- Custom Errors messages format return by api for give explanation on frontend application especially for email validation.

### Frontend architecture folders
- `pages:` NextJs router use this folder to make routes and call components page for each route automatically.
- `services:` Contain context User service provider at all components in application.
- `tools:` Contain global utility functions used by application.
- `design-system:` Contain all rules integration on sass and mixins functions utils for manage responsive and styles.
- `theme:` Contain all rules for to override design-system for custom the project like colors primary and secondary.
- `components`: Contains React components presentation based on atomic design with atoms and molecules with design system rules.
This folder regroup also Layout component application used by all pages and components for each page.

### Backend architecture folder
- `routes:` Contain routes api services.
- `middlewares`: Contain all middlewares shared by the application.
- `controllers`: Contain all controllers for managing services.
- `models`: Contain all Entities models classes.

### In Summery
With more time I could have:
- implement tests on frontend and backend with jest, react-library, storybook, chai, sinon.
- provide validation message on upload picture in frontend and create validation service files with multer on backend.
- Review country and city field form with select inputs and fixed list of real countries and cities. 
- Clean projects configuration eslint for move to esnext and create a production configuration build.

