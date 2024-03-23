const firebaseConfig = {
    apiKey: "AIzaSyC5wxSRlotWSx5tD328AuqpUCurrXoYrwU",
    authDomain: "todoapp-9c3b9.firebaseapp.com",
    databaseURL: "https://todoapp-9c3b9-default-rtdb.firebaseio.com",
    projectId: "todoapp-9c3b9",
    storageBucket: "todoapp-9c3b9.appspot.com",
    messagingSenderId: "759488151700",
    appId: "1:759488151700:web:47426ee6e8c739a3487481"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();


  function addTodo() {
    var inputTodo = document.getElementById("inputTodo");
    var todoText = inputTodo.value.trim(); 
    if (todoText !== "") {
        var liElement = document.createElement("li");
        var liText = document.createTextNode(todoText);
        liElement.appendChild(liText);

        var delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function() {
            liElement.remove();
            database.ref('todos/' + liText).remove();
        });
        liElement.appendChild(delBtn);

        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit"; 
        editBtn.addEventListener("click", function() {
            console.log("Edit button clicked");
        });
        liElement.appendChild(editBtn);

        var list = document.getElementById("todoList");
        list.appendChild(liElement);

        database.ref('todos/' + todoText).set({
            text: todoText
        });

        inputTodo.value = "";
    } else {
        alert("Please enter a todo.");
    }
}

function renderTodos() {
    var list = document.getElementById("todoList");

    list.innerHTML = "";

    database.ref('todos').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var todoKey = childSnapshot.key;
            var todoData = childSnapshot.val();
            var todoText = todoData.text;

            var liElement = document.createElement("li");
            var liText = document.createTextNode(todoText);
            liElement.appendChild(liText);

            var delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", function() {
                liElement.remove();
                database.ref('todos/' + todoKey).remove();
            });
            liElement.appendChild(delBtn);

            var editBtn = document.createElement("button");
            editBtn.textContent = "Edit"; 
            editBtn.addEventListener("click", function() {
                console.log("Edit button clicked");
            });
            liElement.appendChild(editBtn);

            list.appendChild(liElement);
        });
    });
}

renderTodos();








function deleteAllTodo() {
    var list = document.getElementById("todoList");
    list.innerHTML = "";

    database.ref('todos').remove();
}




