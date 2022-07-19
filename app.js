function $(elid) {
  /* shortcut for d.gEBI */
  return document.getElementById(elid);
}

var cursor; /* global variable */
window.onload = init;

function init() {
  cursor = $("cursor"); /* defining the global var */
  cursor.style.left = "0px"; /* setting it's position for future use */
}

function nl2br(txt) {
  /* helper, textarea return \n not <br /> */
  return txt.replace(/\n/g, "");
}

function writeit(from, e) {
  /* the magic starts here, this function requires the element from which the value is extracted and an event object */
  e = e || window.event; /* window.event fix for browser compatibility */
  var w = $("writer"); /* get the place to write */
  var tw = from.value; /* get the value of the textarea */
  w.innerHTML =
    nl2br(
      tw
    ); /* convert newlines to breaks and append the returned value to the content area */
}

function moveIt(count, e) {
  /* function to move the "fake caret" according to the keypress movement */
  e = e || window.event; /* window.event fix again */
  var keycode = e.keyCode || e.which; /* keycode fix */
  //        alert(count); /* for debugging purposes */
  if (keycode == 37 && parseInt(cursor.style.left) >= 0 - (count - 1) * 10) {
    // if the key pressed by the user is left and the position of the cursor is greater than or equal to 0 - the number of words in the textarea - 1 * 10 then ...
    cursor.style.left = parseInt(cursor.style.left) - 10 + "px"; // move the cursor to the left
  } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
    // otherwise, if the key pressed by the user if right then check if the position of the cursor + 10 is smaller than or equal to zero if it is then ...
    cursor.style.left = parseInt(cursor.style.left) + 10 + "px"; // move the "fake caret" to the right
  }
}

window.addEventListener("keypress", key);
var text = $("setter");
var writer = $("writer");

function key(e) {
  if (e.keyCode === 13) {
    counter = commands.length;
    commands.push(writer.innerHTML);
    nextLine(writer.innerHTML.toLowerCase());
    writer.innerHTML = "";
    text.value = "";
  }
}

function alert(txt) {
  // for debugging
  console.log(txt); // works only with firebug
}

//commands
var helps = [
  "about    <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;learn more about me</span>",
  "projects <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;check them out on <a href='https://www.github.com/bhmohit' target='_blank'>github</a></span>",
  "dark     <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change to dark mode</span>",
  "light    <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;change to light mode</span>",
  "[color]  <span class='help'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enter any color name(words, hex, or rgb) to change the text color</span>",
];

var banner = [
  "___  ___        _      _  _",
  "|  \\/  |       | |    (_)| |",
  "| .  . |  ___  | |__   _ | |",
  "| |\\/| | / _ \\ | '_ \\ | || __|",
  "| |  | || (_) || | | || || |",
  "\\_|  |_/ \\___/ |_| |_||_| \\__|",
];

//initial
setTimeout(function () {
  loopLines(banner, "", 80);
  text.focus();
}, 100);

var commands = [];

const before = $("before");

var counter = commands.length-1;

window.addEventListener("keyup", (e)=>{
  if(e.keyCode === 38 && counter >= 0){
    writer.textContent = commands[counter];
    counter-=1;
    console.log(commands[counter])
}else if(e.keyCode === 40 && counter != commands.length){
  
  console.log(commands[counter])
  writer.textContent = commands[counter];
  counter+=1;
}
})

function nextLine(input) {
  let newE = document.createElement("p");
  let newElement = document.createElement("p");
  newE.textContent = "guest@mohit.dev:~$ " + input;
  newE.className = "newE";
  before.append(newE);
  switch (input.trim().toLowerCase()) {
    case "about":
      newElement.textContent = "i am mohit";
      newElement.className = "resultText";
      before.append(newElement);
      break;

    case "help":
      let inde = 0;
      setTimeout(function () {
        helps.forEach(function (item, index) {
          inde = index;
          insert(item);
        });
      }, inde * 1000);

      break;

    case "banner":
      loopLines(banner, "", 80);
      break;

    case "light":
      var elements = document.getElementsByTagName("*");
      for (element of elements) {
        if (element.className === "cursor") {
          break;
        }
        element.style.color = "#252525";
        element.style.backgroundColor = "#D8D8D8";
      }
      break;

    case "dark":
      var elements = document.getElementsByTagName("*");
      for (element of elements) {
        if (element.className === "cursor") {
          break;
        }
        element.style.color = "#39ff14";
        element.style.backgroundColor = "#252525";
      }
      break;
    case "clear":
      location.reload();
      break;

    case "":
      break;

    default:
      document.querySelector(".body").style.color = input.replace(" ", "");
      break;
  }
}

function insert(help) {
  let element = document.createElement("p");
  element.innerHTML = help;
  element.className = "resultText";
  before.append(element);
  window.scrollTo(0, document.body.offsetHeight);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = "xx";

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}