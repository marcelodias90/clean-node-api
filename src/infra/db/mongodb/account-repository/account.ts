import { UsuarioRepository } from "../../../../data/protocols/add-account-repository";
import { Usuario } from "../../../../domain/models/account";
import { usuarioCustomizado } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";

export class AccountMongoRepository implements UsuarioRepository {
  async criar(usuario: usuarioCustomizado): Promise<Usuario> {
    const colecaoUsuario = MongoHelper.getCollection("usuarios");
    const resultado = await colecaoUsuario.insertOne(usuario);
    const novoUsuario = { id: resultado.insertedId.toString(), ...usuario };
    return novoUsuario;
  }
}
