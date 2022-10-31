import { main } from "../src/";

const keycloakUsername = "admin";
const keycloakPassword = "admin";
const keycloakRealm = "keycloak-angular-sandbox"
const keycloakClient = "keycloak-angular"
const filePath = "./tests/users.csv";

main(keycloakUsername, keycloakPassword, keycloakRealm, keycloakClient, filePath)
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
