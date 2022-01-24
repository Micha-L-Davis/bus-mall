'use strict';

//#region Global Document References

let productsSection = document.getElementById('products');
let img01 = document.getElementById('img01');
let img02 = document.getElementById('img02');
let img03 = document.getElementById('img03');

let resultsSection= document.getElementById('results');

//#endregion

//#region Product Constructor

function Product(productID, alt, fileExtension = 'jpg') {
  this.productID = productID;
  this.src = `img/${productID}.${fileExtension}`;
  this.alt = alt;
  this.viewCount = 0;
  this.selectCount = 0;

  Product.list.push(this);
}

Product.list = [];

//#endregion

//#region Constructor Calls

// eslint-disable-next-line no-unused-vars
let bag = new Product('bag', 'a droid suitcase');
// eslint-disable-next-line no-unused-vars
let banana = new Product('banana', 'a banana slicer');
// eslint-disable-next-line no-unused-vars
let bathroom = new Product('bathroom', 'a toilet-side tablet');
// eslint-disable-next-line no-unused-vars
let boots = new Product('boots','a pair of toeless waders');
// eslint-disable-next-line no-unused-vars
let breakfast = new Product('breakfast', 'a kitchen multi-tool');
// eslint-disable-next-line no-unused-vars
let bubblegum = new Product('bubblegum', 'a pack of meatball bubblegum');
// eslint-disable-next-line no-unused-vars
let chair = new Product('chair', 'an uncomfortable chair');
// eslint-disable-next-line no-unused-vars
let cthulhu = new Product('cthulhu', 'a cthulhu action figure');
// eslint-disable-next-line no-unused-vars
let dogDuck = new Product('dog-duck', 'a duck-billed dog muzzle');
// eslint-disable-next-line no-unused-vars
let dragon = new Product('dragon', 'a tin of dragon meat');
// eslint-disable-next-line no-unused-vars
let pen = new Product('pen', 'a multifunction writing/eating set');
// eslint-disable-next-line no-unused-vars
let petSweep = new Product('pet-sweep', 'a pack of pet dusting boots');
// eslint-disable-next-line no-unused-vars
let scissors = new Product('scissors', 'a pair of pizza shears');
// eslint-disable-next-line no-unused-vars
let shark = new Product('shark', 'a shark sleeping bag');
// eslint-disable-next-line no-unused-vars
let sweep = new Product('sweep', 'a child labor device', 'png');
// eslint-disable-next-line no-unused-vars
let tauntaun = new Product('tauntaun', 'a moist, smelly sleeping bag');
// eslint-disable-next-line no-unused-vars
let unicorn = new Product('unicorn', 'a tin of unicorn meat');
// eslint-disable-next-line no-unused-vars
let waterCan = new Product('water-can', 'a self-watering can');
// eslint-disable-next-line no-unused-vars
let wineGlass = new Product('wine-glass', 'a zero-g wine glass');

//#endregion

renderProducts();

//#region Global Functions

function createElement(tag, parent) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
}

function getRandomIndex(arr){
  return Math.floor(Math.random() * arr.length);
}

function renderProducts(){
  let product01 = Product.list[getRandomIndex(Product.list)];
  let product02 = Product.list[getRandomIndex(Product.list)];
  let product03 = Product.list[getRandomIndex(Product.list)];

  while (product02 === product01){
    product02 = Product.list[getRandomIndex(Product.list)];
  }

  while ((product03 === product01) || (product03 === product01)){
    product03 = Product.list[getRandomIndex(Product.list)];
  }

  img01.src = product01.src;
  img01.alt = product01.alt;
  product01.viewCount++;

  img02.src = product02.src;
  img02.alt = product02.alt;
  product02.viewCount++;

  img03.src = product03.src;
  img03.alt = product03.alt;
  product03.viewCount++;
}

let voteCount = 5;

function handleVote(event){
  event.preventDefault();
  let clicked = event.target;
  for (let i = 0; i < Product.list.length; i++){
    let product = Product.list[i];
    if(clicked.alt === product.alt){
      product.selectCount++;
      voteCount--;
    }
  }

  if(voteCount === 0) {
    productsSection.removeEventListener('click', handleVote);
    resultsSection.addEventListener('click', handleResults);
  }

  renderProducts();
}

function handleResults(event){
  event.preventDefault();
  const ulElem = createElement('ul', resultsSection);
  for (let i = 0; i < Product.list.length; i++){
    let product = Product.list[i];
    const liElem = createElement('li', ulElem);
    liElem.textContent = `${product.alt} was chosen ${product.selectCount} times, and was seen ${product.viewCount} times.`;
  }
}


//#endregion

//#region EventListeners

productsSection.addEventListener('click', handleVote);

//#endregion
