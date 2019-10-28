let kanbanTasks = localStorage.getItem('storedKanbanTasks');

if (kanbanTasks==null) {
  // eslint-disable-next-line max-len
  kanbanTasks='[{"task":"Do intro test","id":1,"sLine":1},{"task":"Learn about JS basics","id":2,"sLine":2},{"id":3,"task":"Implement TODO list","sLine":1},{"id":4,"task":"Implement Kanban","sLine":1}]';
}

let tasks=JSON.parse(kanbanTasks);

let maxId = 0;

// eslint-disable-next-line require-jsdoc
function addTaskToHtml(newTask) {
  if (newTask.id>maxId) {
    maxId=newTask.id;
  }
  const newTaskElm = document.createElement('button');
  newTaskElm.innerHTML=newTask.task;
  newTaskElm.classList.add('taskAsBt');


  if (newTask.sLine==2) {
    newTaskElm.classList.add('inSLine2');
  }
  if (newTask.sLine==3) {
    newTaskElm.classList.add('inSLine3');
  }

  if (newTask.sLine==1) {
    newTaskElm.classList.add('inSLine1');
  }

  newTaskElm.setAttribute('type', 'button');
  newTaskElm.setAttribute('data-id', newTask.id);

  newTaskElm.addEventListener('click',
      function() {
        // eslint-disable-next-line max-len
        // vdaka closure mam pristup k newTaskElm aj newTask a tie maju spravne hodnoty

        if (newTask.sLine==3) {
          return;
        }


        if (newTask.sLine==1) {
          newTaskElm.classList.replace('inSLine1', 'inSLine2');
          document.getElementById('taskline1').removeChild(newTaskElm);
          document.getElementById('taskline2').appendChild(newTaskElm);
          newTask.sLine=2;
        } else if (newTask.sLine==2) {
          newTaskElm.classList.replace('inSLine2', 'inSLine3');
          document.getElementById('taskline2').removeChild(newTaskElm);
          document.getElementById('taskline3').appendChild(newTaskElm);
          newTask.sLine=3;
        }

        localStorage.setItem('storedKanbanTasks', JSON.stringify(tasks));
      }
  );

  document.getElementById('taskline'+newTask.sLine).appendChild(newTaskElm);
}

// --------------------------------------


// 1.nacitanie uloh
for (let i=0, len=tasks.length; i<len; i++) {
  addTaskToHtml(tasks[i]);
}

/*
//Alternatíva predch. cyklu pre EcmaScript 6
for(var task of tasks){
     addTaskToHtml(task);
}
*/

document.getElementById('btAddTask').addEventListener('click',
    function() {
      // eslint-disable-next-line prefer-const
      let newTaskName=document.getElementById('inNewTask').value.trim();
      if (newTaskName!='') {
        maxId++;
        // eslint-disable-next-line prefer-const
        let newTask = {id: maxId, task: newTaskName, sLine: 1};
        tasks.push(newTask);

        localStorage.setItem('storedTasks', JSON.stringify(tasks));

        addTaskToHtml(newTask);
      }
    }
);

document.getElementById('btRemCmpl').addEventListener('click',
    function() {
      tasks = tasks.filter((task) => task.sLine!=3);

      localStorage.setItem('storedTasks', JSON.stringify(tasks));

      // eslint-disable-next-line prefer-const
      let completedTasks = document.getElementsByClassName('inSLine3');
      // tu vyuzijeme, ze completedTasks je ziva kolekcia
      while (completedTasks.length > 0) {
        // eslint-disable-next-line max-len
        completedTasks[0].parentNode.removeChild(completedTasks[0]); // tento kod je univerzalnejsi ako tu potrebujeme
      }
    }
);


