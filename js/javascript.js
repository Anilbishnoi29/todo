var items = JSON.parse(localStorage.getItem('todo-list')) || [];

// random color
randomColor()

function randomColor() {
    color = "#";
    letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E];
    for (var i = 0; i < letters.length; i++) {
        let x = letters.Math.floor(Math.random() * 16);
        colors = color + x;
    }
    console.log(colors)
}


function addItem() {
    // get the value of the input box with querySelector
    var inputBox = document.querySelector('#todo-input');
    var item = inputBox.value

    // If input box is empty, return and alert the user
    // You can also do some more validation if here if you want
    if (item === "") {
        return alert("You need to put in a number");
    }


    // If input is valid, add item to items array
    items.push({
        value: item,
        time: (new Date()).toLocaleDateString("en-US")
    })

    // then convert to a string with JSON.stringify and save to localStorage
    localStorage.setItem('todo-list', JSON.stringify(items));

    // call function to list all items
    listItems();

    // clear input box
    inputBox.value = "";
}

// function to remove item from array with Array.splice()
// removes item, then saves new items array to localStorage
function deleteItem(index) {
    items.splice(index, 1);
    localStorage.setItem('todo-list', JSON.stringify(items))
    listItems();
}

function markAsDone(index) {
    items[index].done = !items[index].done;
    localStorage.setItem('todo-list', JSON.stringify(items));
    listItems();
}


// function that generates list of items and populates the html
function listItems() {
    var list = "";
    for (var i = 0; i < items.length; i++) {
        list += "<li class=" + (items[i].done ? "done" : "") + ">";


        list += items[i].value + " ";
        list += "<small title='click me to mark as done' class='label' onclick='markAsDone(" + i + ")'>" + items[i].time + "</small> ";
        list += "<span class='label alert' onclick='deleteItem(" + i + ")'>delete</span></li>";

    }
    document.querySelector("#list-items").innerHTML = list;
}

// function to run when page loads
(function() {
    listItems();
})();