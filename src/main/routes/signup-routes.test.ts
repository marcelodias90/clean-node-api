import app from "../config/app";
import request from "supertest";

describe("Signup Routes", () => {
  test("Deve retorna um usuario com sucesso", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        nome: "Rodrigo",
        email: "rodrigo.manguinho@gmail.com",
        senha: "123",
        confirmacaoSenha: "123",
      })
      .expect(200);
  });
});
