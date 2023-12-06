export interface UserInput {
    email: string;
    password: string;
  }
  export interface UserInputRegister extends UserInput {
    firstName: string;
    verificationToken: string
  }