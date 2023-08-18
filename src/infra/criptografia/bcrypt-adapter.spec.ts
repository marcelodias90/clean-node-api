import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

describe("Bcrypt Adapter", () => {
  test("Deve passar os valores correto para Bcrypt", async () => {
    const salt = 12;
    const controller = new BcryptAdapter(salt);
    const hahsSpy = jest.spyOn(bcrypt, "hash");
    await controller.criptografar("any_value");
    expect(hahsSpy).toHaveBeenCalledWith("any_value", salt);
  });
});
