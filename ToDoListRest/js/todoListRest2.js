// globalne premenne
var tareaOut = document.getElementById("tareaResponse");
const back4appApiId = "frsqRdf8vciVikI8TekbiZ8WhGkaNJWlyNXZjFyz";
const back4appApiKey = "HnuLl3TbMCkNg93WtU8Nrz4w1lNR6ebWfKsPmR0l";
const url="https://parseapi.back4app.com/classes/Tasks/";
const responseType = 'json';



var todoTasks = null;
getTasks();
var tasks = JSON.parse(todoTasks);



function addTaskToHtml(newTask) {
    var newTaskElm = document.createElement("button");
    newTaskElm.innerHTML = newTask.task;
    newTaskElm.classList.add("taskAsBt");

    if (newTask.isDone) {
        newTaskElm.classList.add("completedTask");
    }
    else {
        newTaskElm.classList.add("activeTask");
    }

    newTaskElm.setAttribute("type", "button");
    newTaskElm.setAttribute("data-id", newTask.objectId);

    newTaskElm.addEventListener("click",
        function () {
            newTaskElm.classList.toggle("completedTask");
            newTaskElm.classList.toggle("activeTask");
            newTask.isDone = !newTask.isDone;
            editTask(newTask);
        }
    );
    document.getElementById("frmTasks").appendChild(newTaskElm);
}

document.getElementById("btAddTask").addEventListener("click",
    function () {
        var newTaskName = document.getElementById("inNewTask").value.trim();
        if (newTaskName != "") {
            var data = JSON.stringify({ task: newTaskName, isDone: false });
            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            setupHttpRequest(request);
            request.onload = function() {
                var status = request.status;
                if (status === 201) {
                    writeSuccResponse && writeSuccResponse(request.response);    
                    get1Task(request.response.objectId);          
                } else {
                    writeErrMsg && writeErrMsg(status, request.response);
                }
            };
            request.send(data);
        }                   
    }
);

document.getElementById("btRemCmpl").addEventListener("click",
    function () {
        var completedTasks = document.getElementsByClassName("completedTask");
        while (completedTasks.length > 0) {
            var idTask = completedTasks[0].getAttribute("data-id");
            deleteTask(idTask);
            completedTasks[0].parentNode.removeChild(completedTasks[0]);
        }
    }
);

//--------------------------------------

function get1Task(taskId){
        var request = new XMLHttpRequest();
        request.open('GET', url+taskId, true);
        setupHttpRequest(request);
        request.onload = function() {
            var status = request.status;
            if (status === 200) {
                writeSuccResponse && writeSuccResponse(request.response);
                var tdTask = request.response;
                addTaskToHtml(tdTask);
            } else {
                writeErrMsg && writeErrMsg(status, request.response);
            }
        };
        request.send();
}

function getTasks() {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    setupHttpRequest(request);

    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
            var todoTasks = request.response.results;
            // nacitanie uloh
            for (var i = 0, len = todoTasks.length; i < len; i++) {
                addTaskToHtml(todoTasks[i]);
            }
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send();
}

function editTask(task) {
    var request = new XMLHttpRequest();
    request.open('PUT', url+task.objectId, true);
    setupHttpRequest(request);
    const data = JSON.stringify({ isDone: task.isDone});

    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send(data);  
}

function deleteTask(taskId) {
    var request = new XMLHttpRequest();
    request.open('DELETE', url+taskId, true);
    setupHttpRequest(request);

    request.onload = function() {
        var status = request.status;
        if (status === 200) {
            writeSuccResponse && writeSuccResponse(request.response);
        } else {
            writeErrMsg && writeErrMsg(status, request.response);
        }
    };
    request.send();
}


function writeSuccResponse(response){
    console.log(response);
    tareaOut.value="SUCCESS. \n\nResponse:\n"+JSON.stringify(response);
}


function writeErrMsg(status, response){
    tareaOut.value="ERROR \nStatus:"+status+"\nResponse: "+response;
}


function setupHttpRequest(request) {
    request.responseType = responseType;
    request.setRequestHeader("X-Parse-Application-Id", back4appApiId);
    request.setRequestHeader("X-Parse-REST-API-Key" ,back4appApiKey);
} 
