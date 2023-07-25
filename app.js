import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const Setting = {
    databaseURL: "https://championsdb-13555-default-rtdb.europe-west1.firebasedatabase.app/"
}

const initialized = initializeApp(Setting);
const Db = getDatabase(initialized);
const listOfMessagesDb = ref(Db, "messagesList")


const textInputEl = document.getElementById('input-text-field');
const toUser = document.getElementById('input-el-to');
const fromUser = document.getElementById('input-el-from');
const publishBtn = document.getElementById('publish-btn');
const displayField = document.getElementById('display-inputs');


// push into the DB 
publishBtn.addEventListener('click', function(){
    let userInputValue = textInputEl.value;
    let toUserValue = toUser.value;
    let fromUserValue = fromUser.value;

    if(userInputValue && toUserValue && fromUserValue){
        let GlobaleMessage ={
            mainMessage:userInputValue,
            To:toUserValue,
            from:fromUserValue
        }
        push(listOfMessagesDb,GlobaleMessage);

        clearInputFieldEl();
    }
});

//get the DB info 
onValue(listOfMessagesDb, function(snapshot){
    if (snapshot.exists()) {
        let messagesArray = Object.entries(snapshot.val());

        messagesListClear();

        for(let i=0; i<messagesArray.length ; i++){
            let currentItem = messagesArray[i];

            displayItemsIntoDisplayField(currentItem);
        }
    }
    else {
        displayField.innerHTML = "No items here... yet ¯\_(ツ)_/¯ ";
    }
})
function displayItemsIntoDisplayField(result){

    let ItemID = result[0];
    let ItemValueTo = result[1].to;
    let ItemValueFrom = result[1].from;
    let ItemValueMain = result[1].mainMessage;

    let finalMessage = `To: ${<li>ItemValueTo</li>} , ${<br></br>}
                        ${ItemValueMain} 
                       from: ${ItemValueFrom}`;
    let newEl = document.createElement("li");

    newEl.textContent = finalMessage;

    displayField.append(newEl);
}

function messagesListClear(){
    displayField.innerHTML = "";
}
function clearInputFieldEl() {
    textInputEl.value = "";
}