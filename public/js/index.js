// TODO clean up this file once all buttons have been added
// import { Input, Ripple, initMDB } from "mdb-ui-kit";

// initMDB({ Input, Ripple });
// ("use strict");

// (() => {
//     document.querySelector('#testButton').addEventListener('click', handleClick);

//     function handleClick(){
//         console.log('Thanks for clicking');
//     }
// })();

// Courtesy of MDB Documentation
// https://mdbootstrap.com/snippets/standard/mdbootstrap/2964350#js-tab-view
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
