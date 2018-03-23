# WEconnect

[![Build Status](https://travis-ci.org/clintfidel/WEconnect.svg?branch=chore%2F155682421%2Fserverside-environmental-setup)](https://travis-ci.org/clintfidel/WEconnect)
[![Maintainability](https://api.codeclimate.com/v1/badges/cf420ada97a0e205e2b4/maintainability)](https://codeclimate.com/github/clintfidel/WEconnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cf420ada97a0e205e2b4/test_coverage)](https://codeclimate.com/github/clintfidel/WEconnect/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/clintfidel/WEconnect/badge.svg?branch=develop)](https://coveralls.io/github/clintfidel/WEconnect?branch=develop)

WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

## Hosted Application

https://weconnectapp.herokuapp.com/

## Hosted Template

https://clintfidel.github.io/WEconnect/Html/index.html

## Pivotal Tracker Link

https://www.pivotaltracker.com/n/projects/2153164

## API Documentation

The API documentation can be viewed at <a href="http://weconnect.getforge.io/" target="_blank">here</a>


## Technologies Used

* NodeJS
* Express
* PostgreSQL
* Sequelize
* Babel
* Eslint

## Installation

1. Git clone this repository `https://github.com/clintfidel/WEconnect.git`
2. Change your directory `cd WEconnect`
3. Install all dependencies using `npm install`
4. Create .env file which will be used to load environment variables see sample in `.env.example` file in the project root directory
6. Migrate `sequelize db:migrate`
7. Start the app `npm start` for development 
8. Navigate to `localhost:5500` in your browser


## Tests

* Run dummy test using `npm run server:test`
* Run database test using `npm test`



## Coding Style

- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes


## How to Contribute

- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works

Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>


## Author
-  Fidelis Clinton

## License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details