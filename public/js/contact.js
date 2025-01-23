// import { Input, Ripple, initMDB } from "mdb-ui-kit";

// initMDB({ Input, Ripple });
(function () {
    "use strict";
    document.querySelector('#contactFormBtn').addEventListener('click', submitMail);

    function submitMail(){
        console.log('Thanks for clicking');
        let name = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let message = document.querySelector('#message').value;
        console.log('name' + name);
        console.log('email' + email);
        console.log('message' + message);
    }
})();