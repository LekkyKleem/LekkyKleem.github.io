document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Массив данных для слайдов
    const slideData = [
        {
            imgSrc: 'img/section-one.png',
            title: 'Fig. 1 (plant)',
            description: 'Имеется спорная точка зрения, гласящая примерно следующее: активно развивающиеся страны третьего мира своевременно верифицированы.'
        },
        {
            imgSrc: 'img/section-two.png',
            title: 'Fig. 2 (flower)',
            description: 'Прежде всего, синтетическое тестирование влечет за собой процесс внедрения и модернизации условий.'
        },
        {
            imgSrc: 'img/section-three.png',
            title: 'Fig. 3 (leaf)',
            description: 'Лишь непосредственные участники прогресса неоднозначны и будут в равной степени предоставлены сами себе для работы.'
        },
        {
            imgSrc: 'img/section-four.png',
            title: 'Fig. 4 (wood)',
            description: 'Базовый вектор развития не даёт нам иного выбора, кроме определения новых предложений.'
        }
    ];

    let currentSlide = 0;
    const totalSlides = slideData.length;

    // Функция для создания нового слайда
    function createSlide(index) {
        const slide = document.createElement('div');
        slide.classList.add('slider-elem');

        const sliderImg = document.createElement('div');
        sliderImg.classList.add('sliderImg');
        const img = document.createElement('img');
        img.src = slideData[index].imgSrc;
        img.alt = slideData[index].title;
        sliderImg.appendChild(img);
        slide.appendChild(sliderImg);

        const slideHeader = document.createElement('h2');
        slideHeader.classList.add('sliderHeader');
        slideHeader.textContent = slideData[index].title;
        slide.appendChild(slideHeader);

        const slideP = document.createElement('p');
        slideP.classList.add('sliderP');
        slideP.textContent = slideData[index].description;
        slide.appendChild(slideP);

        const slideBtn = document.createElement('button');
        slideBtn.classList.add('sliderBtn');
        slideBtn.textContent = 'Подробнее';
        slide.appendChild(slideBtn);

        return slide;
    }

    // Функция для отображения текущего слайда
    function showSlide(index) {
        // Очищаем слайдер перед добавлением нового слайда
        sliderContainer.innerHTML = '';

        // Добавляем 4 слайда: текущий, следующий и предыдущие
        for (let i = -1; i < 3; i++) {
            const slideIndex = (index + i + totalSlides) % totalSlides;  // Индекс слайда с учётом цикличности
            const newSlide = createSlide(slideIndex);
            sliderContainer.appendChild(newSlide);
            // Даем классу 'show' для анимации
            setTimeout(() => {
                newSlide.classList.add('show');
            }, 10);
        }
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Функция для перехода к предыдущему слайду
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Инициализация первого слайда
    showSlide(currentSlide);

    // Навигационные кнопки
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
});
