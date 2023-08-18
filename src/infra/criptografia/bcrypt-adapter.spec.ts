import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

describe("Bcrypt Adapter", () => {
  test("Deve passar os valores correto para Bcrypt", async () => {
    const salt = 12;
    const controller = new BcryptAdapter(salt);
    const hahsSpy = jest.spyOn(bcrypt, "hash");
    await controller.criptografar("any_value");
    expect(hahsSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Deve retorna a hash  caso tive correto", async () => {
    const salt = 12;
    const controller = new BcryptAdapter(salt);
    const hash = await controller.criptografar("any_value");
    expect(hash).toBe("hash");
  });
});
