import * as requestService from "./request-service.js";
import Address from "../model/address.js";

export async function findByCep(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  const result = await requestService.getJson(url);
  const address = new Address(
    result.cep,
    result.logradouro,
    null,
    result.localidade
  );
  return address;
}

export function getErros(address) {
  const erros = {};

  if (!address.cep || address.cep == "") {
    erros.cep = "Campo requerido";
  }

  if (!address.number || address.number == "") {
    erros.number = "Campo requerido";
  }

  return erros;
}
