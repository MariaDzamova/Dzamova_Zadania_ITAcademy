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

    if (taskName == '') {
        tareaOut.value += '\nSorry, nothing to send.\nDone.';
        return;
    }
    const url = 'https://parseapi.back4app.com/classes/Tasks/';
    const data = JSON.stringify({ task: taskName, isDone: false });
    tryCatchFun('POST', url, data);
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
    tryCatchFun('PUT', url, data);
}

/**
 * Processes a click on the "Delete  task" button.
 */
function deleteTask() {// eslint-disable-line no-unused-vars
    tareaOut.value = 'deleteTask started ...';

    const taskId = document.getElementById('inTaskIdRem').value.trim();
    const url = 'https://parseapi.back4app.com/classes/Tasks/' + taskId;

    if (taskId == '') {
        tareaOut.value += '\nSorry, nothing to delete.\nDone.';
        return;
    }
    tryCatchFun('DELETE', url);
}

/**
 * Processes a click on the "Get all  tasks" button.
 * With fetch call using async and await
 */
function getTasks() { // eslint-disable-line no-unused-vars
    tareaOut.value = 'getTasks started ...';

    const url = 'https://parseapi.back4app.com/classes/Tasks/';
    tryCatchFun('GET', url);
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

async function tryCatchFun(myMethod, url, data) {
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

    try {
        let response = await fetch(url, options);
        if (response.ok) {
            returnedData = await response.json();
            writeSuccResponse && writeSuccResponse(returnedData);
        } else {
            writeErrMsg && writeErrMsg(response.status);
        }
    } catch (error) {
        writeErrMsg && writeErrMsg(error);
    }


}