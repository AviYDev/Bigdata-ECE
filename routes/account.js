

const express = require('express')
userRouter = express.Router()
const path = require('path');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js')
const config = require('../config.json')


const userPool = new AmazonCognitoIdentity.CognitoUserPool(  {
      UserPoolId: config.cognito.UserPoolId,
      ClientId : config.cognito.ClientId
    });


/*
//const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
userRouter.get('/signup', (req, res) => {
});



userRouter.post('/login', (req, res) =>{

  const loginDetails = {
    username: req.body.email,
    password: req.body.password
  }
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);
  const userDetails = {
    username : req.body.email,
    pool : userPool
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails)

  req.session['login-errors'] = [];
  cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess : data =>  {
          console.log('SUCCESS');
          console.log(data);
        },
        onFailure : err => {
          console.err(err);
          req.session['login-errors'].push(err.messsage)
         // res.redirect('/')
        }
      }
  )
});

userRouter.post('/signup', (req, res) =>{
  res.send(req.body);
});

*/
userRouter.post('/login', (req, res) => {
  console.log("Connexion...")

  const loginDetails = {
    Username: req.body.email,
    Password: req.body.password
  }


  //const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(loginDetails);


  //var userPool2 = new AmazonCognitoIdentity.CognitoIdentityServiceProvider.CognitoUserPool(userPool)

  const userDetails = {
    Username : req.body.email,
    Pool : userPool
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userDetails)



  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accesstoken = result.getAccessToken().getJwtToken();
      console.log("SUCCESS : " + accesstoken);
     // callback(null, accesstoken);
    },
    onFailure: (function (err) {
     // callback(err);
      console.error("ERROR:")
      console.error(err);
    }),
    newPasswordRequired: () => {
     // browserHistory.push('/new-password');
      console.log(cognitoUser);
      console.log(cognitoUser.getAuthenticationFlowType(), 'YOU NEED TO CHANGE PASSWORD');
      const userData = {
        Username: cognitoUser.username,
        Pool: userPool,
      };
      cognitoUser.completeNewPasswordChallenge(
          loginDetails.Password, //TODO : Change Password
          {},
          {
            onSuccess: (user) => {
              console.log('success', user);
            },
            onFailure: (error) => {
              console.log(error);
            },
          },
      );
    }
  })
});

userRouter.get('/', (req, res) => {
  console.log("let's go")
});
module.exports = userRouter;