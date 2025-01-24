import { Input, Ripple, initMDB } from "mdb-ui-kit";
initMDB({ Input, Ripple });
(function () {
  "use strict";

  let form = document.querySelector("#contactForm");

  document
    .querySelector("#contactFormBtn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      let formValid = true;
      if (!form.checkValidity()) {
        formValid = false;
        console.log("form not valid");
      }
      form.classList.add("was-validated");
      if (formValid) {
        sendEmail();
      }
    });

  function sendEmail() {
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let message = document.querySelector("#message").value;
    console.log("name" + firstName);
    console.log("name" + lastName);
    console.log("email" + email);
    console.log("message" + message);
  }
})();
