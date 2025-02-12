document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const productData = {
                id: product.dataset.id,
                name: product.dataset.name,
                price: product.dataset.price,
                image: product.dataset.image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingProduct = cart.find(item => item.id === productData.id);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push(productData);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Товар добавлен в корзину!");
        });
    });
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
