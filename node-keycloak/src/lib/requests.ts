import axios from "axios";
import { User } from "./"

const baseUrl = "http://10.7.0.110.nip.io/auth";

export async function authKeycloak(username: string, password: string) {
  return axios({
    url: `${baseUrl}/realms/master/protocol/openid-connect/token`,
    method: "post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams({
      username: username,
      password: password,
      "grant_type": "password",
      "client_id": "admin-cli",
    }),
  });
}

export async function getUsers(accessToken: string, realm: string) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/users`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getUser(accessToken: string, realm: string, userId: string) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/users/${userId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function postUser(accessToken: string, realm: string, user: User) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/users`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    data: user,
  });
}

export async function sendVerifyEmail(accessToken: string, realm: string, user: User) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/users/${user.id}/send-verify-email`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    method: "put",
  });
}

export async function UserRoleMappings(
  accessToken: string,
  realm: string,
  client: string,
  user: User,
  roleId: string,
  roleName: string
) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/users/${user.id}/role-mappings/clients/${client}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    data: [{
      "name": roleName,
      "id": roleId
    }],
  });
}

export async function getClients(accessToken: string, realm: string) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/clients`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getRoles(accessToken: string, realm: string, client: string) {
  return axios({
    url: `${baseUrl}/admin/realms/${realm}/clients/${client}/roles`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
