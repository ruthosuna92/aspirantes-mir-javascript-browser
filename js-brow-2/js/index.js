const inputTask = document.querySelector('input[type="text"]')
const task = document.querySelector('.task')
const listContainer = document.querySelector('.listContainer')
let idCounter = 0
let checkboxStates = {}
const inputUser = document.getElementById('inputUser'); // 
const selectFilter = document.querySelector('select[name="status"]');

inputUser.addEventListener('submit',(event)=>{
  event.preventDefault();
  saveCheckboxStates();
  addTask();
  inputTask.value = ''
  restoreCheckboxStates();
})
listContainer.addEventListener('click', (event)=>{
  if(event.srcElement.nodeName === 'INPUT' && event.srcElement.checked === true){
    event.srcElement.parentNode.style.textDecoration = "line-through";
  event.srcElement.parentNode.style.color = "var(--veryLightPink)"}
  else if(event.srcElement.nodeName === 'INPUT' && event.srcElement.checked === false){
    event.srcElement.parentNode.style.textDecoration = "none";
    event.srcElement.parentNode.style.color = "var(--pink)"
  }
})

let addTask = ()=>{
  idCounter++
  if(inputTask.value === ''){
    alert('Por favor ingresa una tarea')
  }
  else(task.innerHTML += '<div class="taskContainer" id="'+idCounter+'"><input type="checkbox" class="checkbox">'+inputTask.value +'<hr></hr></div>')
}

selectFilter.addEventListener('change', () => {
  filterTasks();
});

function saveCheckboxStates() {
  const checkboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkboxStates[checkbox.parentNode.id] = checkbox.checked;
  }
}

function restoreCheckboxStates() {
  const checkboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    checkbox.checked = checkboxStates[checkbox.parentNode.id] || false;
  }
}

function deleteChecked() {  
  let checkboxGroups = document.getElementsByClassName('taskContainer');  
  for (let i = checkboxGroups.length - 1; i >= 0; i--) {
    let checkbox = checkboxGroups[i].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      checkboxGroups[i].remove();
    }
  }
}

function filterTasks() {
  const optionValue = selectFilter.value;
  const taskContainers = document.getElementsByClassName('taskContainer');
  for (let i = 0; i < taskContainers.length; i++) {
    const taskContainer = taskContainers[i];
    const checkbox = taskContainer.querySelector('input[type="checkbox"]');
    if (optionValue === 'completedTasks' && checkbox.checked) {
      taskContainer.style.display = 'block';
    } else if (optionValue === 'taskToComplete' && !checkbox.checked) {
      taskContainer.style.display = 'block';
    } else if (optionValue === 'allTasks') {
      taskContainer.style.display = 'block';
    } else {
      taskContainer.style.display = 'none';
    }
  }
}
