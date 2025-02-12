document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const form = document.querySelector("#contactForm");
  const contactFormBtn = document.querySelector("#contactFormBtn");
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const showAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);

    setTimeout(() => {
      wrapper.remove();
    }, 5000);
  };

  const validateForm = () => {
    const formValid = form.checkValidity();
    form.classList.add("was-validated");
    return formValid;
  };

  const sendEmail = () => {
    const obj = {
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
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  contactFormBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    contactFormBtn.disabled = false;
    if (validateForm()) {
      sendEmail();
      showAlert("Thanks for your message! We'll be in touch soon.", "success");
      contactFormBtn.disabled = true;
    } else {
      showAlert("Please fill out the form correctly before submitting.", "danger");
    }
  });
});
