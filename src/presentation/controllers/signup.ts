import { CampoObrigatorioError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController implements Controller {
  execute(httpRequest: HttpRequest): HttpResponse {
    const camposObrigatorio = ["nome", "email", "senha", "confirmacaoSenha"];
    for (const campo of camposObrigatorio) {
      if (!httpRequest.body[campo]) {
        return badRequest(new CampoObrigatorioError(campo));
      }
    }
  }
}
