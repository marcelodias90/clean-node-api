import { CampoObrigatorioError } from "../errors/CampoObrigatorioError";
import { emailInvalidoError } from "../errors/emailInvalidoError";
import { ServerError } from "../errors/server-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../protocols/http";

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
      const valido = this.validaEmail.valida(httpRequest.body.email);
      if (!valido) {
        return badRequest(new emailInvalidoError("email"));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
