// Courtesy of MDB Documentation
// https://mdbootstrap.com/snippets/standard/mdbootstrap/2964350#js-tab-view
//Get the button
"use strict";

(() => {
  let userAddress = null;
  let connect = document.querySelector("#walletConnect");
  let mybutton = document.getElementById("btn-back-to-top");

  connectWallet();

  connect.addEventListener("click", async () => {
    connectWallet();
  });
  async function connectWallet() {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((data) => {
        userAddress = data[0];
        console.log(userAddress);

        let walletString =
          userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
        connect.innerHTML = walletString;
        return userAddress;
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log("Please connect a wallet to continue");
        } else {
          console.error(error);
        }
      });
  }

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
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
})();
