import {
  CriarUsuario,
  usuarioCustomizado,
  Usuario,
  Criptografar,
} from "./db-add-account-protocols";

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
