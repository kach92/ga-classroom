# GA Classroom Display Controller

![ga-classroom-image](https://user-images.githubusercontent.com/50238797/69441373-9338b500-0d85-11ea-889e-409afc8728b6.PNG)

Built by - [Kenny Ang](https://github.com/kach92)<br/>
Check out the full app here! https://ga-classroom-display.herokuapp.com/

## Objective
A simple app to ease administration's job by allowing them to modify the classes' display with just the use of their phones!

## Technologies used
- React.Js, Node.Js, Express.Js and PostgreSql
- Socket.io

Main objective of the app is the ease of changing the classrooms' display dynamically at anytime any anywhere live. Therefore the Mobile-first design method is used, due to the fact that the displays used outside the classrooms are iPads and it will easier to make changes using a phone. Socket.io is also used so that any changes made will be reflected at once on all displays outside each classroom.

## Installation Instructions
1. Installs all the dependencies of the project is using
```
npm install
````
2. Create the Postgres db for running on local
```
createdb DATABASE_NAME -U USERNAME
````
3. Creates the tables neccessary to run this project
```
psql -d DATABASE_NAME -U USERNAME -f tables.sql
````
4. Seed dummy data
```
psql -d DATABASE_NAME -U USERNAME -f seed.sql
````

## Functions of App
- Create and delete classes
- Select or change a class for each classroom and save changes
- Any changes will be updated and reflected immediately on each display outside the classroom

## Further functions to be added
- Administrator Login
- Edit classes
