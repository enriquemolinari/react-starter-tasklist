export let tasks = (function () {
  const apiTask = process.env.REACT_APP_URI_TASK;

  function doneOrUndone(done, idTask) {
    let uri = apiTask + "/tasks/done";
    if (done) uri = apiTask + "/tasks/inprogress";

    return fetch(uri, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        idTask: idTask,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (r.status === 401)
          return Promise.reject({
            status: 401,
            msg: "You are not authenticated",
          });
        if (!r.ok) return Promise.reject(r.status);
        return r.json();
      })
      .then((json) => Promise.resolve(json))
      .catch((e) => Promise.reject(e));
  }

  function retrieve() {
    return fetch(apiTask + "/tasks", {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          return Promise.reject("Not logged in. Please, sign in first.");
        } else {
          if (response.status !== 200) {
            return Promise.reject("Something went wrong.");
          }
        }
        return response.json();
      })
      .then((json) => {
        return Promise.resolve(json);
      });
  }

  function deleteOne(taskToDelete) {
    return fetch(apiTask + "/tasks", {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        idTask: taskToDelete,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (r.status === 401)
          return Promise.reject({
            status: 401,
            msg: "You are not authenticated",
          });
        if (!r.ok) return Promise.reject("Something when wrong.");
        return r.json();
      })
      .then((json) => Promise.resolve(json))
      .catch((e) => Promise.reject(e));
  }

  function add(expirationDate, text) {
    return fetch(apiTask + "/tasks", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        expirationDate: expirationDate,
        taskText: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((r) => {
        if (r.status === 401)
          return Promise.reject({
            status: 401,
            msg: "You are not authenticated",
          });
        if (!r.ok) Promise.reject(r.status);
        return r.json();
      })
      .then((json) => Promise.resolve(json))
      .catch((e) => Promise.reject(e));
  }

  return {
    doneOrUndone: doneOrUndone,
    retrieveAll: retrieve,
    delete: deleteOne,
    addNew: add,
  };
})();
