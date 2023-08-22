import app from "../config/app";
import request from "supertest";

describe("Content Type Middleware", () => {
  test("Deve retorna por padrao content type json", async () => {
    app.post("/test_content_type", (req, res) => {
      res.send();
    });
    await request(app)
      .post("/test_content_type")
      .expect("content-type", /json/);
  });

  test("Deve retorna um content type xml forçado", async () => {
    app.post("/test_content_type_xml", (req, res) => {
      res.type("xml");
      res.send();
    });
    await request(app)
      .post("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
