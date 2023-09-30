class Task{
    constructor(task,isDone){
        this.task=task;
        this.isDone=isDone;
    }
    toggleDone(elId, stateT){
        if ( elId.style.backgroundColor=="green"){
            elId.style.backgroundColor="white"
            stateT.textContent="Not Completed"
        }else{
            elId.style.backgroundColor="green" 
            stateT.textContent="Completed"
        }
       
        this.isDone=!this.isDone
     
    }
    ShowEdit(id){
        id.style.display = 'flex'; 
  
    }
    Edit(Input, taskBox, container){
        let InText = Input.value; 
       // divs.style.display = 'none'; 
        
      
        taskBox.tasks = taskBox.tasks.filter(t => t != this);
        
        var oldTaskCard = document.getElementById('TaskCont_' + this.task);
        oldTaskCard.parentNode.removeChild(oldTaskCard);
        
        let newTask = new Task(InText, false);
        taskBox.addTask(newTask);
        let newTaskCard = document.getElementById('TaskCont').cloneNode(true);
        let newState = newTaskCard.querySelector('h4');
        let newInput = newTaskCard.querySelector('input');
        newInput.id = "InputEdit" + InText;
        newTaskCard.style.display = 'flex';
        newTaskCard.id = 'TaskCont_' + InText;
        let divsNew = newTaskCard.querySelectorAll('div');
        
        divsNew[0].addEventListener('click', () => newTask.toggleDone(newTaskCard, newState));
        divsNew[0].addEventListener("dblclick", () => newTask.ShowEdit(divsNew[2]));
        
        let currentDate = new Date();
        let newTime = newTaskCard.querySelector('p');
        newTime.textContent = currentDate;
        
        let newText = newTaskCard.querySelector('h3');
        newText.textContent = InText;
        
        let buttons = newTaskCard.querySelectorAll('button');
        buttons[0].addEventListener('click', () => taskBox.removeTask(newTask, newTaskCard));
        buttons[1].addEventListener('click', () => newTask.Edit(newInput, taskBox, container));
        
        container.appendChild(newTaskCard);
    }

    }

class BoxTasks{
    constructor(tasks){
        this.tasks=tasks;  
    }
    addTask(task){
      
      this.tasks.push(task)
    }
    
    removeTask(task, TaskId){

        
        TaskId.parentNode.removeChild(TaskId);
        
        this.tasks = this.tasks.filter(Dtask=> Dtask!= task);  
       // alert(this.tasks.length);

    }

    removeCompleted() {
        this.tasks = this.tasks.filter(task => {
            if (task.isDone) {
                var elementId = 'TaskCont_' + task.task;
                var element = document.getElementById(elementId);
                element.parentNode.removeChild(element);
            }
            return !task.isDone;
        });
    }

    removeAll() {
    if(checkDone()==true){

        var Sure = prompt("Are U sure? Y/N");
if (Sure=="Y"){
        var container = document.getElementById('cont');
        container.innerHTML = '';  
        this.tasks = [];
}
    }  
    }
    
}


let taskBox = new BoxTasks([]);
function checkDone(){

    for (let index = 0; index < taskBox.tasks.length; index++) {
        if (taskBox.tasks[index].isDone==false){
            return true
        }
        
    }
}
function DeleteDone(){
    
    taskBox.removeCompleted();

}


function DeleteAll(){
    taskBox.removeAll();

}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        var elements =  document.getElementsByClassName('Editor')
    for(var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    }
  });
function Add(){
    var tasktext=document.getElementById("inputTask").value;
    if(tasktext.length>0){
      var task=new Task(tasktext,false)
    taskBox.addTask(task);
    var container = document.getElementById("cont"); 
    var newTaskInfo = document.getElementById('TaskCont').cloneNode(true);
    var state =newTaskInfo.querySelector('h4')
    var Input=newTaskInfo.querySelector('input')
    Input.id="InputEdit"+tasktext
    newTaskInfo.style.display='flex'
    newTaskInfo.id = 'TaskCont_' + tasktext;


        var divs =  newTaskInfo.querySelectorAll('div');
        divs[0].addEventListener('click', () =>  task.toggleDone(newTaskInfo,state));
       // divs[2].id="Edit_"+taskBox;
        divs[0].addEventListener("dblclick",()=> task.ShowEdit(divs[2]))
        //divs[2].
        let currentDate = new Date();

        var Time=newTaskInfo.querySelector('p')
        Time.textContent=currentDate
       var Text= newTaskInfo.querySelector('h3')
       Text.textContent = tasktext;
var buttons= newTaskInfo.querySelectorAll('button');
    buttons[0].addEventListener('click', () => taskBox.removeTask(task, newTaskInfo));
    buttons[1].addEventListener('click', () => task.Edit(Input, taskBox, container));
    
    container.appendChild(newTaskInfo);
    }else{
        alert("bad");
    }
}