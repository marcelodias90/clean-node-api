import { EmailValidator } from "../presentation/protocols/email-validator";

export class ValidarEmailAdaptado implements EmailValidator {
  valida(email: string): boolean {
    return false;
  }
}
