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

  test("Deve retornar true se a validação retorna true", () => {
    const validarEmailAdaptado = new ValidarEmailAdaptado();
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(true);
  });

  test("Deve passar para validação o email correto", () => {
    const validarEmailAdaptado = new ValidarEmailAdaptado();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    validarEmailAdaptado.valida("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
