import { CampoObrigatorioError } from "../errors/CampoObrigatorioError";
import { emailInvalidoError } from "../errors/emailInvalidoError";
import { ServerError } from "../errors/server-error";
import { EmailValidator } from "../protocols/email-validator";
import { SignUpController } from "./signup";

interface SutTypes {
  controller: SignUpController;
  validarEmail: EmailValidator;
}

const signUpController = (): SutTypes => {
  class ValidarEmail implements EmailValidator {
    valida(email: string): boolean {
      return true;
    }
  }
  const validarEmail = new ValidarEmail();
  const controller = new SignUpController(validarEmail);
  return {
    controller,
    validarEmail,
  };
};

describe("SignUp Controller", () => {
  test("Retorna 400 se o campo nome não for enviado.", () => {
    const { controller } = signUpController();
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
    const { controller } = signUpController();
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
    const { controller } = signUpController();
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
    const { controller } = signUpController();
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

  test("Retorna 400 se o email não for válido.", () => {
    const { controller, validarEmail } = signUpController();
    jest.spyOn(validarEmail, "valida").mockReturnValueOnce(false); //alterando o valor do retorno da funçao para executar o teste
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "invalid_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new emailInvalidoError("email"));
  });

  test("Deve enviar email correto.", () => {
    const { controller, validarEmail } = signUpController();
    const validSpy = jest
      .spyOn(validarEmail, "valida")
      .mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    controller.execute(httpRequest);
    expect(validSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Retorna 500 se o ValidarEmail retorna uma exceção", () => {
    class ValidarEmail implements EmailValidator {
      valida(email: string): boolean {
        throw new Error();
      }
    }
    const validarEmail = new ValidarEmail();
    const controller = new SignUpController(validarEmail);
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
