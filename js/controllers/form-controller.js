import Address from "../model/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controlller.js";

function State() {
  this.address = new Address();
  this.btnSave = null;
  this.btnClear = null;
  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;
  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;
  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;
  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');
  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.inputCep.addEventListener("change", handleInputCepChange);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
}

function handleInputNumberKeyup(event) {
  state.address.number = event.target.value;
}

function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "Campo requerido");
  } else {
    setFormError("number", "");
  }
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep);
    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;
    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    setFormError("cep", "Informe um CEP válido");
    state.inputCity.value = "";
    state.inputStreet.value = "";
  }
}

async function handleBtnSaveClick(event) {
  event.preventDefault();

  const erros = addressService.getErros(state.address);
  const keys = Object.keys(erros);
  if (keys.length > 0) {
    keys.forEach((key) => setFormError(key, erros[key]));
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputNumber.value = "";
  state.inputStreet.value = "";
  state.address = new Address();
  state.inputCep.focus();
  setFormError("number", "");
  setFormError("cep", "");
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
