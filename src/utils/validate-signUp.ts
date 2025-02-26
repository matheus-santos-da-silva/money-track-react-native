export const validateData = (
  email: string,
  password: string
): { success: boolean; message?: string } => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return {
      success: false,
      message: "Formato de email inválido, tente novamente!",
    };
  }

  if (password.length < 7) {
    return {
      success: false,
      message: "A senha precisa conter pelo menos 7 caracteres",
    };
  }

  return { success: true };
};
