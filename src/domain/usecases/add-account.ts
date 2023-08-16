import { Usuario } from "../models/account";

export interface usuarioCustomizado {
  nome: string;
  email: string;
  senha: string;
}

export interface CriarUsuario {
  criar(usuario: usuarioCustomizado): Promise<Usuario>;
}
