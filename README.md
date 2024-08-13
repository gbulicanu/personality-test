# Getting Started with Personality Test App

The frontend project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and backend exists
in api folder and it implemented in Python with flask within pipenv based virtual environment.

## Prerequisites

* Node.js latest LTS
* Python 3.x
* pip install pipenv

## Available Scripts

In the project directory, you can run:

### `npm start-api`

Runs the backend api in the development mode.\
Play with [http://127.0.0.1:5000](http://127.0.0.1:5000) in Postman or curl it.

### `npm start`

Runs the frontend app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The flask backend api will be proxy'd under [http://localhost:3000/api](http://localhost:3000/api)

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test-api`

Launches backend test runner.\
See the section about [running pytest tests](hhttps://docs.pytest.org/en/7.1.x/how-to/usage.html) for more information.

### `npm test`

Launches frontend test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds frontend app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
