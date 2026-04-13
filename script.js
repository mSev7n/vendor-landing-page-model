const products = [
  { id: 1, name: "Straight lace front", price: 45000, img: "👱‍♀️" },
  { id: 2, name: "Curly bob",            price: 38000, img: "👩‍🦱" },
  { id: 3, name: 'Body wave 18"',        price: 52000, img: "💁‍♀️" },
  { id: 4, name: "Kinky coily",          price: 35000, img: "👩‍🦳" },
  { id: 5, name: "Blonde highlight",     price: 60000, img: "🧖‍♀️" },
  { id: 6, name: "Sleek pixie",          price: 28000, img: "🙎‍♀️" },
];

// NOTE!!!!!!: when you have real photos, set img to the file path:
// for example img: "images/straight-lace.jpg"

const cart = {};

function fmt(n) {
  return "₦" + n.toLocaleString("en-NG");
}

function totalItems() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function totalPrice() {
  return Object.keys(cart).reduce((sum, id) => {
    const p = products.find(x => x.id == id);
    return sum + p.price * cart[id];
  }, 0);
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(p => {
    const qty   = cart[p.id] || 0;
    const isSel = qty > 0;
    return `
      <div class="product-card${isSel ? " selected" : ""}" id="card-${p.id}">
        <div class="product-img">
          <span style="font-size:40px">${p.img}</span>
          <div class="selected-tick"></div>
        </div>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-price">${fmt(p.price)}</div>
          <div class="qty-controls">
            <button class="qty-minus" onclick="setQty(${p.id}, (cart[${p.id}]||0) - 1)">−</button>
            <input
              class="qty-input"
              type="number"
              min="0"
              value="${qty}"
              id="inp-${p.id}"
              oninput="handleInput(${p.id}, this.value)"
            />
            <button class="qty-plus" onclick="setQty(${p.id}, (cart[${p.id}]||0) + 1)">+</button>
          </div>
          <button class="remove-btn" onclick="setQty(${p.id}, 0)">Remove all</button>
        </div>
      </div>`;
  }).join("");
}

// Called when the user types directly into the input box
function handleInput(id, val) {
  const n = parseInt(val, 10);
  if (!isNaN(n) && n >= 0) {
    setQty(id, n, false); // false = don't overwrite the input while typing
  }
}

// The central function — all changes go through here
function setQty(id, qty, rerender = true) {
  qty = Math.max(0, Math.round(qty));  // never go below 0

  if (qty === 0) {
    delete cart[id];   // remove from cart entirely
  } else {
    cart[id] = qty;    // store the quantity
  }

  // Update just this card (no full page re-render — avoids losing input focus)
  const card  = document.getElementById("card-" + id);
  const input = document.getElementById("inp-" + id);

  if (card) {
    qty > 0
      ? card.classList.add("selected")
      : card.classList.remove("selected");
  }
  if (rerender && input && document.activeElement !== input) {
    input.value = qty;
  }

  renderCart();    // refresh the order summary below
  updateBadge();   // update the count in the nav
}

function updateBadge() {
  document.getElementById("cartBadge").textContent = totalItems();
}

function renderCart() {
  const body  = document.getElementById("cartBody");
  const waBtn = document.getElementById("waBtn");
  const keys  = Object.keys(cart);

  // If cart is empty, show the placeholder and hide the button
  if (!keys.length) {
    body.innerHTML = `<div class="cart-empty">No items yet — tap a wig above to start your order.</div>`;
    waBtn.style.display = "none";
    return;
  }

  // Build a row for each item in the cart
  let html = "";
  keys.forEach(id => {
    const p   = products.find(x => x.id == id);
    const sub = p.price * cart[id];
    html += `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-sub">Qty: ${cart[id]} &times; ${fmt(p.price)}</div>
        </div>
        <div class="cart-item-price">${fmt(sub)}</div>
      </div>`;
  });

  // Add the total row at the bottom
  html += `
    <div class="cart-total-row">
      <span>Total</span>
      <span>${fmt(totalPrice())}</span>
    </div>`;

  body.innerHTML = html;
  waBtn.style.display = "flex";  // show the WhatsApp button
}

function buildMessage() {
  const keys  = Object.keys(cart);
  const lines = [];

  lines.push("Hello LuxeWigs! 👋");
  lines.push("I'd like to place an order:");
  lines.push("");                       // blank line for breathing room
  lines.push("─────────────────");
  lines.push("");

  keys.forEach((id, i) => {
    const p = products.find(x => x.id == id);
    lines.push(`${i + 1}. ${p.name}`);
    lines.push(`   Qty: ${cart[id]}`);
    lines.push(`   ${fmt(p.price)}${cart[id] > 1 ? " each" : ""}`);
    // Blank line between items, but not after the last one
    if (i < keys.length - 1) lines.push("");
  });

  lines.push("");
  lines.push("─────────────────");
  lines.push(`Total: ${fmt(totalPrice())}`);
  lines.push("");
  lines.push("Please confirm what's available.");
  lines.push("Thank you! 🙏");

  return lines.join("\n");  // join all lines with newline characters
}

function sendToWhatsApp() {
  if (!Object.keys(cart).length) return;

  // ⚠️  Change this to the real phone number
  // Format: country code + number, no +, no spaces
  // Nigeria example: 2348012345678
  const phone   = "2349160911119";
  const message = buildMessage();

  // encodeURIComponent converts newlines and special chars so they survive the URL
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function scrollToCart() {
  document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
}

renderProducts();
renderCart();