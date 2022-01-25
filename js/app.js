'use strict';

//#region Global Document References

const productsSection = document.getElementById('products');

const chartElem = document.getElementById('chart');
let context = chartElem.getContext('2d');


//#endregion

//#region Product Constructor

function Product(productID, alt, fileExtension = 'jpg') {
  this.productID = productID;
  this.src = `img/${productID}.${fileExtension}`;
  this.alt = alt;
  this.viewCount = 0;
  this.voteCount = 0;

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

chartElem.style.display='none';
let userVoteCount = 25;
const numToRender = 3;
let prevProducts = [];

renderProducts(Product.list);

//#region Global Functions

function createElement(tag, parent) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
}

function getRandomIndex(arr){
  return Math.floor(Math.random() * arr.length);
}


function renderProducts(arr){
  removeAllChildren(productsSection);
  let currentProducts = [...arr];
  let products;

  products = currentProducts.filter(product => !prevProducts.includes(product));
  prevProducts = [];
  for (let i = numToRender; i > 0; i--){
    let product = products.splice(getRandomIndex(products), 1)[0];
    let imgElem = createElement('img', productsSection);
    imgElem.src = product.src;
    imgElem.alt = product.alt;
    product.viewCount++;
    prevProducts.push(product);
  }
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function handleVote(event){
  event.preventDefault();
  let clicked = event.target;

  if (clicked.alt !== undefined){
    for (let i = 0; i < Product.list.length; i++){
      let product = Product.list[i];
      if(clicked.alt === product.alt){
        product.voteCount++;
        userVoteCount--;
      }
    }
    renderProducts(Product.list);
  }
  if(userVoteCount === 0) {
    productsSection.removeEventListener('click', handleVote);
    chartElem.style.display='initial';
    renderResults();
  }


}

function renderResults(){
  fillFallbackData();
  renderChart();
}

function fillFallbackData() {
  const ulElem = createElement('ul', chartElem);
  for (let i = 0; i < Product.list.length; i++){
    let product = Product.list[i];
    const liElem = createElement('li', ulElem);
    liElem.textContent = `${product.alt} was chosen ${product.selectCount} times, and was seen ${product.viewCount} times.`;
  }
}

function renderChart(){
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < Product.list.length; i++) {
    let product = Product.list[i];
    productNames.push(product.productID);
    productVotes.push(product.voteCount);
    productViews.push(product.viewCount);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      fontColor: 'white',
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        },
      },
      scales: {
        yAxis: {
          color: 'white',
          beginAtZero: true,
          ticks: {
            color: 'white'
          },
          grid: {
            borderColor: 'rgba(240, 248, 255, 0.5)',
            tickColor: 'rgba(100, 125, 140, 0.5)'
          }
        },
        xAxis: {
          ticks: {
            color: 'white'
          },
          color: 'white',
          grid: {
            borderColor: 'rgba(240, 248, 255, 0.5)',
            tickColor: 'rgba(100, 125, 140, 0.5)'
          }
        }
      }
    },
  };

  const chart = new Chart(context, chartObj); //eslint-disable-line
}

//#endregion

//#region EventListeners

productsSection.addEventListener('click', handleVote);

//#endregion
