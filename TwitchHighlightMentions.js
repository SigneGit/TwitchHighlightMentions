// ==UserScript==
// @name        Twitch Highlight Mentions
// @Author      /u/Signe_
// @namespace   *.twitch.tv/*
// @include       https://*.twitch.tv/*
// @version     1
// @grant       none
// ==/UserScript==

var Timer = setInterval(Loop, 1000);
var Counter = 0;
var Dictionary = [
];
function Loop() {
  if (hasChatPanel) {
    var From = document.getElementsByClassName('from');
    for (var i = 0; i < From.length; i++) {
      if (From[i].innerText != 'jtv') {
        AddToDict('@' + From[i].innerText.toLowerCase(), From[i].getAttribute('style'));
      }
    }
    var UserMention = document.getElementsByClassName('user-mention');
    for (var j = 0; j < UserMention.length; j++) {
      UserMention[j].setAttribute('style', ReturnFromDict(UserMention[j].innerText.toLowerCase()));
    }
  } 
  else {
    if(Counter > 8){
      Counter = 0;
      clearInterval(Timer);
    }
  }
  Counter++;
  if (Counter > 60) {
    Counter = 0;
    Dictionary = [
    ];
  }
}
function ReturnFromDict(key) {
  if (DictContains(key)) {
    return Dictionary[key];
  } else {
    return '';
  }
}
function AddToDict(Key, Value) {
  console.log(Key + ' ' + Value);
  if (!DictContains(Key))
  Dictionary[Key] = Value;
}
function DictContains(Key) {
  if (Dictionary[Key] == undefined) {
    return false;
  } 
  else {
    return true;
  }
}
function hasChatPanel() {
  if(document.getElementsByClassName('chat-room').length > 0){
    return true;
  }else{
    return false;
  }
}
