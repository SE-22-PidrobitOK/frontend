export class RegisterModelDto {
  constructor({
    firstName = '',
    lastName = '',
    email = '',
    password = '',
    isStudent = true,
  } = {}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isStudent = isStudent;
  }
}
