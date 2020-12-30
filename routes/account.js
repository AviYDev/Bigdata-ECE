

const express = require('express')
const axios = require('axios')
userRouter = express.Router()
const cors = require('cors')
const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const config = require('../config.json')

var authenticationDetails;





userRouter.use(cors());



AWS.config.update({
  region:'us-east-2',
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY}); //TODO: USE IT EXTERNALY


const cognitoidentityserviceprovider =  new AWS.CognitoIdentityServiceProvider();

const userPool = new AmazonCognitoIdentity.CognitoUserPool(  {
      UserPoolId: config.cognito.UserPoolId,
      ClientId : config.cognito.ClientId
    });



userRouter.post('/getUser', (req,res) =>{
  console.log('/getUser')
  var params = {
    AccessToken:  req.headers.access_token /* required */
  };
  console.log(params);
  cognitoidentityserviceprovider.getUser(params, function(err, data) {
    if (err) {console.log(err);
       } // an error occurred
    else {    console.log(data); res.send(JSON.parse(JSON.stringify(data)))}     // successful response
  });
})

userRouter.post('/accessToken_gitlab', (req, res) => {
  console.log('/accessToken_gitlab')
  console.log(this.userDetails.Username);


  const params = {
    UserAttributes:[
      {
        Name: 'custom:access_token_gitlab',
        Value: req.body.gitlabKey
      },
    ],
    Username: this.userDetails.Username,
    UserPoolId: userPool.userPoolId,
  }
  console.log(params)


  cognitoidentityserviceprovider.adminUpdateUserAttributes(params, (err,data) => {
    if(err){
      console.error("ERROR:")
      console.error(err);
    }
    else {
      console.log("Success");
      console.log(data)
      res.send("Token Gitlab Added");
    }
  })
})


userRouter.post('/ece_repolist_gitlab', (req, res) => {

  console.log('/ece_repolist_gitlab')
  console.log(req.body.gitlabKey)
  axios.get('https://gitlab.com/api/v4/groups/10506269/projects?access_token='+req.body.gitlabKey,{})
      .then(result => {
        console.log(`statusCode: ${result.status}`)
        //console.log(result.data)
        res.send(JSON.stringify(result.data));
      })
      .catch(error => {
        console.log("error");
       console.error(error)
        res.sendStatus(404);
      })
})

userRouter.post('/all_repolist_gitlab', (req, res) => {

  console.log('/all_repolist_gitlab')
  console.log(req.body.gitlabKey)
  axios.get('https://gitlab.com/api/v4/projects?simple=true&access_token='+req.body.gitlabKey,{})
      .then(result => {
        console.log(`statusCode: ${result.status}`)
        //console.log(result.data)
        res.send(JSON.stringify(result.data));
      })
      .catch(error => {
        console.log("error");
        console.error(error)
        res.sendStatus(404);

      })
})


userRouter.delete('/accessToken_gitlab', (req, res) => {

  console.log('/accessToken_gitlab')
  console.log(this.userDetails.Username);
  //console.log(userPool);

  const params = {
    UserAttributeNames:['custom:access_token_gitlab'],
    Username: this.userDetails.Username,
    UserPoolId: userPool.userPoolId,
  }
  console.log(params)
  //var cognitoidentityserviceprovider = new AmazonCognitoIdentity.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

  cognitoidentityserviceprovider.adminDeleteUserAttributes(params, (err,data) => {
    if(err){
      console.error("ERROR:")
      console.error(err);
    }
    else {
      console.log("Success");
      console.log(data)
      res.send("Token Gitlab Deleted");
    }
  })
})


userRouter.post('/renewPassword', (req, res) => {

console.log(req.body);
  this.cognitoUser.completeNewPasswordChallenge(
      req.body.password, //TODO : Change Password
      {},
      {
        onSuccess: (user) => {
          console.log('success', user);
          res.send({value : "reseted"})
        },
        onFailure: (error) => {
          console.log(error);
          return res.status(400).json({
            status: 'error',
            message: error.message,
          })
        },
      },
  );

});





userRouter.post('/login', (req, res) => {
  console.log("Connexion...")
  const loginDetails = {
    Username: req.body.email,
    Password: req.body.password
  }
  authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);
   this.userDetails = {
    Username : req.body.email,
    Pool : userPool
  }
  this.cognitoUser = new AmazonCognitoIdentity.CognitoUser(this.userDetails)
  this.cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      this.userInfo = result;
      var accesstoken = result.getAccessToken().getJwtToken();
      console.log("SUCCESS : " + JSON.stringify(result));

      res.send(JSON.parse(JSON.stringify(this.userInfo)));
    },
    onFailure: (function (err) {
     // callback(err);
      console.error("ERROR:")
      console.error(err);
    }),
    newPasswordRequired: () => {
     console.log("WILL BE RESET");
      res.send({value:"renew"});
    }
  })
});

userRouter.get('/', (req, res) => {
  console.log("let's go")
});
module.exports = userRouter;