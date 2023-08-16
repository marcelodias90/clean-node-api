import { Usuario } from "../../domain/models/account";
import {
  CriarUsuario,
  usuarioCustomizado,
} from "../../domain/usecases/add-account";
import {
  CampoObrigatorioError,
  CampoInvalidoError,
  ServerError,
} from "../errors";
import { EmailValidator } from "../protocols";
import { SignUpController } from "./signup";

interface SutTypes {
  controller: SignUpController;
  validarEmail: EmailValidator;
  criaUsuario: CriarUsuario;
}

const validacaoEmail = (): EmailValidator => {
  class ValidarEmail implements EmailValidator {
    valida(email: string): boolean {
      return true;
    }
  }
  return new ValidarEmail();
};

const criarUsuario = (): CriarUsuario => {
  class criarUsuarioRepositorio implements CriarUsuario {
    criar(usuario: usuarioCustomizado): Usuario {
      const usuarioTeste = {
        id: "valid_id",
        nome: "valid_nome",
        email: "valid_email",
        senha: "valid_senha",
      };
      return usuarioTeste;
    }
  }
  return new criarUsuarioRepositorio();
};

const signUpController = (): SutTypes => {
  const validarEmail = validacaoEmail();
  const criaUsuario = criarUsuario();
  const controller = new SignUpController(validarEmail, criaUsuario);
  return {
    controller,
    validarEmail,
    criaUsuario,
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

  test("Retorna 400 se a confirmação da senha for diferente", () => {
    const { controller } = signUpController();
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "invalid_password",
      },
    };
    const httpResponse = controller.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new CampoInvalidoError("confirmacaoSenha")
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
    expect(httpResponse.body).toEqual(new CampoInvalidoError("email"));
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
    const { validarEmail, controller } = signUpController();
    jest.spyOn(validarEmail, "valida").mockImplementationOnce(() => {
      throw new Error();
    });
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

  test("Deve enviar email correto.", () => {
    const { controller, criaUsuario } = signUpController();
    const criarSpy = jest.spyOn(criaUsuario, "criar");
    const httpRequest = {
      body: {
        nome: "any_name",
        email: "any_email@mail.com",
        senha: "any_password",
        confirmacaoSenha: "any_password",
      },
    };
    controller.execute(httpRequest);
    expect(criarSpy).toHaveBeenCalledWith({
      nome: "any_name",
      email: "any_email@mail.com",
      senha: "any_password",
    });
  });
});
