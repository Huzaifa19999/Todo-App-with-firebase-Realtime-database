import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { set, ref, push, getDatabase, onValue , remove , update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5wxSRlotWSx5tD328AuqpUCurrXoYrwU",
  authDomain: "todoapp-9c3b9.firebaseapp.com",
  databaseURL: "https://todoapp-9c3b9-default-rtdb.firebaseio.com",
  projectId: "todoapp-9c3b9",
  storageBucket: "todoapp-9c3b9.appspot.com",
  messagingSenderId: "759488151700",
  appId: "1:759488151700:web:47426ee6e8c739a3487481"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(database);
console.log(app);
window.Addbtn = function () {
  let input = document.getElementById('todoInput').value;
  let inputobj = {
    input: input
  }
  document.getElementById('todoInput').value = "";
  let refn = push(ref(database, "Todo List"));
  let iteamkey = refn.key;
  set(ref(database, `Todo List/${iteamkey}`), inputobj)
    .then(function () {
      alert('Data Successfully');
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
} 
let di = document.getElementById("todoList");
if (di.textContent.trim() === "") {
  // di.style.display = "none";
  
}


window.getdata = function () {
  let todoref = ref(database, "Todo List");

  onValue(todoref, (dataall) => {
    let data = dataall.val();
    let displayElement = document.getElementById("todoList");

    displayElement.innerHTML = " ";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let item = data[key];
        
        // div create 
        let div = document.createElement("div");
        div.setAttribute("class", "paradiv p-3 pb-0 mt-3 m-2");
        
        displayElement.appendChild(div);
        let p = document.createElement("li");
        p.setAttribute('class' , 'fs-5 fw-bold')
        p.textContent = item.input;

        div.appendChild(p);
        
        // Delete Btn Strat
        let delbtn = document.createElement("button");
        let delbtntext = document.createTextNode('Delete')
        delbtn.appendChild(delbtntext);
        delbtn.setAttribute('class','btn btn-danger ps-4 pe-4 ms-5');
        p.appendChild(delbtn);
        delbtn.addEventListener('click', function () {
          // Remove the item from the database
          remove(ref(database, `Todo List/${key}`))
          .then(function (){
          div.remove();
          alert('Data deleted successfully')
        })
        .catch(function (err) {
          alert('Data Delete failed: ' + err.message)
        });
      }); 

      // Edit btn Start
      let editbtn = document.createElement('button');
      let editbtntext = document.createTextNode('Edit');
      editbtn.appendChild(editbtntext);
      editbtn.setAttribute('class' , 'btn btn-danger ps-4 pe-4 ms-1');
      editbtn.addEventListener('click' , function (){
        let promp = prompt('Enter Update Value');
      if(promp !== null && promp !== item.value){
      // update(ref(database, `Todo List/${key}`), { input: promptValue })
      // update(ref(database, `Todo list/${ey}`), { input: promp })
      update(ref(database, `Todo List/${key}`), { input: promp })
      .then(function(){
       p.textContent = promp;
       alert('Updated successfully');
      })
      .catch(function(err){
        alert('Updated failed: ' + err);
      })
      }
    });
    p.appendChild(editbtn);

      }
      
    }
    
  })
}
getdata();

window.deleteAll = function () {
   let refdel = ref(database , 'Todo List');
   remove(refdel)
   .then(function () {
    alert('All Data deleted successfully');
   })
   .catch(function (err) {
      alert('All Data deleted failed ' , err);
   })
}



