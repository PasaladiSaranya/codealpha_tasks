const products = [
  { id: 1, name: "Shoes", price: 999, image: "pic1.jpg" },
  { id: 2, name: "T-Shirt", price: 499, image: "pic2.jpg" }
];

// Show products
const container = document.getElementById("products");

if (container) {
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

 div.innerHTML = `
  <img src="${p.image}" width="100">
  <h3>${p.name}</h3>
  <p>₹${p.price}</p>
  <button onclick="viewProduct(${p.id})">View</button>
  <button onclick="addToCart(${p.id})">Add to Cart</button>
`;

    container.appendChild(div);
  });
}

// View product
function viewProduct(id) {
  localStorage.setItem("productId", id);
  window.location.href = "product.html";
}

// Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
// Show cart items
const cartContainer = document.getElementById("cart");

if (cartContainer) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // If cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = "🛒 Your cart is empty";
  } else {
    cart.forEach(id => {
      const product = products.find(p => p.id == id);

      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      `;

      cartContainer.appendChild(div);
    });
  }
}