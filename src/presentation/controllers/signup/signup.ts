import { CampoObrigatorioError, CampoInvalidoError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helpers";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  CriarUsuario,
} from "./signup-protocols";

export class SignUpController implements Controller {
  private readonly validaEmail: EmailValidator;
  private readonly criaUsuario: CriarUsuario;

  constructor(validaEmail: EmailValidator, criaUsuario: CriarUsuario) {
    this.validaEmail = validaEmail;
    this.criaUsuario = criaUsuario;
  }

  execute(httpRequest: HttpRequest): HttpResponse {
    try {
      const camposObrigatorio = ["nome", "email", "senha", "confirmacaoSenha"];
      for (const campo of camposObrigatorio) {
        if (!httpRequest.body[campo]) {
          return badRequest(new CampoObrigatorioError(campo));
        }
      }
      const { nome, email, senha, confirmacaoSenha } = httpRequest.body;
      if (senha !== confirmacaoSenha) {
        return badRequest(new CampoInvalidoError("confirmacaoSenha"));
      }
      const valido = this.validaEmail.valida(email);
      if (!valido) {
        return badRequest(new CampoInvalidoError("email"));
      }
      this.criaUsuario.criar({
        nome,
        email,
        senha,
      });
    } catch (error) {
      return serverError();
    }
  }
}
