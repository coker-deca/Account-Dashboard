# React GraphQL with Typescript

Run the server with json-graphql-server, to start server make sure to install with:
```npm install -g json-graphql-server
```

then:
To use a port other than 3000, you can run: 
```json-graphql-server db.js --p <your port here>
```
To use a host other than localhost, you can run 
```json-graphql-server db.js --h <your host here>
```

---

Then run the client

```bash
yarn
yarn start
```

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
