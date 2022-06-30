# Blok Tech

## Feature

In the first 5 weeks of this project we were focusing on one feature we were gonna inplement in the team project. 
The feature I choice to make is a user profile page. This feature let's you see all the users in the database, lets you click on the users to get more information, and lets you edit the users and update them in the database.


## Installation

This project is build with NPM 6.14.4 and Node v16.14.0.

Clone the repository to your code editor.
type this in the terminal:
```
npm install
```

After installing all the dependencies make a .env file in the following format:
```
DB_URI = [your database URI]
DB_NAME = [your database name]
TESTVAR = It's working
```

You can now start the server with:
```
npm start
```

## Database

The database name is 'user', and the collection name is 'users', inside the collection I have these values.
'
_id : ObjectId
name : string
age : string
city : string
dob : string
email : string
phone : string
username : string
'

For more in depth information about my database you can go to my wiki -> Database Stucture.