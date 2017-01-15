// ==UserScript==
// @name        Twitch Highlight Mentions
// @Author      /u/Signe_
// @namespace   *.twitch.tv/*
// @include       https://*.twitch.tv/*
// @version     1
// @grant       none
// ==/UserScript==

//Starts the loop
var Timer = setInterval(Loop, 1000);
//How many iteractions the loop as gone through (resets every 60 seconds)
var Counter = 0;
//Dictionary containing peoples name and there color
var Dictionary = [];
//The main loop for the script
function Loop() {
  if (hasChatPanel) {
    var From = document.getElementsByClassName('from'); //Gets the full chat message
    for (var i = 0; i < From.length; i++) {
      //No reason to grab the jtv bots color
      if (From[i].innerText != 'jtv') {
        //Adds that persons name and style color to the dictionary
        AddToDict('@' + From[i].innerText.toLowerCase(), From[i].getAttribute('style'));
      }
    }
    var UserMention = document.getElementsByClassName('user-mention'); //Grabs all the user mentions
    for (var j = 0; j < UserMention.length; j++) {
      //Sets the color of the mention to be that persons color in chat
      UserMention[j].setAttribute('style', ReturnFromDict(UserMention[j].innerText.toLowerCase()));
    }
  } 
  else {
    if(Counter > 8){
      Counter = 0;
      clearInterval(Timer); //If 8 seconds pass clear the timer. no reason to run longer than that
    }
  }
  Counter++;
  if (Counter > 60) {
    // clear Counter and Dictionary after 60 seconds
    Counter = 0;
    Dictionary = [
    ];
  }
}
function ReturnFromDict(key) {
  //Returns a value based on the key if it doesn't exist return nothing
  if (DictContains(key)) {
    return Dictionary[key];
  } else {
    return '';
  }
}
function AddToDict(Key, Value) {
  //Adds a key value pair to the dictionary
  if (!DictContains(Key))
  Dictionary[Key] = Value;
}
function DictContains(Key) {
  //Checks if the Dictionary conains a key
  if (Dictionary[Key] == undefined) {
    return false;
  } 
  else {
    return true;
  }
}
function hasChatPanel() {
  //Checks if the current page has a chat panel
  if(document.getElementsByClassName('chat-room').length > 0){
    return true;
  }else{
    return false;
  }
}
