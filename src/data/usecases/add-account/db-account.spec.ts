import { Criptografar } from "../../protocols/encrypter";
import { AdicionarUsuarioDB } from "../db-add-account";

interface SutTypes {
  criptografarSenha: Criptografar;
  addUsuarioDB: AdicionarUsuarioDB;
}

const criptografia = (): Criptografar => {
  class CriptografarSenha implements Criptografar {
    async criptografar(valor: string): Promise<string> {
      return new Promise((resolve) => resolve("senha_criptografada"));
    }
  }
  return new CriptografarSenha();
};

const controller = (): SutTypes => {
  const criptografarSenha = criptografia();
  const addUsuarioDB = new AdicionarUsuarioDB(criptografarSenha);
  return {
    criptografarSenha,
    addUsuarioDB,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Deve ser enviado a senha correta para o metodo", async () => {
    const { criptografarSenha, addUsuarioDB } = controller();
    const senhaCriptografada = jest.spyOn(criptografarSenha, "criptografar");
    const ususario = {
      nome: "valid_nome",
      email: "valid_email",
      senha: "valid_senha",
    };
    await addUsuarioDB.criar(ususario);
    expect(senhaCriptografada).toHaveBeenCalledWith("valid_senha");
  });
});
