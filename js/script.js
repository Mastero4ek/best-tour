//mobile menu

  const headerMobile = document.querySelector('.header__wrapper-bottom'),
        burger = document.querySelector('.header__mobile-burger'),
        cross = document.querySelector('.header__mobile-cross'),
        body = document.querySelector('body');

        burger.addEventListener('click', () => {
          headerMobile.classList.toggle('active');
          burger.style.display = 'none';
          cross.style.display = 'block';
          body.classList.add('noscroll');
        });

        cross.addEventListener('click', () => {
          headerMobile.classList.toggle('active');
          burger.style.display = 'block';
          cross.style.display = 'none';
          body.classList.remove('noscroll');
        });

//packages

const packages = document.querySelector('.packages__wrap');

packages.addEventListener('click', ({ target }) => {
	const cartWrap = target.closest('.cart__wrap');

	if (!cartWrap || target.closest('.cart__description')) return;
    document.querySelector('.cart__wrap--big').classList.remove('cart__wrap--big');
		cartWrap.classList.add('cart__wrap--big');
});

//slider-hotel

const swiperHotel = new Swiper('.hotel__swiper', {

  loop: true,

  navigation: {
    nextEl: '.hotel__swiper-button-next',
    prevEl: '.hotel__swiper-button-prev',
  },
});

//slider-reviews

const swiperReviews = new Swiper('.reviews__swiper', {

  loop: true,

  navigation: {
    nextEl: '.reviews__swiper-button-next',
    prevEl: '.reviews__swiper-button-prev',
  },
});

const innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
      swiperReviews.destroy();
    }

//hotel-map

let flag = 0;
let center = [39.9472394874044,-75.14963816899775];

	function init() {
		let map = new ymaps.Map('map-element', {
        center: center,
        zoom: 14
        });

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты
	}

        
	const yaScript = document.createElement('script');
		yaScript.type = 'text/javascript';
		yaScript.src = "https://api-maps.yandex.ru/2.1/?apikey=76e41e6b-f3a9-4a9c-80d3-17839d5764b8&lang=ru_RU";
		document.body.appendChild(yaScript);
        yaScript.addEventListener("load", () => {
          ymaps.ready(init);
        });

	flag = 1;

// send 

const validation = new JustValidate('#footer-form');

  validation
    .addField('#name', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'The number of characters is less than 2!'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'The number of characters is more than 30!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Enter your name!'
    }
    ])

    .addField('#text', [{
      rule: 'minLength',
      value: 12,
      errorMessage: 'Leave your phone number for communication!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Leave your phone number for communication!'
    }
    ])

    .addField('#tel', [{
      rule: 'minLength',
      value: 2,
      errorMessage: 'Invalid number of characters!'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Invalid number of characters!'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Enter address phone number!'
    }
    ]).onSuccess((e) => {
      
        const sendForm = (data) => {
          return fetch('mail.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(res => res.json());
        };

        const dataForm = new FormData(e.target);
        const user = {};

        dataForm.forEach((val, key) => {
          user[key] = val;
        });

        sendForm(user).then(data => {
            alert("Thank You for mail!");
        });

        e.target.reset();

  });