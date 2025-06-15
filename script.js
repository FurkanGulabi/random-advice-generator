"use strict";

const API_URL = "https://api.adviceslip.com/advice";

// DOM elements
const adviceButton = document.getElementById("adviceButton");
const adviceText = document.getElementById("adviceText");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

const showLoader = () => {
  loader.classList.add("show");
  adviceButton.disabled = true;
};

const hideLoader = () => {
  loader.classList.remove("show");
  // Don't re-enable button here - let displayAdvice handle it
};

const showError = (message) => {
  errorDiv.textContent = message;
  errorDiv.classList.add("show");
  setTimeout(() => {
    errorDiv.classList.remove("show");
  }, 5000);
};

const hideError = () => {
  errorDiv.classList.remove("show");
};

const getDataFromApi = async () => {
  try {
    showLoader();
    hideError();

    // added timestamp because api is caching
    const response = await fetch(`${API_URL}?timestamp=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.slip && data.slip.advice) {
      displayAdvice(data.slip.advice);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching advice:", error);
    showError("Failed to fetch advice. Please try again.");
    adviceText.textContent = "Click the button to get some advice!";
  } finally {
    hideLoader();
  }
};

const displayAdvice = (advice) => {
  adviceText.textContent = "";
  let i = 0;
  // Button is already disabled by showLoader, keep it disabled for typing

  const typeWriter = () => {
    if (i < advice.length) {
      adviceText.textContent += advice.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    } else {
      // Re-enable button after typing is finished
      adviceButton.disabled = false;
    }
  };
  typeWriter();
};

const handleButtonClick = async () => {
  await getDataFromApi();
};

// Event listeners
adviceButton.addEventListener("click", handleButtonClick);

// Keyboard accessibility
adviceButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleButtonClick();
  }
});

// Optional: Load initial advice on page load
const main = async () => {
  console.log("Random Advice Generator initialized");

  // Uncomment the line below if you want to load advice automatically on page load
  // await getDataFromApi();
};

// Initialize the app
document.addEventListener("DOMContentLoaded", main);

// Handle online/offline status
window.addEventListener("online", () => {
  hideError();
});

window.addEventListener("offline", () => {
  showError("You are offline. Please check your internet connection.");
});
