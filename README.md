This is a Content Management System project.
To setup this project; 
Get the port No from the senior dev.
run the command " npm install" to install all dependencies
run the commend " npm run dev " to start the server

There are various api endpoints available in this project, all of which will be demonstrated below;

create a user
POST - "/api/user"

Sample request 
{
  "firstName": "rew",
  "lastName": "Khawthar",
  "dob": "12Aug2001",
  "password": "mypassword",
  "confirmPassword":"mypassword" 
}

Sample response (status 200)
{
      "firstName": "rew",
      "lastName": "Khawthar",
      "userId": 4,
      "dob": "12Aug2001",
      "stateOfOrigin": null,
      "role": "user",
      "phoneNo": null,
      "password": "mypassword",
      "confirmPassword": "mypassword",
      "maritalStatus": null,
      "qualification": null,
      "articles": [],
      "noOfArticles": 0,
      "avatar": null
    }

get a single user
GET - '/api/user/:userId'

Sample request - /api/user/2
Sample response (status 200)
{
  "message": "Successfull",
  "status": true,
  "data": {
    "firstName": "Barakat",
    "lastName": "Asunke",
    "userId": 2,
    "dob": "12/06/1990",
    "stateOfOrigin": "osun",
    "role": "user",
    "phoneNo": "08112023380",
    "password": "sheriprinkle",
    "confirmPassword": "sheriprinkle",
    "maritalStatus": "married",
    "qualification": "ssce",
    "articles": [],
    "noOfArticles": 0,
    "avatar": "image"
  }
}
