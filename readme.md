#Essencial NodeJS MVC 
###1.0.0

This is my MVC structure for NodeJS application. I based 
this structure in some oriented object concept but is my 
first version available to develop application of agile way 
and organized.

##Technologies

The Essencial is developed in NodeJS, with MongoDB. The framework 
used is Express, with import of various components himself and of 
others packages.

For a full list of components, see the file: package.json` in root
project.

##Development Flow

The development flow is simple, follow the MVC pattern. But the 
differential that is possible include the `services` layer and 
validators` layer and your access is equally simple. Just one 
`require()`.

###Why do it?

The `models` directory store the connection with the database and
the Schema Collection, thus, the Schema is separated of `controllers`. 

In `controllers` have the business rule, interaction with the database
(if necessary) and data manipulation with the `node modules.

In `controllers` have the interaction with the `services` layer. Is
simple because reduces the codes in controller. Is recommended.

For default, the database interaction deployed on `services` and is required 
in `controllers`.

Separately the router file, in this case, `application.js` in `app/routes` is
required to confront the request data and if exist the route specified for it.
If exists, is verified if the access is authenticated or not from the second 
parameter and the third parameter include the method controller on route, to 
load the data, view, response json...
    
    First parameter: The URL route.
    Second Parameter: (Not required) Verify if the access is authenticated.
    Third Parameter: The controller method.
    
    router.get('/dashboard', AuthValidator.isLogged, application.dashboard);

In `views` is rendered the HTML code, JSON string, XML and others... 


###Installation

1. Clone the repository:


    $ git clone git@github.com:ewtmelo/essencial-nodejs-mvc.git

    
2. Access the directory of project and install dependencies:


    $ cd essencial-nodejs-mvc-master
    
    $ npm install


3. Run the server


    $ npm start


##Changelog
    1.0.0

