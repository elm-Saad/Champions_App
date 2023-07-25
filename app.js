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
        clearInputsFieldEl();
    }
});

//get the DB info 
onValue(listOfMessagesDb, function(snapshot){
    if (snapshot.exists()) {
        let messagesArray = Object.entries(snapshot.val());
        console.log(messagesArray);
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
    let ItemValueTo = result[1].To;
    let ItemValueFrom = result[1].from;
    let ItemValueMain = result[1].mainMessage;

    let finalMessage =`To: <b>${ItemValueTo}</b><br> 
                            ${ItemValueMain}<br> 
                    From: <b>${ItemValueFrom} </b> .`;

    let newEl = document.createElement("li");

    newEl.innerHTML =  finalMessage;

    displayField.append(newEl);
    let j = displayField.childNodes.length;
    console.log(j);
    while (j--)
        displayField.appendChild(displayField.childNodes[j]);
}

function messagesListClear(){
    displayField.innerHTML = "";
}
function clearInputsFieldEl() {
    textInputEl.value = "";
    toUser.value = "";
    fromUser.value = "";
}