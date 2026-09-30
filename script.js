const toggleBtn = document.getElementById("chat-toggle-btn");
const closeBtn = document.getElementById("chat-close-btn");
const chatWidget = document.getElementById("chat-widget");
const chatForm = document.getElementById("chat-input-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chips = document.querySelectorAll(".chip");
const cartBtn = document.querySelector(".cart-btn");
const buyBtns = document.querySelectorAll(".btn-buy");

// Shopping Cart Increment Demo
let cartCount = 0;
buyBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cartCount++;
    cartBtn.textContent = `🛒 Cart (${cartCount})`;
    btn.textContent = "Added ✓";
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.style.background = "";
    }, 1200);
  });
});

// Toggle Chat Widget
toggleBtn.addEventListener("click", () => chatWidget.classList.toggle("chat-hidden"));
closeBtn.addEventListener("click", () => chatWidget.classList.add("chat-hidden"));

// Append Chat Message
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Bot Reply Logic with Sweets & Age Recommendation
function processReply(input) {
  const query = input.toLowerCase();

  if (query.includes("chocolate") || query.includes("sweet") || query.includes("snack") || query.includes("cookie") || query.includes("gummy")) {
    return "Treats alert! 🍫 We have Animal Safari Milk Chocolates (₹349), Fruity Gummy Bears (₹279), and Choco-Chip Cookies (₹229)!";
  }
  if (query.includes("0") || query.includes("1") || query.includes("2") || query.includes("toddler") || query.includes("baby")) {
    return "For babies & toddlers (0-2 yrs), our top picks are the Plush Teddy Bear (₹449) and Montessori Shape Sorter (₹499)!";
  }
  if (query.includes("3") || query.includes("4") || query.includes("5")) {
    return "For ages 3-5, try the Express Train Set (₹1,299) or the Bedtime Story Collection (₹649)!";
  }
  if (query.includes("science") || query.includes("art") || query.includes("craft") || query.includes("6")) {
    return "For creative & curious kids (6+), checkout our Science Experiment Kit (₹999) or Art & Painting Hamper (₹899)!";
  }
  if (query.includes("under") || query.includes("budget") || query.includes("500")) {
    return "Under ₹500 budget picks: Choco-Chip Cookies (₹229), Fruity Gummies (₹279), Teddy Bear (₹449), and Shape Sorter (₹499)!";
  }
  return "I can help you find toys by age, birthday gifts, or sweet treats & chocolates! What are you looking for?";
}

// Form Submission
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage(processReply(text), "bot");
  }, 400);
});

// Quick Action Chips
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.getAttribute("data-query");
    addMessage(query, "user");
    setTimeout(() => {
      addMessage(processReply(query), "bot");
    }, 400);
  });
});