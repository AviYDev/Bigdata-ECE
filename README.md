# ProjectManager-ECE

<img width="20%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/GitLab_logo.svg/1024px-GitLab_logo.svg.png">
<img width="10%" src="https://img.icons8.com/color/452/amazon-web-services.png">
<img width="20%" src="https://snapforum.s3.dualstack.us-east-1.amazonaws.com/original/2X/2/28b210ec069326d1914b54186854e278b874e08e.png">
<img width="10%" src="https://atomrace.com/blog/wp-content/uploads/2016/02/heroku-logo-trans.png">



Projet ING5 APP
### Joris Dufresne & Avinash Yoganandan
## https://ece-projectmanager.herokuapp.com/

L'appli sur heroku peut mettre un moment avant de s'afficher. C'est une version gratuit d'Heroku

## En Bref
Connexion à une interface liée à une org sur AWS permettant de lister les projets selon le groupe d'un utilisateur.
Ce groupe repartis par projet Gitlab pour une org donnée.
Ce projet a été au préalable était fait via Freeipa dans le but de le lancer sur un docker.
Par soucis de temps, les utilisateurs sont gérés par AWS.
* Connexion sécurisé via Amazon Cognito
  * Contrôle d'accès à vos applications Web et mobiles.
  * Administration des utilisateurs
  * Reset de password à la premiere connexion via un email automatique.
  * Utilisateurs repartis en groupe par projet
  * Certificat CA
  * AWS Identité de Securité / Credentials, Clés d'acces afin d'utiliser l'api via AWS-SDK

* Integration de repository Gitlab
  * Accès sécurisé via le Gitlab  Personnal Acces Token
    
    (Etant non terminé voici une clé : gSjb4csVx_6ZSFR6Kuda)
  * Accès aux details des public repositories 
  * Accès aux details des repositories d'une organisation specifiques

* CI/CD
  * Branch Master
  * Branch Develop
  * Travis CI afin de build et tester l'application pour de valider le deploiement
  * Deploiement automatique en production sur Heroku via la branch Master
  * Scenario 2 : Deploiement sur Amazon Ec2 via un container Docker
* TODO
  * Console admin permettant d'affecter automatiquement les repositories et les groupes
  * Amelioration du delivery via Docker & Aws
  * Push les métadonnées voulues
* Heroku URL : https://ece-projectmanager.herokuapp.com/

## Installation Local
Back :
````
git clone https://github.com/AviYDev/ProjectManager-ECE.git
git checkout develop
npm install
npm start
````
Application NodeJS
###### Port 3001


Front :
````
git clone https://github.com/AviYDev/ProjectManagerFront-ECE.git
git checkout develop
npm install
npm start
````
Application ReactJS
###### Port 3000


Afin de tester :
````

Username : Xavier 
PasswordTemp : ECE_bigdata_2020  

Username : admin
Password: ECE_bigdata_2020

Majuscule / Minuscule / Chiffre / CaractèreSpeciaux lorsque l'on reset le password    

````
### Aperçu
<img src="https://i.imgur.com/lJrQzXe.png">
<img src="https://i.imgur.com/ZyjTK69.png">
<img src="https://i.imgur.com/lrhguim.png">


##### Clé gitlab pour l'accès à l'Org ECE : gSjb4csVx_6ZSFR6Kuda


## Notes & Best practices

* SSL via Heroku

* Aucune clé AWS en claire, on passe par les variables d'environnement en production
  <img src="https://i.imgur.com/LDBczaN.png%22%3E">
  ```js
  AWS.config.update({
  region:'us-east-2',
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY}
  );```

* CA
  <img src="https://i.imgur.com/i0Kmqjp.png%22%3E">

  