// Sample Data Setup
const products = [
    { id: 1, name: "Wireless Headphones", category: "electronics", price: 99.99, image: "https://via.placeholder.com/200?text=Headphones" },
    { id: 2, name: "Smart Watch", category: "electronics", price: 149.99, image: "https://via.placeholder.com/200?text=Smartwatch" },
    { id: 3, name: "Denim Jacket", category: "fashion", price: 59.99, image: "https://via.placeholder.com/200?text=Jacket" },
    { id: 4, name: "Running Shoes", category: "fashion", price: 89.99, image: "https://via.placeholder.com/200?text=Shoes" }
];

let cart = [];

// DOM Element References
const productsContainer = document.getElementById("products-container");
const cartBtn = document.getElementById("cart-btn");
const closeCartBtn = document.getElementById("close-cart");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const filterBtns = document.querySelectorAll(".filter-btn");

// Render Product Cards
function renderProducts(items) {
    productsContainer.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        const category = e.target.dataset.category;
        if (category === "all") {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update Cart Count Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Render Items inside Cart Modal
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Calculate Total Price
    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = totalSum.toFixed(2);
}

// Modal Toggle Handlers
cartBtn.addEventListener("click", () => cartModal.style.display = "flex");
closeCartBtn.addEventListener("click", () => cartModal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
});

// Initialize Page
renderProducts(products);