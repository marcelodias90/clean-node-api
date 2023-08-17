import { Usuario } from "../../domain/models/account";
import {
  CriarUsuario,
  usuarioCustomizado,
} from "../../domain/usecases/add-account";
import { Criptografar } from "../protocols/encrypter";

export class AdicionarUsuarioDB implements CriarUsuario {
  private readonly criptografar: Criptografar;

  constructor(criptografar: Criptografar) {
    this.criptografar = criptografar;
  }

  async criar(usuario: usuarioCustomizado): Promise<Usuario> {
    await this.criptografar.criptografar(usuario.senha);
    return new Promise((resolve) => resolve(null));
  }
}
