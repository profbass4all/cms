This is a Content Management System project.
To setup this project; 
Get the port No from the senior dev.
run the command " npm install" to install all dependencies
run the commend " npm run dev " to start the server

There are various api endpoints available in this project, all of which will be demonstrated below;

create a user
POST - "/api/user"

request 
{
  "firstName": "rew",
  "lastName": "Khawthar",
  "dob": "12Aug2001",
  "password": "mypassword",
  "confirmPassword":"mypassword" 
}

response (status 200)
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
