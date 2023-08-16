export class CampoInvalidoError extends Error {
  constructor(paramName: string) {
    super(`campo inválido: ${paramName}`);
    this.name = "emailInvalidoError";
  }
}
