import { MongoHelper } from "../helpers/mongo-helpers";
import { AccountMongoRepository } from "./account";

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const colecaoUsuario = MongoHelper.getCollection("usuarios");
    await colecaoUsuario.deleteMany({});
  });

  const mongoRepository = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test("Deve retorna um usuario com sucesso", async () => {
    const repository = mongoRepository();
    const usuario = await repository.criar({
      nome: "any_nome",
      email: "any_email@mail.com",
      senha: "any_senha",
    });
    expect(usuario).toBeTruthy(); //se o usuario não é nulo ou underfind
    expect(usuario.id).toBeTruthy();
    expect(usuario.nome).toBe("any_nome");
    expect(usuario.email).toBe("any_email@mail.com");
    expect(usuario.senha).toBe("any_senha");
  });
});
