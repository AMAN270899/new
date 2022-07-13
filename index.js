let form = document.getElementById("add");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let msg = document.getElementById("msg");
let textarea = document.getElementById("textarea");
let add = document.getElementById("add");
let tasks = document.getElementById("tasks");

let data= [];
console.log(form)
form.addEventListener("click", (e)=> {
    console.log("first")
    formValidation();
});

 //get the data and show on screen
 let showTasks = () =>{
    tasks.innerHTML = ' ';
    data.map((item, index) => {
        return(tasks.innerHTML += `
        <div id= ${index}>
        <span class="fw-bold">${item.text}</span>
    <span class="small text-secondary">${item.date}</span>
    <p>${item.description}</p>

    <span>
      <i class="bi bi-pencil-square" 
      onclick="editTask(this)"
      data-bs-toggle="modal" 
      data-bs-target="#form"
      ></i>

      <!-- delete -->
      <i class="bi bi-trash"></i>
    </span>
    
  </div>
  `);
    });

    resetForm();

};

let resetForm = () =>{
    textInput.value = "";
    dateInput.value ="";
    textarea.value = "";
}


let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description :textarea.value,
    });

    localStorage.setItem("tasks", JSON.stringify(data));
    (() => {
        data = JSON.parse(localStorage.getItem("tasks"));
        showTasks();
    })
    

    
};

let formValidation = () => {
    console.log("adcccc");
    if(textInput.value === ""){
        console.log("failure");
        msg.innerHTML = '*task cannot be blank';
    } else{
        console.log(textInput.value);
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal" );
        add.click();

        //IIFE - IMMEDIATELY INVOKED FUNCTION EXPRESSION

        (() => {
            add.setAttribute("data-bs-dismiss","" );
        })();
        
    };
    
   

   
};

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("tasks", JSON.stringify(data));
    console.log(('data array after deletion', data));
}