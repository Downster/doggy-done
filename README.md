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

<!-- ### Welcome Page
![Welcome Page](./images/readme/welcomepage.png)

### App Page
![Logged In](./images/readme/homepage.png)

### Drop-downs + Pop-ups
![Drop Downs and Pop Ups](./images/readme/dropdownpopup.png)

### Modals
![New List](./images/readme/listmodal.png)
![New Contact](./images/readme/contactmodal.png) -->

<!-- # Future Features

- User notifications when:
  - A task is coming due
  - Another user adds user as a contact
  - Another user assigns user a task
- User profiles
- Keyboard shortcuts

 -->

<!-- # Technical Implementation

 - One of our first challenges was associating User IDs to themselves so that Users can have Contacts:
 ```javascript
   User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.User, {foreignKey: 'userId', through: 'Contact', otherKey: 'contactId', as: 'contacts'})
    User.belongsToMany(models.User, {foreignKey: 'contactId', through: 'Contact', otherKey: 'userId', as: 'contactees'})
 ```
![Self Join 2](./images/readme/selfjoin2.png)

 - In a similar vein, adding created lists to a join table for Lists with the proper Task and List IDs:
```javascript
    const task = await Task.create({
      userId,
      description,
      dueDate,
      isCompleted
    })

    const listInfo = await List.findOne({
      where: [{ title, userId }]
    })

    const taskId = task.id
    const listId = listInfo.id

    const taskList = await TaskList.create({
      taskId,
      listId
    })

    res.status(201).json({task, taskList});
```


- The dreaded Date Object:
```javascript
router.get('/tomorrow', asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1)
  const start = tomorrow.setHours(0, 0, 0, 0);
  const end = tomorrow.setHours(23, 59, 59, 999);
  const tasks = await Task.findAll({
    where: {
      userId,
      dueDate: {
        [Op.between]: [start, end]
      }
    },
    order: [['dueDate']]
  })
  res.json({ tasks })
}))
```

- Search bar functionality:
```javascript
router.get('/:id', asyncHandler(async (req, res, next) => {
    const searchQuery = req.params.id;
    const firstThree = searchQuery.slice(0, 3);
    const firstThreeUp = firstThree.charAt(0).toUpperCase() + firstThree.slice(1);
    const lastThree = searchQuery.slice(-3);

    const userId = res.locals.userId;
    try{
        const results = await Task.findAll({
            where: {
                userId,
                [Op.or]: [
                    {description: { [Op.substring]: `${searchQuery}`}},
                    {description: { [Op.substring]: `${firstThree}`}},
                    {description: { [Op.substring]: `${lastThree}`}},
                    {description: { [Op.substring]: `${firstThreeUp}`}},
                    {description: { [Op.iLike]: `${firstThree}`}},
                    {description: { [Op.iLike]: `${lastThree}`}},
                ]

            },
            include: {
                model: List,
            }
        })

        res.status(201).json({results})

    } catch (e) {
        next(e)
    }
}))
``` -->
