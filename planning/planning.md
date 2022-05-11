# Final Project Planning

## I. Overview

### Project Name
* HandyDown

### Tech Stack
* React
* Material UI
* Node.js
* Express
* Sequelize ORM
* PostgreSQL 

## II. Elevator Pitch

As parents know, signing your kids up for a new activity often means spending a fortune on equipment.  On top of that, we often have a pile of barely-used gear that our kids have outgrown.  Our app - HandyDown -  allows a donor to post their gear, and a searcher to find exactly what they're looking for, making sure your gear finds a new owner who will use it.

## III. User Stories

### Navbar/every page (except Landing?)
* Home button - User can click to return to the all_items page
* Register link - A not-logged-in user can click and be taken to the register_page/modal
  * if logged in, replace 'Register' with the username
* Login link - A not-logged-in user can click and be taken to the login_page/modal
  * if logged in, replace 'Login' with 'Logout'
* Post Item button - User can click and: 
  * If logged-in, be taken to the new_item_page/modal
  * If not logged-in, be taken to Login-page/modal

### Tabs
* Offers
* Wanted
* My Items - A logged-in user can click and visit their my_items_page
* My Messages
* STRETCH My Profile - A logged in user can click and visit their profile_page

### Offered_items_page
* User is shown all items offered
* A user can click on an item card to go to its single_item_modal
* A user can type in a search bar to search for an item

### Wanted_items_page
* same as offered_items_page
* A user can click on an item card to go to its single_item_modal
* A user can type in a search bar to search for an item

### My_items_page
* User is shown the items that they have posted
* User can click on a single item to open my_single_item_modal
* A user can type in a search bar to search for an item

### My_messages_page
* 

### Single_item_modal
* A user can view the item details (below)
* A user can click the “reply” button.  
  * Logged-in user taken to message form.  
  * Not-logged-in user taken to Login Page
* STRETCH - share/like buttons
* STRETCH - offer similar item?

### My_single_item_modal
* User is presented with Item details 
* Edit/Delete buttons?
* STRETCH - modal includes an inbox-style list of conversations about the item.

### New_item_modal
* User is presented with a form with which to post a new item (see details below)
* Submitting From takes user to ....My items page?  Or just back to all items with an alert saying post successful?  Or the option of both?

### Reply_form_modal
* 

### Single_conversation_modal
* 

### Register_page
* User can create an account
* Successful submission of form redirects to All_items_page but user logged in

### Login_page
* User is presented with form to enter username? email and password to login
* Submit button - takes user to all_items page but logged_in
* Register button - takes user to register page
* STRETCH - Reset password button - takes user to reset password form

### STRETCH - Landing_page
* A user can visit the landing_page and learn about the app.
* a user can click on a button and view the all_items_page

## IV. Resources and Associations

### User 
* Has many items
* Has many messages
* Has many conversations

### Item
* Has many conversations
* Belongs to a user

### Conversation
* Has many messages
* Belongs to an item
* Belongs to two users

### Message
* Belongs to a conversation
* Belongs to a user (sender)

## V. Models and Attributes

### Users
* id (PK)
* username
* email
* password
* location
* createdAt
* updatedAt
* STRETCH: avatar

### Items
* id (PK)
* userId (FK)
* name
* description
* image
* offered
* delivered
* createdAt
* updatedAt

### Conversations
* id (PK)
* creatorId (FK)
* receiverId (FK)
* itemId (FK)
* createdAt
* updatedAt

### Messages
* Id (PK)
* conversationId (FK)
* userId (FK)
* body
* createdAt
* updatedAt

## VI. Routes

### Users

* GET /api/users/:id
  * users#show
  * Grab a specific user

### Items

* GET /api/items
  * items#index
  * Grab all items from database

* POST /api/items
  * items#create
  * Save a new item to the database

* PUT /api/items/:id
  * items#update
  * Update a specific item

* DELETE /api/items/:id
  * items#destroy
  * Delete a specific item

### Conversations

* GET /api/conversations/by/user/{userId}
  * conversations#getByUserId
  * Grab all conversations for a particular user

* POST /api/conversations
  * conversations#create

### Messages

* POST /api/messages
  * messages#create
  * Save a new message to the database

## VII. Stretch Goals
* Create new user
* Update/Delete messages
* User avatar upload
* User authentication
* Landing page https://www.freepik.com/vectors/sports-landing-page


## APPENDIX A
### Detailed User Stories
#### All users (both logged-in and non-logged-in)
A user can visit the landing_page and learn about the app.
From the landing page, a user can click on a button and view the all_items_page, which displays a list or grid of items both offered and wanted (filterable), organized by the most recently added item.

A user has the ability to view either the “offering” items or the “wanted” items on the all_items_page. 

Perhaps “offering” items are shown by default with a user option to switch to ‘wanted’ items.

Each item on the all_items_page has its own card. A card contains the following information about the item:
Whether the item is in the “Offer” or “Wanted” categories
Title
Date posted
Town
Image - thumbnail only
Description - excerpt only (one line)
A user can click on a single item and view a single_item_page, which will display details about that item:
Whether the item is in the “Offer” or “Wanted” categories
Title
Date posted
Town
Avatar and username
Image
Full description
A reply button*** (or a complete reply form available on the page?)
If logged in, a user will be taken to a reply_page where they can send a message to the other user. The reply_page form will have the following:
Subject heading (pre-populated with the title of item)
Text field
Submit button
If not logged in, pressing the button will take the visitor to the login_page
STRETCH - share button***
If not logged in, redirected to login_page
STRETCH - ‘Like’ or add-to-favourites button***
If not logged in, redirected to login_page

A user can type in a search bar to search for an item on the all_items_page and see the search results (results are either on the all-items page or a separate search results page).
Option to search for “offered” items or “wanted items”
A user can click the “Post Item” button*** in the main-navbar
If logged in, user will be taken to a new_item_form that includes the following:
Title
Description
Image upload button
If not logged in, pressing the button will take the visitor to the login_page

#### Non-logged-in users
A non-logged-in user can click on a register_button (in the main-navbar) and be taken to a register_page where they can create an account. The register form includes fields for:
Email address
Username
Town
Password
Password confirmation
Submit button
A not logged_in user can click on a login_button (in the main-navbar) and visit the login_page.
The login_page would include a form with
username field
password field
submit button 
On successful login, a user is redirected to the all_items_page.
#### Logged-in users
A logged in user can click a button and visit their my_items_page
A list or grid of cards with details similar to the cards on the all_items_page
User can click a delete_item_button and delete the item
STRETCH - user can click an update_button and be taken to an update_item_form (similar to the new_item_form)
A logged in user can click a button and visit their my_messages_page
My_messages Page: Inbox-style list of messages
Date, From,  Subject (item?), beginning of content 
STRETCH - A logged in user can click a button and visit their profile_page
