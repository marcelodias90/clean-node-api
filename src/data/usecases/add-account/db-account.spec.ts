import { AdicionarUsuarioDB } from "../db-add-account";

describe("DbAddAccount Usecase", () => {
  test("Deve ser enviado a senha correta para o metodo", async () => {
    class CriptografarSenha {
      async criptografar(valor: string): Promise<string> {
        return new Promise((resolve) => resolve("senha_criptografada"));
      }
    }
    const criptografarSenha = new CriptografarSenha();
    const addUsuarioDB = new AdicionarUsuarioDB(criptografarSenha);
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
