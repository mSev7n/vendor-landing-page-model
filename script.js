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

