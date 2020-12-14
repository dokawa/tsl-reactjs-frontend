# TSL Full Stack Assignment

### Prerequisites

This project requires [Nodejs](https://nodejs.org/en/) with the package [npm](https://github.com/npm/cli/releases/) installed

Make sure that the [backend application is running](https://github.com/dokawa/tsl-django-rest-backend)

The project is also hosted on [Heroku](https://tsl-react-frontend.herokuapp.com/)

ATTENTION: the hosted version does not send e-mails due to restrictions on Gmail (it could be corrected with a production e-mail service) the local version send it as requested in the assignment


### Installing

Clone the repository

```
git clone https://github.com/dokawa/tsl-reactjs-frontend.git
```


Install the node modules

```
cd tsl-reactjs-frontend
npm install
```


### Running the application

```
npm start
```

### Testing

```
npm run test
```

### Considerations

* Given the non critical nature of the assignment, the authentication method
is simple and overall effective, but not the most secure
* The .env file is included in the repository in favor of simplicity to run the assignment

### Future work

* The use of socket for automatic update of changes from the server (e.g. new message posted)
* More secure authentication method like OAuth 2.0
* Support for posting images, videos and urls
