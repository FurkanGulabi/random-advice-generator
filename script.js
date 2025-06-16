"use strict";

const API_URL = "https://api.adviceslip.com/advice";

const AdviceButton = document.getElementById("advice-button");
const AdviceText = document.querySelector(".advice-text");

const getAdviceFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network Error!");
    }
    const data = await response.json();
    return data.slip.advice;
  } catch (error) {
    alert("Something went wrong!");
    window.location.reload();
  }
}



AdviceButton.addEventListener("click", async () => {
  AdviceButton.disabled = true;
  AdviceText.textContent = "";
  const advice = await getAdviceFromAPI();

  const typeWriter = () => {
    return new Promise((resolve) => {
      let i = 0;
      const text = advice;
      const speed = 50;

      function type() {
        if (i < text.length) {
          AdviceText.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  await typeWriter();
  AdviceButton.disabled = false;

});

