export const isValidEmail = (value) => {
  return /\S+@\S+\.\S+/.test(value);
};

export const isStrongPassword = (value) => {
  return value.length >= 8;
};
