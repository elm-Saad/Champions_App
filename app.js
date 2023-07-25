
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase,ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const Setting = {
    databaseLink: "https://championsdb-13555-default-rtdb.europe-west1.firebasedatabase.app/"
}

const initialized = initializeApp(Setting);
const Db = getDatabase(initialized);
const listOfMessagesDb = ref(Db, "messagesList")


const textInputEl = document.getElementById('input-text-field');
//const toUser = document.getElementById('input-text-field');
//const fromUser = document.getElementById('input-text-field');
const publishBtn = document.getElementById('publish-btn');
const displayField = document.getElementById('display-inputs');


// push into the DB 
publishBtn.addEventListener('click', function(){
    let userInputValue = textInputEl.value;
    //let toUserValue = toUser.value;
    //let fromUserValue = fromUser.value;

    if(userInputValue /*&& toUserValue && fromUserValue*/) {
        //let GlobaleMessage = `${toUserValue} , 
          //                      ${userInputValue} 
            //                ${fromUserValue} `;
        push(listOfMessagesDb,userInputValue);

        clearInputFieldEl();
    }
    else{
        alert('you should field all the inputs in order to share your message to the world');
    }
});

//get the DB info 
onValue(listOfMessagesDb, function(snapshot){

    let messagesArray = Object.entries(snapshot.val());

    messagesListClear();

    for(let i=0; i<messagesArray.length ; i++){
        let currentItem = messagesArray[i];

        displayItemsIntoDisplayField(currentItem);
    }
})
function displayItemsIntoDisplayField(result){

    let ItemID = result[0];
    let ItemValue = result[1];

    let newEl = document.createElement("li");

    newEl.textContent = ItemValue;

    displayField.append(newEl);
}

function messagesListClear(){
    displayField.innerHTML = "";
}
function clearInputFieldEl() {
    textInputEl.value = "";
}