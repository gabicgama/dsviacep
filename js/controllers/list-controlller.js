function State() {
  this.listSection = null;
}

const state = new State();

export function init() {
  state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
  const card = createCard(address);
  state.listSection.appendChild(card);
}

function createCard(address) {
  const div = document.createElement("div");
  div.classList.add("card-list-item");

  const h3 = document.createElement("h3");
  h3.innerHTML = address.city;

  const p1 = document.createElement("p");
  p1.classList.add("address-line");
  p1.innerHTML = `${address.street}, ${address.number}`;

  const p2 = document.createElement("p");
  p2.classList.add("address-cep");
  p2.innerHTML = `${address.cep}`;

  div.appendChild(h3);
  div.appendChild(p1);
  div.appendChild(p2);

  return div;
}
