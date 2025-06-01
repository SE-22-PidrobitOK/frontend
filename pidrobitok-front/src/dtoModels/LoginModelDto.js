export class LoginModelDto {
  constructor({
    email = '',
    password = '',
  } = {}) {
    this.email = email;
    this.password = password;
  }
}