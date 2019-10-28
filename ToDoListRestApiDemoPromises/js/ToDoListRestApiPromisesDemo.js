//S.Korecko, 2019

const tareaOut = document.getElementById('tareaResponse');
const back4appAppId = 'G0gnBMRBdJnVlS2THUjYQ0NRMQRz14fMqc431A1b';
const back4appApiKey = 'QN0rH8P55jTSHTK5WnPtNCKALTUqinhD51ai2cGL';


/**
 * Processes a click on the "Add task" button.
 */
function addTask() { // eslint-disable-line no-unused-vars
  tareaOut.value = 'addTask started ...';

  const taskName = document.getElementById('inNewTask').value.trim();
  const url = 'https://parseapi.back4app.com/classes/Tasks/';

  if (taskName == '') {
    tareaOut.value += '\nSorry, nothing to send.\nDone.';
    return;
  }
  const data = JSON.stringify({ task: taskName, isDone: false });
  fetchFun('POST', url, data);
}

/**
 * Processes a click on the "Edit  task (rewrite description)" button.
 */
function editTask() { // eslint-disable-line no-unused-vars
  tareaOut.value = 'editTask started ...';

  const taskName = document.getElementById('inNewTaskName').value.trim();

  if (taskName == '') {
    tareaOut.value += '\nSorry, no new task name set.\nDone.';
    return;
  }

  const taskId = document.getElementById('inTaskIdEdt').value.trim();

  if (taskId == '') {
    tareaOut.value += '\nSorry, no task id specified.\nDone.';
    return;
  }

  const url = 'https://parseapi.back4app.com/classes/Tasks/' + taskId;
  const data = JSON.stringify({ task: taskName, isDone: false });
  fetchFun('PUT', url, data);
}


/**
 * Processes a click on the "Delete  task" button.
 */
function deleteTask() {// eslint-disable-line no-unused-vars
  tareaOut.value = 'deleteTask started ...';

  const taskId = document.getElementById('inTaskIdRem').value.trim();

  if (taskId == '') {
    tareaOut.value += '\nSorry, nothing to delete.\nDone.';
    return;
  }

  const url = 'https://parseapi.back4app.com/classes/Tasks/' + taskId;
  fetchFun('DELETE', url);
}

/**
 * Processes a click on the "Get all  tasks" button.
 * With fetch call using then and catch
 */

function getTasks() { // eslint-disable-line no-unused-vars
  tareaOut.value = 'getTasks started ...';

  const url = 'https://parseapi.back4app.com/classes/Tasks/';
  fetchFun('GET', url);
}

/**
 * Processes a response object from a successful AJAX call.
 * @param {*} response object with the response
 */
function writeSuccResponse(response) {
  console.log(response);
  tareaOut.value = 'SUCCESS. \n\nResponse:\n' + JSON.stringify(response);
}

/**
 * Processes an error message (from a failed AJAX call.)
 * @param {*} message error message
 */
function writeErrMsg(message) {
  tareaOut.value = 'ERROR.\n' + message;
}


function fetchFun2(url,options) {
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        writeErrMsg && writeErrMsg(response.status);
      }
    })
    .then(responseJSON => {
      writeSuccResponse && writeSuccResponse(responseJSON);
    })
    .catch(error => {
      writeErrMsg(error);
    });
}
function fetchFun(myMethod, url, data) {
  const options =
  {
    method: myMethod,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Parse-Application-Id': back4appAppId,
      'X-Parse-REST-API-Key': back4appApiKey
    },
    body: data
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        writeErrMsg && writeErrMsg(response.status);
      }
    })
    .then(responseJSON => {
      writeSuccResponse && writeSuccResponse(responseJSON);
    })
    .catch(error => {
      writeErrMsg(error);
    });
}