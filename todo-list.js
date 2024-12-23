import { Todo } from "./todo-class.js";

const todoList = [];

function renderTodoList(){
  let todoListHTML = ``;

  todoList.forEach((todoObject, index) => {
    const { name } = todoObject;
    const { dueDate } = todoObject;
    const { category } = todoObject;
    const html = `
      <div class='todo-item'>${name}</div>
      <div class='todo-item'>${category}</div>
      <div class='todo-item'>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;

    todoListHTML += html;
  })
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((button, index) => {
    button.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });

  document.querySelectorAll('.js-delte-todo-button', )
  .forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    })
  })
}


document.querySelector('.js-add-todo-button')
.addEventListener('click', () => {
  addTodo();
})

const sortButton = document.querySelector('.js-sort-button');
sortButton.addEventListener('click', () => {
  console.log(todoList)
  const criteria = document.querySelector('#sort-criteria').value;
  sortTodoList(criteria);
  console.log(todoList)
});


function addTodo(){
  const inputElement = document.querySelector('.js-name-input')
  const name = inputElement.value 
  const categoryInputElement = document.querySelector('.js-task-category')
  const category = categoryInputElement.value
  const dueInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dueInputElement.value;


  if (name === "" ){
    alert("You cannot add a task without a name.");
    return;
  } else if (category === ""){
    alert("You cannot add a task without a category.")
    return;
  } else if (dueDate === "") {
    alert("You cannot add a task without a due date.");
    return;
  } 
  

  inputElement.value = '';
  categoryInputElement.value = '';
  dueInputElement.value = '';
  todoList.push(new Todo(name,category, dueDate));

  //Display the tasks, after adding another one
  renderTodoList();
  showAddButtonAnimation();
}


function sortTodoList(criteria) {
  const categoryOrder = {"school" : 1,
    "work": 2,
    "household": 3,
    "other": 4
  };

  todoList.sort((a, b) => {
    if (criteria === 'name') {
      console.log('asdasd')
      return a.name.localeCompare(b.name);
    } else if (criteria === 'category') {
      console.log('category')
      return categoryOrder[a.category] - categoryOrder[b.category];
    } else if (criteria === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
  });

  renderTodoList();
}




const addButtonAnimation = lottie.loadAnimation({
  container: document.getElementById('add-button-animation'), 
  renderer: 'svg', 
  loop: false, 
  autoplay: false,
  path: 'add-button-animation.json' 
});

let animationTimeout;


function showAddButtonAnimation() {
  const animationContainer = document.getElementById('add-button-animation');

  addButtonAnimation.stop()
  addButtonAnimation.goToAndStop(0, true);
  addButtonAnimation.setDirection(1);
  

  animationContainer.style.display = 'block';
  animationContainer.classList.remove('hidden'); 


  addButtonAnimation.play();
  const totalFrames = addButtonAnimation.totalFrames;

  const animationDuration = (totalFrames/30)*1000; 
  
  clearTimeout(animationTimeout);
  animationTimeout = setTimeout(() => {

      
      const startFrame = Math.floor(totalFrames/3);
      addButtonAnimation.goToAndStop(startFrame, true);
      // Play animation in reverse
      addButtonAnimation.setDirection(-1);
      addButtonAnimation.play();

      // Hide the animation container after a short delay
      setTimeout(() => {
          animationContainer.classList.add('hidden'); // Add hidden class to slide down
          animationContainer.style.display = 'none'; // Optionally hide the container
      }, (totalFrames/3/30)*1000); // Adjust delay to match the reverse animation duration
  }, animationDuration); // Duration for the main animation
}



const backgroundAnimation = lottie.loadAnimation({
  container: document.getElementById('background-animation'),
  renderer: 'svg',
  loop: true,
  autplay: true,
  path: 'background-animation.json',
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice' // Adjust to scale correctly
}
});
