# Node-Authentication-Api

API for egistering users with mongodb and authentication using jwt(json meb token).Thia app uses passport, passport-jwt and uses a jwt Strategy.

# Version
1.0.0

# Usage
npm install

npm start

# End Points
POST /users.register

POST /users/authenticate   (gives back a token)

GET /users/profile    (needs json web token to authorize)
