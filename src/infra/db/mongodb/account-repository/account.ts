import { UsuarioRepository } from "../../../../data/protocols/add-account-repository";
import { Usuario } from "../../../../domain/models/account";
import { usuarioCustomizado } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";

export class AccountMongoRepository implements UsuarioRepository {
  async criar(usuario: usuarioCustomizado): Promise<Usuario> {
    const colecaoUsuario = MongoHelper.getCollection("usuarios");
    await colecaoUsuario.insertOne(usuario);
    return MongoHelper.map(usuario);
  }
}
