export default class CodeError extends Error {
  constructor(message, ...args) {
    super(message);
  }
}