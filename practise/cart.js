document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector("#cart-items");
    const totalPriceElement = document.querySelector("#total-price");

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Корзина пуста</p>";
            totalPriceElement.textContent = "0";
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name} - ${item.price}₸ x <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity"></span>
                <button class="remove-item" data-index="${index}">Удалить</button>
            `;
            cartContainer.appendChild(itemDiv);
        });

        totalPriceElement.textContent = total;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", event => {
                removeFromCart(event.target.dataset.index);
            });
        });

        document.querySelectorAll(".item-quantity").forEach(input => {
            input.addEventListener("change", event => {
                updateQuantity(event.target.dataset.index, event.target.value);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    function updateQuantity(index, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart[index].quantity = parseInt(quantity) || 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    loadCart();
});     