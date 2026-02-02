/*let user = localStorage.getItem("pawcareUser");
if (!user) window.location.href = "login.html";*/

// Protect page
/*if (!localStorage.getItem("pawcareUser")) {
    window.location.href = "login.html";
}*/
const dogs = [
    { 
        name: "Labrador", 
        price: 500, 
        image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "German Shepherd", 
        price: 600, 
        image: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Poodle", 
        price: 550, 
        image: "images/poodle.jpg"
    },
    { 
        name: "French Bulldog", 
        price: 650, 
        image: "images/buldog.jpg"
    },
    { 
        name: "Golden Retriever", 
        price: 700, 
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Beagle", 
        price: 480, 
        image: "images/beagle.jpg"
    },
    { 
        name: "Rottweiler", 
        price: 750, 
        image: "https://images.unsplash.com/photo-1605559141066-1549783d18e9?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Husky", 
        price: 800, 
        image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Doberman", 
        price: 720, 
        image: "images/dobberman.jpg"
    },
    { 
        name: "Chihuahua", 
        price: 400, 
        image: "images/chihauhau.jpg"
    },
    { 
        name: "Shih Tzu", 
        price: 520, 
        image: "images/shitzu.jpg"
    },
    { 
        name: "Pug", 
        price: 500, 
        image: "images/pug.jpg"
    },
    { 
        name: "Maltese", 
        price: 530, 
        image: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Corgi", 
        price: 680, 
        image: "images/corgi.jpg"
    },
    { 
        name: "Great Dane", 
        price: 900, 
        image: "https://images.unsplash.com/photo-1566793849773-e1375992cd59?w=300&h=200&fit=crop&auto=format"
    },
    { 
        name: "Dalmatian", 
        price: 650, 
        image: "images/dalmatian.jpg"
    },
    { 
        name: "Akita", 
        price: 850, 
        image: "images/akita.jpg"
    },
    { 
        name: "Boxer", 
        price: 620, 
        image: "images/boxer.jpg"
    },
    { 
        name: "Samoyed", 
        price: 880, 
        image: "images/samoyed.jpg"
    },
    { 
        name: "Border Collie", 
        price: 700, 
        image: "images/bordi.jpg"
    },
    { 
        name: "Saint Bernard", 
        price: 950, 
        image: "images/saintbernard.jpg"
    },
    { 
        name: "Australian Shepherd", 
        price: 720, 
        image: "images/australain sh.jpg"
    },
    { 
        name: "English Bulldog", 
        price: 780, 
        image: "images/english buldong.jpg"
    },
    { 
        name: "Mini Pinscher", 
        price: 450, 
        image: "images/pinchere.jpg"
    },
];

let cart = {};
const container = document.getElementById("dogContainer");

// Clear container first
container.innerHTML = '';

dogs.forEach((dog, index) => {
    // Create dog card HTML
    container.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="dog-card card h-100 shadow-sm">
                <img src="${dog.image}" 
                     class="card-img-top" 
                     alt="${dog.name}"
                     style="height: 200px; object-fit: cover;"
                     onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=200&fit=crop&auto=format'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${dog.name}</h5>
                    <p class="card-text fw-bold text-primary">$${dog.price}</p>
                    <button class="btn btn-primary btn-sm mt-auto"
                            onclick="addToCart('${dog.name.replace(/'/g, "\\'")}', ${dog.price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
});

function addToCart(name, price) {
    if (!cart[name]) {
        cart[name] = { 
            price: price, 
            qty: 1,
            itemTotal: price 
        };
    } else {
        cart[name].qty++;
        cart[name].itemTotal = cart[name].price * cart[name].qty;
    }
    updateCart();
    showNotification(`${name} added to cart!`, 'success');
}

function removeFromCart(name) {
    if (cart[name]) {
        if (cart[name].qty > 1) {
            cart[name].qty--;
            cart[name].itemTotal = cart[name].price * cart[name].qty;
            showNotification(`One ${name} removed from cart!`, 'warning');
        } else {
            delete cart[name];
            showNotification(`${name} removed from cart!`, 'danger');
        }
        updateCart();
    }
}

function removeAllOfItem(name) {
    if (cart[name]) {
        delete cart[name];
        showNotification(`All ${name} removed from cart!`, 'danger');
        updateCart();
    }
}

function updateCart() {
    let count = 0;
    let total = 0;
    let cartItems = document.getElementById("cartItems");
    
    if (!cartItems) return;
    
    cartItems.innerHTML = "";

    for (let item in cart) {
        count += cart[item].qty;
        total += cart[item].price * cart[item].qty;

        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <span class="fw-bold">${item}</span>
                    <span class="badge bg-primary rounded-pill ms-2">x${cart[item].qty}</span>
                </div>
                <div class="d-flex align-items-center">
                    <span class="me-3">$${(cart[item].price * cart[item].qty).toFixed(2)}</span>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-danger btn-sm" 
                                onclick="removeFromCart('${item.replace(/'/g, "\\'")}')"
                                title="Remove one">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm" 
                                onclick="removeAllOfItem('${item.replace(/'/g, "\\'")}')"
                                title="Remove all">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </li>
        `;
    }

    // Update cart count display
    const cartCountElement = document.getElementById("cartCount");
    const cartTotalElement = document.getElementById("cartTotal");
    const modalTotalElement = document.getElementById("modalTotal");
    
    if (cartCountElement) cartCountElement.innerText = count;
    if (cartTotalElement) cartTotalElement.innerText = total.toFixed(2);
    if (modalTotalElement) modalTotalElement.innerText = total.toFixed(2);
    
    // Show empty cart message
    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = `
            <li class="list-group-item text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-2x mb-3"></i>
                <p>Your cart is empty</p>
                <p class="small">Add some dogs to your cart!</p>
            </li>
        `;
    }
}

function showNotification(message, type = 'success') {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

function placeOrder() {
    const email = document.getElementById("orderEmail").value;

    if (!email) {
        alert("Please enter your email");
        return;
    }

    let orderDetails = "";
    let total = 0;

    for (let item in cart) {
        orderDetails += `${item} (x${cart[item].qty}) - $${cart[item].price * cart[item].qty}\n`;
        total += cart[item].price * cart[item].qty;
    }

    if (total === 0) {
        alert("Your cart is empty");
        return;
    }

    emailjs.send(
        "service_id6688tlf",
        "template_5wfk4jl",
        {
            customer_email: email,
            order_details: orderDetails,
            total: total
        }
    ).then(() => {
        alert("✅ Order placed successfully! We will contact you soon.");
        cart = {};
        updateCart();
        document.getElementById("orderEmail").value = "";
    }).catch((error) => {
        console.error("EmailJS FULL ERROR:", error);
        alert("Order failed. Check console for details.");
    });
    
}


function clearCart() {
    if (Object.keys(cart).length === 0) {
        showNotification("Cart is already empty!", 'info');
        return;
    }
    
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = {};
        updateCart();
        showNotification("Cart cleared!", 'danger');
    }
}

// Add CSS for notification animation and cart styling
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        border-radius: 8px;
    }
    
    .notification .btn-close {
        margin-left: 15px;
    }
    
    /* Cart modal styling */
    .cart-item-actions {
        display: flex;
        gap: 5px;
    }
    
    .cart-item-actions button {
        padding: 2px 8px;
    }
    
    /* Empty cart styling */
    .empty-cart-icon {
        color: #6c757d;
        opacity: 0.5;
    }
    
    /* Cart badge animation */
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .cart-badge-animate {
        animation: bounce 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add cart badge animation
function animateCartBadge() {
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.classList.add('cart-badge-animate');
        setTimeout(() => {
            badge.classList.remove('cart-badge-animate');
        }, 300);
    }
}

// Modified addToCart to include animation
const originalAddToCart = addToCart;
addToCart = function(name, price) {
    originalAddToCart(name, price);
    animateCartBadge();
};

// Modified removeFromCart to include animation
const originalRemoveFromCart = removeFromCart;
removeFromCart = function(name) {
    originalRemoveFromCart(name);
    animateCartBadge();
};