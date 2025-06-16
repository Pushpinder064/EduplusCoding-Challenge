export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
export function validatePassword(password) {
  return /.{8,16}/.test(password) && /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password);
}
export function validateName(name) {
  return /^.{20,60}$/.test(name);
}
