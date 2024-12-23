$(document).ready(function(){
$('.slider').slick({
    arrows:false,
    dots:true,
    appendDots:'.slider-dots',
    dotsClass:'dots'
});


let hamberger = document.querySelector('.hamberger');
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');

hamberger.addEventListener('click', function(){
  mobileNav.classList.add('open');  
});

times.addEventListener('click', function(){
    mobileNav.classList.remove('open');  
});

});

document.querySelector("form").addEventListener("submit", function (e) {
  const name = document.querySelector("input[name='name']").value.trim();
  const email = document.querySelector("input[name='email']").value.trim();
  const message = document.querySelector("textarea[name='message']").value.trim();

  if (!name || !email || !message) {
      e.preventDefault();
      alert("Please fill in all required fields.");
  }
});

document.getElementById("contact-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  try {
      const response = await fetch("/send", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formObject),
      });

      const result = await response.json();

      if (result.success) {
          showDialog("Success", result.message, "success");
      } else {
          showDialog("Error", result.message, "error");
      }
  } catch (error) {
      showDialog("Error", "Something went wrong. Please try again later.", "error");
  }
});

function showDialog(title, message, type) {
  const dialogBox = document.createElement("div");
  dialogBox.style.position = "fixed";
  dialogBox.style.top = "50%";
  dialogBox.style.left = "50%";
  dialogBox.style.transform = "translate(-50%, -50%)";
  dialogBox.style.padding = "20px";
  dialogBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#f44336";
  dialogBox.style.color = "#fff";
  dialogBox.style.borderRadius = "8px";
  dialogBox.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.26)";
  dialogBox.style.zIndex = "1000";

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.style.marginBottom = "10px";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.backgroundColor = "#fff";
  closeButton.style.color = type === "success" ? "#4CAF50" : "#f44336";

  closeButton.addEventListener("click", () => {
      document.body.removeChild(dialogBox);
  });

  dialogBox.appendChild(titleElement);
  dialogBox.appendChild(messageElement);
  dialogBox.appendChild(closeButton);

  document.body.appendChild(dialogBox);
}

