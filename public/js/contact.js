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
      }
      form.classList.add("was-validated");
      if (formValid) {
        sendEmail();
      }
    });

  function sendEmail() {
    let obj = {
      subject: "NFT Contact Form Submission",
      text: `${document.querySelector("#firstName").value} ${
        document.querySelector("#lastName").value
      } sent you the following message:
      ${document.querySelector("#message").value}.
      Their email is: ${document.querySelector("#email").value}`,
    };

    fetch("/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((response) => {
        document.querySelector("#contactFormBtn").innerHTML = response.result;
      })
      .then(() => {
        setTimeout(() => {
          document.querySelector("#contactFormBtn").innerHTML = "";
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
})();
