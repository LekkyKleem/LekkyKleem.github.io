document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuToggle_ = document.querySelector(".menu-toggle_");
    const navMenu = document.querySelector(".nav-menu");
    const filterToggle = document.querySelector(".filter-toggle");
    const filters = document.querySelector(".filters");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    if (menuToggle_) {
        menuToggle_.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    if (filterToggle) {
        filterToggle.addEventListener("click", function () {
            filters.classList.toggle("active");
        });
    }
});

//Корзина//
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price: Number(price) });
    updateCart();
}

function updateCart() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.querySelector("#cart-count").textContent = total + "₸";
}

document.querySelector(".catalog-grid").addEventListener("click", function(event) {
    if (event.target.classList.contains("add-to-cart")) {
        const name = event.target.dataset.name;
        const price = event.target.dataset.price;
        addToCart(name, price);
    }
});

//Фильтры//
document.addEventListener("DOMContentLoaded", () => {
    const genreFilter = document.querySelector("#genre");
    const priceFilter = document.querySelector("#price");
    const priceValue = document.querySelector("#price-value");
    const ratingFilter = document.querySelector("#rating");
    const filterButton = document.querySelector(".show-filter");
    const books = document.querySelectorAll(".book-card");

    // Обновление отображения цены
    priceFilter.addEventListener("input", () => {
        priceValue.textContent = `${priceFilter.value}₸`;
    });

    document.querySelector("#price").addEventListener("input", function() {
        document.querySelector("#price-value").textContent = this.value + "₸";
    });

    // Фильтрация книг
    filterButton.addEventListener("click", () => {
        const selectedGenre = genreFilter.value;
        const selectedPrice = parseInt(priceFilter.value);
        const selectedRating = ratingFilter.value;

        books.forEach(book => {
            const bookPrice = parseInt(book.querySelector(".price").textContent);
            const bookGenre = book.dataset.genre; 
            const bookRating = book.dataset.rating;

            let genreMatch = selectedGenre === "all" || bookGenre === selectedGenre;
            let priceMatch = bookPrice <= selectedPrice;
            let ratingMatch = selectedRating === "all" || bookRating === selectedRating;

            if (genreMatch && priceMatch && ratingMatch) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }
        });
    });
});

//Сохранение товаров для переноса в корзину//
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.image;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            saveCart();
        });
    });
});
