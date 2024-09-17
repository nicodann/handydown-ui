# HandyDown

A Full-Stack CRUD App for donating used youth athletic equipment that your family has outgrown. Like a buy-and-sell without the money.

React | MUI | Node | Express | Sequelize | Postgres

## Installation

- Fork and Clone repo
- install dependencies with npm install in /ui directory
- install dependencies with npm install in /api directory

## Postgres

- Create a database with the name 'handydown'

## Running Webpack Development Server

- run api with "npm run local" from within /api
  - this will run all the migrations and create the tables
  - run
    `npx sequelize-cli db:seed:all` to seed database
- run client with "npm start" from within /ui

## Screenshots

### Main Page

![Main Page](https://github.com/nicodann/handydown/blob/main/ui/public/screenshots/Handydown_MainPage.png)

### Wanted Ads

![Wanted Ads](https://github.com/nicodann/handydown/blob/main/ui/public/screenshots/Handydown_WantedAds.png)

### Post Item Form

![Post Item Form](https://github.com/nicodann/handydown/blob/main/ui/public/screenshots/Handydown_PostItemForm.png)

### Edit Item Form

![Edit Item Form](https://github.com/nicodann/handydown/blob/main/ui/public/screenshots/Handydown_EditItemForm.png)

### My Messages

![My Messages](https://github.com/nicodann/handydown/blob/main/ui/public/screenshots/Handydown_MyMessages.png)
