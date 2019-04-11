# Full Stack Message Board


* - [ ] Create Server Folder
  * - [ ]Init npm (npm init -y)
  * - [ ]Add these (npm install express morgan cors body-parser)
        express is used to create the backend API, morgan logs incoming requests, cors will let the client talk to the front-end, body-parser will allow the backend to read and understand the data sent from the front end.
  * - [ ]Create Hello World Route
* - [ ]Create Client Folder
  * - [ ]vue create client
  * - [ ]Add bootswatch CSS
  * - [ ]Homepage Layout
* - [ ]Add DB to server
  * - [ ]Add monk joi
  * - [ ]Create message model
  * - [ ]Create route to add message to db
   * - [ ]validate message with joi
    * - [ ]username - default to anonymous
    * - [ ]subject
    * - [ ]message
    * - [ ]imageURL
    * - [ ]created_at
   * - [ ]insert message into db
   * - [ ]respond with inserted message
* - [ ]Create new message form on client
  * - [ ]Submit form - fetch POST to server
  * - [ ]Show any errors
  * - [ ]Show new message on page
* - [ ]When page loads show all messages on page
   * - [ ]Server route to GET all messages
* - [ ]User can reply to a message
  * - [ ]Reply appears under original message
* - [ ]Group messages into categories
 * - [ ]Deploy!
