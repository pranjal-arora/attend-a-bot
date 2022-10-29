# attend-a-bot
### A project by Pranjal Arora, for Microsoft Intern Engage 2022


Attend-a-bot is a real time face recognition attendance tracker web application, built using face-api.js, react.js, node.js, mongoDB and apollo graphQL queries. 

### To run the application locally:
1. clone this repository
2. open the terminal, change directory to "client", and type in the command: "npm i"
3. open the terminal, change directory to "server", and type in the command: "npm i"
4. this installs all dependencies included in the package.json
5. create a new cluster on mongodb and store its node.js connection url in a .env file. Similarly store the (cloud gallery) cloudinary's cloud name, api key and secret in .env file
6. install nodemon in "server" directory using cmd "npm i -g nodemon", for watching the server.
7. run the server, by typing in the command "npm run dev" in "server" dir. Runs on http://localhost:5000
8. run the client-side, by typing in the command "npm start" in "client" dir. Runs on http://localhost:3000
