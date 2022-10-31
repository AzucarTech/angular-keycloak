import { main } from "../src/";

const keycloakUsername = "admin";
const keycloakPassword = "admin";
const keycloakRealm = "keycloak-angular-sandbox"
const keycloakClient = "keycloak-angular"
const keycloakClientRole = "auditor_client";
const filePath = "./tests/users.csv";

// test the index.js main application from here
main(
  keycloakUsername,
  keycloakPassword,
  keycloakRealm,
  keycloakClient,
  keycloakClientRole,
  filePath
)
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    // console.log(err.response);
    console.log(err && err.response && err.response.data);
    process.exit(1);
  });
