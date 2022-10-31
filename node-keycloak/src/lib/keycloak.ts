import {
  authKeycloak,
  getUsers,
  postUser,
  sendVerifyEmail,
  UserRoleMappings,
  getClients,
  getRoles,
} from "./";

export interface User {
  id?: string; // optional, set by keycloak.
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export class Keycloak {
  private username: string;
  private password: string;
  private accessToken: string;
  private realm: string;
  private client: string;
  private cache: any;

  constructor(username: string, password: string, realm: string, client: string) {
    this.username = username;
    this.password = password;
    this.realm = realm;
    this.client = client;
    this.cache = {};
  }

  async auth() {
    const { data } = await authKeycloak(this.username, this.password);
    this.accessToken = data["access_token"];
    
    return data;
  }

  async getUsers(recache = true) {
    if (!this.cache.users || recache) {
      const { data } = await getUsers(this.accessToken, this.realm);
      this.cache.users = data;
    }

    return this.cache.users;
  }

  async getUser(username: string) {
    const users = await this.getUsers();
    return users.find(user => user.username == username)
  }

  async postUser(user: User) {
    return await postUser(this.accessToken, this.realm, user);
  }

  async sendVerifyEmail(user: User) {
    return await sendVerifyEmail(this.accessToken, this.realm, user);
  }
  
  async UserRoleMappings(user: User, role: string) {
    //retrieve the appropriate client id info
    const { id: clientId } = await this.getClient(this.client);
    const { id: roleId } = await this.getRole(role);

    return await UserRoleMappings(this.accessToken, this.realm, clientId, user, roleId, role);
  }

  async getClients(recache = false) {
    if (!this.cache.clients || recache) {
      const { data } = await getClients(this.accessToken, this.realm);
      this.cache.clients = data;
    }

    return this.cache.clients;
  }

  async getClient(clientName: string) {
    const clients = await this.getClients();
    return clients.find(client => client.clientId == clientName)
  }

  async getRoles(recache = false) {
    if (!this.cache.roles || recache) {
      const { id } = await this.getClient(this.client);
      const { data } = await getRoles(this.accessToken, this.realm, id);
      this.cache.roles = data;
    }

    return this.cache.roles;
  }

  async getRole(roleName: string) {
    const roles = await this.getRoles();
    return roles.find(role => role.name == roleName)
  }
}
