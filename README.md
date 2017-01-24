# Project Tracker

This is front application to track work time of project team members and to manage project teams. Please note that the app uses API and API key is not present here.
<br/><br/>

## Getting Started

To run the app you should:

1. Run ```npm i```
2. Run ```npm start```
3. Open your browser on: ```http://localhost:9000/```.


## Demo

![project team manager index](./demo_gifs/9.Demo.gif)
<br/>
To see more detailed demo gifs, please visit ```./demo_gifs``` directory

<br/><br/>


## Project structure
```
.  
├── client                                  # source files  
│   ├── app                                  
│   │   ├── auth                            # authorization components and services
│   │   ├── common                          # module with common components, directives, pipes used by other modules
│   │   ├── core                            # routes, guards, components, services of the AppModule
│   │   ├── feature_modules                 # feature modules, each of them includes its own components, directives, pipes, services and models
│   │   └── helpers                         # helper functions
│   ├── static_data                         # static data of the app
│   ├── config.js                           # configuration of the app
│   ├── boot.js                             # bootstrap file for AppModule
│   └── index.html  
├── dist                                    # compiled files   
├── server                                  # local server files            
├── tasks                                   # gulp tasks
├── postcss.config.js                       # PostCSS config file
├── gulpfile.babel.js                       # main gulp file
.
.
.
```
<br/><br/>

## Built With

The app is created using Angular 2, ES2015 with Babel, SemanticUI, PostCSS, SCSS, Gulp, Webpack, Express, angular2-babel-esnext-starter.
<br/><br/>

## Authors

* Dominik Broj
