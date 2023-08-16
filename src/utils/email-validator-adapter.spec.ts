import { ValidarEmailAdaptado } from "./email-validator";

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se o validação retorna falso", () => {
    const validarEmailAdaptado = new ValidarEmailAdaptado();
    const valido = validarEmailAdaptado.valida("invalid_email@mail.com");
    expect(valido).toBe(false);
  });
});
