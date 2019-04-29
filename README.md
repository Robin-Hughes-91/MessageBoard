# Full Stack Message Board.

In terminal in route run 'mongog' and then 'mongo'. In client terminal run 'npm run serve'. In server terminal run 'npm run dev' 


* - [x] Create Server Folder
  * - [x]Init npm (npm init -y)
  * - [x]Add these (npm install express morgan cors body-parser)

          express is used to create the backend API, morgan logs incoming
          requests, cors will let the client talk to the front-end,
          body-parser will allow the backend to read and
          understand the data sent from the front end.

  * - [x]Create Hello World Route
  * - [x] install nodemon (npm install --save-dev nodemon)

* - [x]Create Client Folder
  * - [x]vue create client (npx @vue/cli create client)
  * - [x]Add bootswatch/bootstrap CSS
  * - [x]Homepage Layout
* - [x]Add DB to server
  * - [x]Add monk joi

          joi does validation for the data
          such as making sure the user enters
          the correct details. monk helps us connect
          to the mongodb database.

  * - [x]Create message model
  * - [x]Create route to add message to db
   * - [x]validate message with joi
    * - [x]username - default to anonymous
    * - [x]subject
    * - [x]message
    * - [x]imageURL
    * - [x]created_at
   * - [x]insert message into db
   * - [x]respond with inserted message
* - [x]Create new message form on client
  * - [x]Submit form - fetch POST to server
  * - [x]Show any errors
  * - [x]Show new message on page
* - [x]When page loads show all messages on page
   * - [x]Server route to GET all messages
* - [x]Add Giphy api route and connect to search bar
   * - [x]Display the returned gifs
   * - [x]Add a slider/carousel
   * - [x]Add click event to the gifs
   * - [x]Use PubSub/EventBus to send the url of clicked gif to the form
   * - [x]Add button to hide the displayed gifs
* - [ ]User can reply to a message
  * - [ ]Reply appears under original message
* - [ ]Group messages into categories
 * - [x]Deploy!
