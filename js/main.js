'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInform = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

const getData = async function (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
    статус ошибки ${response.status}!`)
  }
   return await response.json();
};

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {

  function logOut() {
    login = '';
  localStorage.removeItem('gloDelivery');
  buttonAuth.style.display = '';
  userName.style.display = '';
  buttonOut.style.display = '';
   buttonOut.removeEventListener('click', logOut);

    checkAuth();
  }

  console.log('Авторизован');
  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized () {
  console.log('Неавторизован');

function logIn(event) {
  event.preventDefault();
  if (loginInput.value) {
    loginInput.style.borderColor = '';
    login = loginInput.value;

    localStorage.setItem('gloDelivery', login);

    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    loginInform.removeEventListener('submit', logIn);
    loginInform.reset();
    checkAuth();
  } else {
    loginInput.style.borderColor = 'red';
  }  
}

buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
loginInform.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
  authorized();
} else {
  notAuthorized();
}
}

checkAuth();

function createCardRestaurant () {
  const card = `
      <a class="card card-restaurant">
                <img src="img/food-band/preview.jpg" alt="image" class="card-image"/>
                <div class="card-text">
                  <div class="card-heading">
                    <h3 class="card-title">FoodBand</h3>
                    <span class="card-tag tag">40 мин</span>
                  </div>
                  <div class="card-info">
                    <div class="rating">
                      4.5
                    </div>
                    <div class="price">От 450 ₽</div>
                    <div class="category">Пицца</div>
                  </div>
                </div>
              </a>        
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<!-- /.card-heading -->
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
									грибы.
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
  `;

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods (event) {
  const target = event.target;
  if (login) {
    const restaurant = target.closest('.card-restaurant');
  if (restaurant) {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');
    createCardGood();
  }
  } else {
    toggleModalAuth();
  }  
}

getData('./db/partners.json').then(function (data) {
  data.forEach(createCardRestaurant)
});

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

checkAuth();


new Swiper ('.swiper-container', {
  loop: true,
  sliderPerView: 1,
});

