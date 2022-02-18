import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

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

  state.inputNumber.addEventListener("change", handleInputumberChange);
  state.inputNumber.addEventListener("keyup", handleInputumberKeyup);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
}

function handleInputumberKeyup(event) {
  state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
  try {
    const cep = event.target.value;
    const address = await addressService.findByCep(cep);

    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;

    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    setFormError("cep", "Informe um CEP válido");
    state.inputStreet.value = "";
    state.inputCity.value = "";
  }
}

 function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = addressService.getErrors(state.address);

  const keys = Object.keys(errors);
  

  if (keys.length > 0) {

    keys.forEach(key => {
      setFormError(key, errors[key]);
    })
    //outra maneira de fazer o for

    //for (let i = 0; i < keys.length; i++) {
      //setFormError(keys[i], errors[keys[i]]);
   //}
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

function handleInputumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "campo requedido");
  } else {
    setFormError("number", "");
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm(event) {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.address = new Address();
  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}

function btnClear(event) {
  event.preventDefault();
  state.inputCep = "";
  state.ininputStreetputCep = "";
  state.inputNumber = "";
  state.inputCity = "";
}
