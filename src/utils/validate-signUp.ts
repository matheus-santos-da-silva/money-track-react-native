import { PASSWORD_MIN_LENGTH } from "./account-forms";

const SIGN_UP_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const isSignUpEmailValid = (email: string) => SIGN_UP_EMAIL.test(email);

export const isSignUpPasswordValid = (password: string) =>
  password.length >= PASSWORD_MIN_LENGTH;

export const validateData = (
  email: string,
  password: string
): { success: boolean; message?: string } => {
  if (!isSignUpEmailValid(email)) {
    return {
      success: false,
      message: "Formato de email inválido, tente novamente!",
    };
  }

  if (!isSignUpPasswordValid(password)) {
    return {
      success: false,
      message: "A senha precisa conter pelo menos 7 caracteres",
    };
  }

  return { success: true };
};
