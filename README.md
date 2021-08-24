# Chatroom backend Build with Node.js

# Aims
This project aimed to build a simple chatroom with the following features:
1. simple authentication
2. direct message to one particular user

# Technical Stack
1. Node.js with Express framework
2. Typescript for type checking
3. MongoDB
4. Redis
5. WebSocket provided by Socket.IO

# Authentication
The project provide RESTful API for user to signIn , signUp and signOut.
MongoDB is used for storing the user data with password. A JWT token with 1 hour expiration will be returned once the signIn is success.

# Direct Message
User can send message to another user if he/she is online. Once upone the Websocket connection is established, the socket id provided by Socket.IO will be stored in redis server for targeting particular user



