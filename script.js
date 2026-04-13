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

