import { Input, Ripple, initMDB } from "mdb-ui-kit";

initMDB({ Input, Ripple });
(function () {
  "use strict";
  document
    .querySelector("#contactFormBtn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("Thanks for clicking");
      let firstName = document.querySelector("#firstnameInput").value;
      let lastName = document.querySelector("#lastnameInput").value;
      let email = document.querySelector("#emailInput").value;
      let message = document.querySelector("#messageInput").value;
      console.log("name" + firstName);
      console.log("name" + lastName);
      console.log("email" + email);
      console.log("message" + message);
    });

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
})();
