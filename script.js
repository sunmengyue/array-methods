const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate_wealth');

let users = []; // To store all the users;

// generate a random user
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  users.push(obj);

  updateDOM();
}

// Double a user's money
function doubleMoney() {
  users = users.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort money in a descending order
function sortByRechiest() {
  users.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
}

// Show millionaires
function showMillionaires() {
  users = users.filter((user) => user.money >= 1000000);
  updateDOM();
}

// Claculate the total wealth
function calcWealth() {
  const totalWealth = users.reduce((acc, user) => acc + user.money, 0);
  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);

  console.log(formatMoney(totalWealth));
}

//Update the DOM;
function updateDOM(persons = users) {
  //clear the main area
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  persons.forEach((person) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRechiest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calcWealth);
