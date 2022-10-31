import { Keycloak, User, readCSV } from "./lib";

// Used to track the relevant headers from the CSV file and it's corresponding keycloak field name.
export enum FieldMappings {
  firstName = "First Name",
  lastName = "Last Name",
  email = "Email Address",
  username = "Login Name",
  enabled = "User Status (Description)",
}

export async function main(
  username: string,
  password: string,
  realm: string,
  client: string,
  initRole: string,
  csvFile: string
) {
  // Get a map with each CSV column header as the corresponding key
  const csvContent = await readCSV(csvFile);

  // obtain keycloak handle to authenticate and perform other user operations.
  const keycloak = new Keycloak(username, password, realm, client);
  await keycloak.auth();

  // Map the headers for the users in the CVS with the corresponding field in keycloak.
  for (const user of csvContent) {
    const newUser: User = {
      "firstName": user[FieldMappings.firstName],
      "lastName": user[FieldMappings.lastName],
      "email": user[FieldMappings.email],
      "username": user[FieldMappings.username],
      "enabled": user[FieldMappings.enabled] == "Active",
      "emailVerified": false
    }

    try {
      await keycloak.postUser(newUser);
    } catch (err) {
      console.warn(`Attempted to create a user that already exists in Keycloak : ${newUser.username}`);
    }
  }

  // retrieve all users with assigned id, after creating them.
  const users = await keycloak.getUsers();

  for (const user of users) {
    // assign all the users the appropriate client role(s)
    await keycloak.UserRoleMappings(user, initRole);

    // send all users that have not yet been verified a verification email
    if (!user.emailVerified){
      try {
        await keycloak.sendVerifyEmail(user);
      } catch (err) {
        console.warn(`An issue occurred Attempting to send ${user.username} a verification email : ${err}`);
      }
    }
  }

  // No critical errors encountered
  return "Completed Successfully!";
}
