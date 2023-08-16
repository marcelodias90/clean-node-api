import { CampoObrigatorioError } from "../errors/missing-param-error";
import { SignUpController } from "./signup";

const signUpController = (): SignUpController => {
  return new SignUpController();
};

describe("SignUp Controller", () => {
  test("Retorna 400 se o campo nome não for enviado.", () => {
    const controller = signUpController();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new CampoObrigatorioError("nome"));
  });

  test("Retorna 400 se o campo email não for enviado.", () => {
    const controller = signUpController();
    const httpRequest = {
      body: {
        nome: "any_name",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new CampoObrigatorioError("email"));
  });

  test("Retorna 400 se o campo senha não for enviado.", () => {
    const controller = signUpController();
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        confirmacaoSenha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new CampoObrigatorioError("senha"));
  });

  test("Retorna 400 se o campo confirmação de senha não for enviado.", () => {
    const controller = signUpController();
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        senha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new CampoObrigatorioError("confirmacaoSenha")
    );
  });
});
