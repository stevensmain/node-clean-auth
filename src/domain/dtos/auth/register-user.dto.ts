import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): [string?, RegisterUserDto?] {
    const error = this.validate({ name, email, password });
    if (error) return [error, undefined];
    return [undefined, new RegisterUserDto(name, email, password)];
  }

  private static validate({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): string | null {
    if (!name) return "Missing name";
    if (!email) return "Missing email";
    if (!Validators.email.test(email)) return "Invalid email";
    if (!password) return "Missing password";
    if (password.length < 8) return "Password must be at least 8 characters";

    return null;
  }
}
