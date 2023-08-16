export class ServerError extends Error {
  constructor() {
    super("Error do Servidor");
    this.name = "ServerError";
  }
}
