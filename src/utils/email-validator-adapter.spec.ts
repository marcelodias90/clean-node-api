import { ValidarEmailAdaptado } from "./email-validator";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se o validação retorna falso", () => {
    const validarEmailAdaptado = new ValidarEmailAdaptado();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(false);
  });

  test("Deve retornar true se o validação retorna true", () => {
    const validarEmailAdaptado = new ValidarEmailAdaptado();
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(true);
  });
});
