import { ValidarEmailAdaptado } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const controller = (): ValidarEmailAdaptado => {
  return new ValidarEmailAdaptado();
};

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se o validação retorna falso", () => {
    const validarEmailAdaptado = controller();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(false);
  });

  test("Deve retornar true se a validação retorna true", () => {
    const validarEmailAdaptado = controller();
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(true);
  });

  test("Deve passar para validação o email correto", () => {
    const validarEmailAdaptado = controller();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    validarEmailAdaptado.valida("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
