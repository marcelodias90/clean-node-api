import {
  CriarUsuario,
  usuarioCustomizado,
  Usuario,
  Criptografar,
  UsuarioRepository,
} from "./db-add-account-protocols";

export class AdicionarUsuarioDB implements CriarUsuario {
  private readonly criptografar: Criptografar;
  private readonly usuarioRepository: UsuarioRepository;

  constructor(
    criptografar: Criptografar,
    usuarioRepository: UsuarioRepository
  ) {
    this.criptografar = criptografar;
    this.usuarioRepository = usuarioRepository;
  }

  async criar(usuario: usuarioCustomizado): Promise<Usuario> {
    const senhaCriptografada = await this.criptografar.criptografar(
      usuario.senha
    );
    const novoUsuario = await this.usuarioRepository.criar(
      Object.assign({}, usuario, { senha: senhaCriptografada })
    );
    return novoUsuario;
  }
}
