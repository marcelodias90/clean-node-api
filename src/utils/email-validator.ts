import { EmailValidator } from "../presentation/protocols/email-validator";
import validator from "validator";

export class ValidarEmailAdaptado implements EmailValidator {
  valida(email: string): boolean {
    return validator.isEmail(email);
  }
}
