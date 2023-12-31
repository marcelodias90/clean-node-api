import { CampoObrigatorioError, CampoInvalidoError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helpers";
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

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const usuario = await this.criaUsuario.criar({
        nome,
        email,
        senha,
      });
      return ok(usuario);
    } catch (error) {
      return serverError();
    }
  }
}
