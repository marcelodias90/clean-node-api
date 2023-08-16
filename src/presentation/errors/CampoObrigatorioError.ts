export class CampoObrigatorioError extends Error {
  constructor(paramName: string) {
    super(`Campo Obrigatório: ${paramName}`);
    this.name = "CampoObrigatorioError";
  }
}
