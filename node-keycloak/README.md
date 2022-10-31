# Node/Keycloak Batch Assist
This project was created to facilitate batch user entries into Keycloak and for user email verification to be automated in the process.

##  Install Dependencies
```sh
npm install
```

## Run the dev set-up:



```sh
npm run dev
```

That will trigger the `dev.js` located in `src/tests/` to start running the index.js file with a set of curated parameters. It will use the `csv` file located in `src/tests/users.csv` to read a bulk list of users and add the mto keycloak.

The `dev.js` file has a set of default values that will need to be modified when trying to upload the bulk list of users to keycloak, they are configurations taht are specific to the keycloak instance that is running. 
