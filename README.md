# Getting Started with Groupomania front-end

You have to run Groupomania backend too.

run npm install and install [TailwindCSS](https://tailwindcss.com/docs/guides/create-react-app) for CRA.
No need to create tailwind.config.js etc.


## Create an admin profile

You need to use Postman "/auth/signup"

In the body paste this :
{
    "firstname": "FIRSTNAME_OF_YOUR_ADMIN",
    "lastname": "lASTNAME_OF_YOUR_ADMIN"",
    "email": "EMAIL_OF_YOUR_ADMIN"",
    "password": "PASSWORD_OF_YOUR_ADMIN"",
    "roles":["admin"]
}
Note that your password must contains uppercase, lowercase, symbole and number

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

