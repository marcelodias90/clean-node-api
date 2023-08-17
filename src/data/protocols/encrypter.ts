export interface Criptografar {
  criptografar(valor: string): Promise<string>;
}
