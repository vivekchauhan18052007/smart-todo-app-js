let taskList = document.querySelector("#taskList");
let input = document.querySelector("#input-text");
let savetask = JSON.parse(localStorage.getItem("tasks")) || [];

function AddTask(localStorageText, completed = false) {
  let text = localStorageText || input.value;

  if (text.trim() == "") {
    alert("Enter Valid String");
    return;
  }
  let li = document.createElement("li");
  let span = document.createElement("span");

  taskList.appendChild(li);
  li.appendChild(span);

  span.innerText = text;
  input.value = "";

  CheckTask(li, completed);
  DeleteTask(li);
  EditInfo(li, span);
  SaveTask();
}

function DeleteTask(task) {
  let deleteTask = document.createElement("button");
  deleteTask.innerText = "delete";
  task.appendChild(deleteTask);
  deleteTask.addEventListener("click", () => {
    task.remove();
    SaveTask();
  });
}

function CheckTask(task, completed = false) {
  let checked = document.createElement("input");
  checked.type = "checkbox";
  checked.checked = completed;
  task.prepend(checked);

  if (completed) {
    task.classList.add("hidden");
  }

  checked.addEventListener("change", () => {
    task.classList.toggle("hidden");
    SaveTask();
  });
}

function EditInfo(task, span) {
  let edit = document.createElement("button");
  edit.innerText = "Edit";
  task.appendChild(edit);

  edit.addEventListener("click", () => {
    let takeVal = prompt("Please Enter Text: ", span.innerText);
    if (takeVal == null || takeVal.trim() == "") {
      alert("Please Enter Valid String");
      return;
    }
    span.innerText = takeVal;
    SaveTask();
  });
}

function SaveTask() {
  let allTask = [];

  let EachList = document.querySelectorAll("#taskList li");

  EachList.forEach((li) => {
    let text = li.querySelector("span").innerText;
    let completed = li.querySelector("input").checked;
    allTask.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(allTask));
}

savetask.forEach((task) => {
  AddTask(task.text, task.completed);
});
