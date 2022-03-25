export const isValidEmail = (email: string): boolean => {
  const match = String(email).toLowerCase().match(emailPattern);

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : "El correo no parece ser válido";
};

export const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
