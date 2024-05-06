let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea =  document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    // console.log("butn clicked");
    formValidation();
    
});

let formValidation= () => {
    if(textInput.value === "") {
        msg.innerHTML="Post cannot be blank!"
        console.log("failure");
    }else{
        console.log("successs");
        msg.innerHTML=""
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
    }
}

let data =[];

let acceptData=() => {
    data.push({
        text: textInput.value,
        date:dateInput.value,
        description:textarea.value,  
    })
    localStorage.setItem("data", JSON.stringify(data));
    // localStorage.getItem
    console.log(data);
    createTasks();
};

let createTasks=() =>{
    tasks.innerHTML ="";

    data.map((x,y)=>{
        return     (tasks.innerHTML += `
        <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p> 
    
        <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
    </div> 
    `);
    })

resetForm();
}

let deleteTask=(e)=>{
    e.parentElement.parentElement.remove();
    data.splice( e.parentElement.parentElement.id, 1)
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

}

let editTask= (e)=>{
    let selectTask = e.parentElement.parentElement;

    textInput.value = selectTask.children[0].innerHTML;
    dateInput.value = selectTask.children[1].innerHTML;
    textarea.value =  selectTask.children[2].innerHTML;

    deleteTask.remove();

}

let resetForm = ()=>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

(()=>{
    data =JSON.parse(localStorage.getItem("data"))  || [];
    createTasks();
    console.log(data);
})()