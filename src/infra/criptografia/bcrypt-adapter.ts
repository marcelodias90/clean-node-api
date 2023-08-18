import bcrypt from "bcrypt";

import { Criptografar } from "../../data/protocols/encrypter";

export class BcryptAdapter implements Criptografar {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }
  async criptografar(valor: string): Promise<string> {
    const hash = await bcrypt.hash(valor, this.salt);
    return hash;
  }
}
