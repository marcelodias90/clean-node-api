import { HttpRequest, HttpResponse } from "./http";

export interface Controller {
  execute(httpRequest: HttpRequest): Promise<HttpResponse>;
}
