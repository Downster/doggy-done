# Doggy Done

Doggy Done is a "smart to-do app" for dog owners, that organizes user tasks, and allows for interactivity on tasks between users. It is inspired by [Remember the Milk](https://www.rememberthemilk.com/).

# Index

|
[MVP Feature List](##linkshere) |
[Database Schema](##linkshere) |
[API Documentation](##linkshere) |
[Frontend Routes](https://github.com/strewm/Gotta-Latte-Do/wiki/Frontend-Routes) |
[User Stories](https://github.com/strewm/Gotta-Latte-Do/wiki/User-Stories) |

# Technologies Used

<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/>![Pug](./images/readme/pug-icon.png)

# Getting started

1. Clone this repository

   `git clone git@github.com:Downster/doggy-done.git`

2. Install dependencies

   `npm install`

3. Create a .env file based on the .env.example given

4. Setup your username and database based on what you setup in your .env

5. Migrate and Seed models

   `npx dotenv sequelize db:migrate` &&
   `npx dotenv sequelize db:seed:all`

6. Start the app using:

   `npm start`

7. You can use the Demo user or create an account

# Live

### Features

Doggy Done allows logged-in users to add/edit/delete/get features from the home page without ever redirecting from the base page.

Logged in users can:

- Add/Edit/Delete Lists
- Add/Edit/Delete Tasks
- Add/Edit/Delete Comments on Tasks
- Add/Delete Contacts
- Give Tasks to Contacts
- View Tasks by Category: All, Due Today, Due Tomorrow, Given to User by Contact, Given to Contact by User, Incomplete, Completed, and User-Created List Categories
- Search for Tasks
