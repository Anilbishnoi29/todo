const submitTask = document.querySelector("#submit");
const userInput = document.querySelector("#userInput");
const todoList = document.querySelector(".todoList");
const taskCounts = document.querySelector(".taskCount");
const clearTask = document.querySelector("#clearTask");

// creat new array or if persent in local storage the get
let todayTask = JSON.parse(localStorage.getItem("todayTask")) || [];
let complatedTask = JSON.parse(localStorage.getItem("todayComplatedTask")) || [];
// console.log(todayTask)

// creat delete btn
function creatDeleteBtn(i) {
    return (` <a class="d-flex deleteBtn" onclick='deleteItem(${i})'>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66663 5.55554H0.814819V7.12168H2.66663V22H19.3333V7.12168H21.1852V5.55554H19.3333H2.66663Z" fill="#ff5668" fill-opacity="0.7"/>
        <path id="trashTop"  fill-rule="evenodd" clip-rule="evenodd" d="M12.8518 0H9.14808V1.85185H3.59253V3.7037H18.4073V1.85185H12.8518V0Z" fill="#ff5668"/>
        </svg>
    </a>`)
}

// creat chekmark btn
function creatcheckMark(i) {
    // return (`<a class="d-flex checkedBtn" onclick='markAsDone(${i})'><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <circle id="checkMarkouter" cx="12" cy="12" r="10.5" stroke="#00D48F" stroke-width="2"/>
    // <circle id="checkMark"  cx="12" cy="12" r="5" fill="none"/>
    // </svg>            
    // </a>`)

    return (`<a class="d-flex checkedBtn" onclick='markAsDone(${i})'> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10.5" stroke="#00d48f" stroke-width="3"/>
    <path  id="checkMark" d="M7 10L9.5 14.3301L18.1603 9.33013" stroke="transparent" stroke-width="2"/>
    </svg></a>
    `)
}

// task count
function taskCount() {
    let taskNumber = todayTask.length;
    taskCounts.innerHTML = taskNumber;
}

// submit button
// userInput.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         submitTask.click();
//     }
// })

submitTask.addEventListener("click", function() {

    let taskName = userInput.value.trim();

    if (taskName === "") {

        alert("please add a task")

    } else {

        todayTask.push({

            Task_Name: taskName,

            Date: (new Date()).toLocaleDateString("en-US")
        })

        localStorage.setItem("todayTask", JSON.stringify(todayTask));

        creatList();
        taskCount();
        userInput.value = ""

    }
})

// check mark
function markAsDone(index) {
    // console.log("hiii")
    todayTask[index].done = !todayTask[index].done;
    localStorage.setItem('todayTask', JSON.stringify(todayTask));
    creatList();

}


// count complated tasks



// delete task
function deleteItem(index) {

    var massageConfirm = confirm("Have you completed the task ? ")

    if (massageConfirm) {
        todayTask.splice(index, 1);
        localStorage.setItem("todayTask", JSON.stringify(todayTask));
        creatList();
        taskCount();
    }


}
clearTask.addEventListener("click", function(index) {

        var massageConfirm = confirm("Have you completed all task ? ")

        if (massageConfirm) {

            todayTask.splice(index);
            localStorage.setItem("todayTask", JSON.stringify(todayTask));
            creatList();
            taskCount();
        }
    })
    // creat task list

function creatList() {
    var list = "";
    for (var i = 0; i < todayTask.length; i++) {
        list += "<li class=" + (todayTask[i].done ? "done" : "") + ">";
        list += "<div>"
        list += creatcheckMark(i);
        list += `<p>` + todayTask[i].Task_Name + " " + `</p>`;
        list += "</div>"
        list += `<div class="flexEnd">`
        list += "<small title='click me to mark as done' class='label'>" + todayTask[i].Date + "</small> ";
        list += creatDeleteBtn(i);
        list += "</div>"
        list += "</li>"
    }
    todoList.innerHTML = list;
}

(function() {
    creatList();
    taskCount();
})();
