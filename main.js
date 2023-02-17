let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let  radio= form.choix
console.log('radio => ', radio);

let msg = document.getElementById("msg");
// DOM 3 container
let tasks1 = document.getElementById("tasks1");
let tasks2 = document.getElementById("tasks2");
let tasks3 = document.getElementById("tasks3");
let current = document.getElementById("current");
let add = document.getElementById("add");




form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
  
      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  };

  let data = [];
  let datacurrent=[];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,  
    statut: radio.value ,

  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  // const btntodo=document.getElementById('TODO');
  // btntodo.addEventListener("click",createTasks())
  // const btnCURRENT=document.getElementById('CURRENT');
  // btntodo.addEventListener("click",createCurrent())
   createTasks();
};

let createTasks = () => {
    tasks1.innerHTML = "";
    tasks2.innerHTML = "";
    tasks3.innerHTML = "";
    data.map((x, y) => {
      let template=`
<div id=${y}>
      <span class="fw-bold">${x.text}</span>
      <span class="small text-secondary">${x.date}</span>
      <p>${x.description}</p>

      <span class="options">
        <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
      </span>
    </div>
`
      if (x.statut==='faire') {
        tasks1.innerHTML += template;
        return tasks1
      }
      if (x.statut==='courant') {
        tasks2.innerHTML += template;
        return tasks2
      }
      if (x.statut==='finie') {
        tasks3.innerHTML += template;
        return tasks3
      }

    });
    
  
    resetForm();
  };

  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };
  
  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };
  let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();


  // current

  let createCurrent = () => {
    current.innerHTML = "";
    data.map((x, y) => {
      return (current.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
    
  
    resetForm();
  };
