import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Deve passar os valores correto para Bcrypt", async () => {
    const controller = makeSut();
    const hahsSpy = jest.spyOn(bcrypt, "hash");
    await controller.criptografar("any_value");
    expect(hahsSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Deve retorna a hash  caso tive correto", async () => {
    const controller = makeSut();
    const hash = await controller.criptografar("any_value");
    expect(hash).toBe("hash");
  });
});
