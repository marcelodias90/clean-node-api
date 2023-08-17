import { Criptografar } from "../../protocols/encrypter";
import { AdicionarUsuarioDB } from "../db-add-account";

interface SutTypes {
  criptografarSenha: Criptografar;
  addUsuarioDB: AdicionarUsuarioDB;
}

const controller = (): SutTypes => {
  class CriptografarSenha {
    async criptografar(valor: string): Promise<string> {
      return new Promise((resolve) => resolve("senha_criptografada"));
    }
  }
  const criptografarSenha = new CriptografarSenha();
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