import { validateEmail } from "./validate-email";

// Mesmos limites do users-service (create-user-DTO, update-user-DTO e
// update-password-DTO): mudar aqui exige mudar lá.
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;

// Mesmos caracteres que o users-service aceita no nome.
const NAME_CHARACTERS = /^[a-zA-ZÀ-ÿ\s'-]+$/;

export const nameError = (name: string): string | null => {
  const trimmed = name.trim();

  if (trimmed.length < NAME_MIN_LENGTH || trimmed.length > NAME_MAX_LENGTH) {
    return `O nome deve ter entre ${NAME_MIN_LENGTH} e ${NAME_MAX_LENGTH} caracteres.`;
  }

  if (!NAME_CHARACTERS.test(trimmed)) {
    return "Use apenas letras, espaços, apóstrofo ou hífen.";
  }

  return null;
};

// Campo vazio não mostra erro: só depois que a pessoa digita algo.
export const emailError = (email: string): string | null =>
  email.trim() !== "" && !validateEmail(email.trim())
    ? "Digite um e-mail válido."
    : null;

export const canSaveProfile = (
  form: { name: string; email: string },
  original: { name: string; email: string }
) => {
  const name = form.name.trim();
  const email = form.email.trim();
  const changed = name !== original.name || email !== original.email;

  return changed && !nameError(name) && validateEmail(email);
};

export const isNewPasswordValid = (password: string) =>
  password.length >= PASSWORD_MIN_LENGTH &&
  password.length <= PASSWORD_MAX_LENGTH;

export const confirmationError = (password: string, confirmation: string) =>
  confirmation !== "" && confirmation !== password
    ? "As senhas não coincidem."
    : null;

export const canUpdatePassword = (
  current: string,
  password: string,
  confirmation: string
) =>
  current !== "" && isNewPasswordValid(password) && confirmation === password;
