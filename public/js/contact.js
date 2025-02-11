// import { Input, Ripple, initMDB } from "mdb-ui-kit";
// initMDB({ Input, Ripple });
// with this commented out; all the validation works, no tooltips ; decide which way to go
(function () {
  "use strict";  
  let form = document.querySelector("#contactForm");
//   let formValid = false;
//   const alertTrigger = document.getElementById("contactFormBtn");

//   const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
//   const alert = (message, type) => {
//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = [
//       `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//       `   <div>${message}</div>`,
//       '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//       "</div>",
//     ].join("");
//     console.log(type);
// // TODO LOOK AT THE TIME ON THE EMAIL AND LINK IT WITH THE HISTORY HERE TO SEE WHICH CODE WAS WORKING?! WHEN REVERTED TO THE WORKING CODE THAT WAS PUSHED. IT NO LONGER WORKED. THINKING THAT IT MAY BE AND ISSUE WITH THE INTERNET.
//     alertPlaceholder.append(wrapper);
//   };

  document
    .querySelector("#contactFormBtn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      let formValid = true;
      if (!form.checkValidity()) {
        formValid = false;
      }
      // if (form.checkValidity()) {
      //   formValid = true;
      // }
      form.classList.add("was-validated");
      if (formValid) {
        sendEmail();
      }
      // showAlert();
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

  function showAlert() {
    alertTrigger.addEventListener("click", () => {
      if (formValid && alertTrigger) {
        alert("Thanks for your message! We'll be in touch soon.", "success");
      } else {
        alert("Please fill out all required fields.", "danger");
      }
      setTimeout(() => {
        alert.reset();
      }, 5000);
    });
  }
})();
