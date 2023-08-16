import { CampoObrigatorioError, CampoInvalidoError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "../protocols";

export class SignUpController implements Controller {
  private readonly validaEmail: EmailValidator;

  constructor(validaEmail: EmailValidator) {
    this.validaEmail = validaEmail;
  }

  execute(httpRequest: HttpRequest): HttpResponse {
    try {
      const camposObrigatorio = ["nome", "email", "senha", "confirmacaoSenha"];
      for (const campo of camposObrigatorio) {
        if (!httpRequest.body[campo]) {
          return badRequest(new CampoObrigatorioError(campo));
        }
      }
      const { email, senha, confirmacaoSenha } = httpRequest.body;
      if (senha !== confirmacaoSenha) {
        return badRequest(new CampoInvalidoError("confirmacaoSenha"));
      }
      const valido = this.validaEmail.valida(email);
      if (!valido) {
        return badRequest(new CampoInvalidoError("email"));
      }
    } catch (error) {
      return serverError();
    }
  }
}
