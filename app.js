const form = document.querySelector('#task-form');
const ul= document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const input = document.querySelector('#task');

loadEventListener();

function loadEventListener(){

    form.addEventListener('submit',runtask);
    ul.addEventListener('click', remove);
    clear.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTask);

    document.addEventListener('DOMContentLoaded', getTasks);

    document.body.addEventListener('mousemove', background);
}

function getTasks(){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(a);
        ul.appendChild(li);
    })
}

function runtask(e){

    if(input.value === ''){

        alert('Please enter some input first!!');
    }
    else{

        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(input.value));
    
        const a = document.createElement('a');
        a.className = 'delete-item secondary-content';
        a.innerHTML = '<i class="fa fa-remove"></i>';
    
        li.appendChild(a);
        ul.appendChild(li);
        
        insertInLS(input.value);
    }

    input.value = '';
    e.preventDefault();
}

function insertInLS(task){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function remove(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }

        removeFromLS(e.target.parentElement.parentElement);
    }
}

function removeFromLS(taskItem){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){

        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(){

    if(confirm('Are you sure?')){
        
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }

        localStorage.clear();
    }
}

function filterTask(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){

        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){

            task.style.display = 'block';
        }
        else{

            task.style.display = 'none';
        }
    });
}

function background(e){

    document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 155)`;
}