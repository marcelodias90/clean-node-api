export class emailInvalidoError extends Error {
  constructor(paramName: string) {
    super(`Email inválido: ${paramName}`);
    this.name = "emailInvalidoError";
  }
}
