const toggleBtn = document.getElementById("chat-toggle-btn");
const closeBtn = document.getElementById("chat-close-btn");
const chatWidget = document.getElementById("chat-widget");
const chatForm = document.getElementById("chat-input-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chips = document.querySelectorAll(".chip");

// Toggle visibility
toggleBtn.addEventListener("click", () => chatWidget.classList.toggle("chat-hidden"));
closeBtn.addEventListener("click", () => chatWidget.classList.add("chat-hidden"));

// Append message helper
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple rule-based bot reply
function processReply(input) {
  const query = input.toLowerCase();

  if (query.includes("0") || query.includes("1") || query.includes("2") || query.includes("toddler")) {
    return "For toddlers (0-2 yrs), we recommend the Soft Teddy Bear (₹449) and Wooden Building Blocks (₹599)!";
  }
  if (query.includes("3") || query.includes("4")) {
    return "For ages 3-4, check out the Toy Train Set (₹1,299) or Story Book Set (₹649)!";
  }
  if (query.includes("5") || query.includes("6") || query.includes("art") || query.includes("craft")) {
    return "For creative kids (5+), the Art and Craft Kit (₹899) and Birthday Gift Box (₹799) are great choices!";
  }
  if (query.includes("under") || query.includes("budget") || query.includes("cheap") || query.includes("700")) {
    return "Budget-friendly picks under ₹700: Teddy Bear (₹449), Building Blocks (₹599), and Story Books (₹649)!";
  }
  return "We have blocks, teddy bears, train sets, books, and art kits! Tell me the child's age or your budget.";
}

// Handle submit
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

// Handle chips
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const query = chip.getAttribute("data-query");
    addMessage(query, "user");
    setTimeout(() => {
      addMessage(processReply(query), "bot");
    }, 400);
  });
});