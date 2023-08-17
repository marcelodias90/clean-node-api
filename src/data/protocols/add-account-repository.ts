import { Usuario } from "./../../domain/models/account";
import { usuarioCustomizado } from "./../../domain/usecases/add-account";

export interface UsuarioRepository {
  criar(usuario: usuarioCustomizado): Promise<Usuario>;
}
