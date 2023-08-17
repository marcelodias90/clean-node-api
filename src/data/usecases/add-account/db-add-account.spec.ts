import {
  Criptografar,
  usuarioCustomizado,
  Usuario,
  UsuarioRepository,
} from "./db-add-account-protocols";
import { AdicionarUsuarioDB } from "./db-add-account";

interface SutTypes {
  criptografarSenha: Criptografar;
  addUsuarioDB: AdicionarUsuarioDB;
  usuarioRepo: UsuarioRepository;
}

const usuarioRepository = (): UsuarioRepository => {
  class usuarioRepo implements UsuarioRepository {
    async criar(usuario: usuarioCustomizado): Promise<Usuario> {
      const falsoUsuario = {
        id: "valid_id",
        nome: "valid_nome",
        email: "valid_email",
        senha: "senha_criptografada",
      };
      return new Promise((resolve) => resolve(falsoUsuario));
    }
  }
  return new usuarioRepo();
};

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
  const usuarioRepo = usuarioRepository();
  const addUsuarioDB = new AdicionarUsuarioDB(criptografarSenha, usuarioRepo);
  return {
    criptografarSenha,
    addUsuarioDB,
    usuarioRepo,
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

  test("Deve lançar uma exceção se o metodo lançar uma exceção", async () => {
    const { criptografarSenha, addUsuarioDB } = controller();
    jest
      .spyOn(criptografarSenha, "criptografar")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const ususario = {
      nome: "valid_nome",
      email: "valid_email",
      senha: "valid_senha",
    };
    const promise = addUsuarioDB.criar(ususario);
    await expect(promise).rejects.toThrow();
  });

  test("Deve ser enviado a AddAccountRepository os dados corretos", async () => {
    const { usuarioRepo, addUsuarioDB } = controller();
    const addSpy = jest.spyOn(usuarioRepo, "criar");
    const ususario = {
      nome: "valid_nome",
      email: "valid_email",
      senha: "valid_senha",
    };
    await addUsuarioDB.criar(ususario);
    expect(addSpy).toHaveBeenCalledWith({
      nome: "valid_nome",
      email: "valid_email",
      senha: "senha_criptografada",
    });
  });

  test("Deve lançar uma exceção se o metodo lançar uma exceção", async () => {
    const { usuarioRepo, addUsuarioDB } = controller();
    jest
      .spyOn(usuarioRepo, "criar")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const ususario = {
      nome: "valid_nome",
      email: "valid_email",
      senha: "valid_senha",
    };
    const promise = addUsuarioDB.criar(ususario);
    await expect(promise).rejects.toThrow();
  });

  test("Deve retorna o usuário se tudo estiver correto", async () => {
    const { addUsuarioDB } = controller();

    const ususario = {
      nome: "valid_nome",
      email: "valid_email",
      senha: "valid_senha",
    };
    const usuario = await addUsuarioDB.criar(ususario);
    expect(usuario).toEqual({
      id: "valid_id",
      nome: "valid_nome",
      email: "valid_email",
      senha: "senha_criptografada",
    });
  });
});
