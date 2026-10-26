import {
  isNewPasswordValid,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "./account-forms";

const SIGN_UP_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const isSignUpEmailValid = (email: string) => SIGN_UP_EMAIL.test(email);

// Cadastro e login usam os mesmos limites da troca de senha.
export const isSignUpPasswordValid = (password: string) =>
  isNewPasswordValid(password);

export const PASSWORD_RULE_TEXT = `Entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres`;

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
      message: `A senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres.`,
    };
  }

  return { success: true };
};
