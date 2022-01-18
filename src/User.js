const STOREUNAME = "username";
const STOREUROLES = "roles";
const STOREUID = "id";

export default class User {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  userId() {
    return sessionStorage.getItem(STOREUID);
  }

  userName() {
    return sessionStorage.getItem(STOREUNAME);
  }

  hasRole(role) {
    let userRoles = sessionStorage.getItem(STOREUROLES);
    return role.includes(userRoles);
  }

  static current(apiUrl) {
    return new User(apiUrl);
  }

  logout() {
    return fetch(this.apiUrl + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        sessionStorage.clear();
        return Promise.resolve();
      });
  }

  login(userName, password) {
    return fetch(this.apiUrl + "/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user: userName,
        pass: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          return Promise.reject({
            msg: "Username or password incorrect...",
            error: true,
          });
        }
        return response.json();
      })
      .then((json) => {
        if (json.result === "success") {
          sessionStorage.setItem(STOREUNAME, json.user.name);
          sessionStorage.setItem(STOREUROLES, json.user.roles);
          sessionStorage.setItem(STOREUID, json.user.id);
          return Promise.resolve();
        } else {
          return Promise.reject({
            msg: json.message,
            error: true,
          });
        }
      });
  }
}
