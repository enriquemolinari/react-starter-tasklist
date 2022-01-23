export let users = (function () {
  const apiAuth = process.env.REACT_APP_URI_AUTH;
  const STOREUNAME = "username";
  const STOREUROLES = "roles";
  const STOREUID = "id";

  function userId() {
    return localStorage.getItem(STOREUID);
  }

  function userName() {
    return localStorage.getItem(STOREUNAME);
  }

  function hasRole(role) {
    let userRoles = localStorage.getItem(STOREUROLES);
    return role.includes(userRoles);
  }

  function logout() {
    return fetch(apiAuth + "/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.clear();
        return Promise.resolve();
      });
  }

  function login(userName, password) {
    return fetch(apiAuth + "/login", {
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
          localStorage.setItem(STOREUNAME, json.user.name);
          localStorage.setItem(STOREUROLES, json.user.roles);
          localStorage.setItem(STOREUID, json.user.id);
          return Promise.resolve();
        } else {
          return Promise.reject({
            msg: json.message,
            error: true,
          });
        }
      });
  }

  return {
    login: login,
    logout: logout,
    userId: userId,
    userName: userName,
    hasRole: hasRole,
  };
})();
