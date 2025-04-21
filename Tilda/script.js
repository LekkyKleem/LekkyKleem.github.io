// Карусель изображений с кнопками "вперед" и "назад"
document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const slides = track.querySelectorAll('img');
    const prevBtn = container.querySelector('button[class^="prev"]');
    const nextBtn = container.querySelector('button[class^="next"]');
    
    let currentIndex = 0;
  
    function updateCarousel() {
      const slideWidth = slides[0].clientWidth;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  
    window.addEventListener('resize', updateCarousel);
  
    updateCarousel(); // чтобы карусель сразу отобразилась корректно
  });
  

// Валидация
const form = document.querySelector("#bookingForm");

const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const phoneError = document.querySelector("#phone-error");

function validateForm() {
  let isValid = true;

  // Очистка предыдущих ошибок
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  const name = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // Валидация имени
  if (name.length < 2) {
    nameError.textContent = "Имя должно быть не менее 2 символов";
    isValid = false;
  }

  // Валидация email
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Введите корректный email";
    isValid = false;
  }

  // Валидация телефона
  const phoneRegex = /^[0-9+\-\s]{6,20}$/;
  if (!phoneRegex.test(phone)) {
    phoneError.textContent = "Введите корректный номер телефона";
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    alert("Форма успешно отправлена!");
    form.reset(); // Очистить форму
  }
});
