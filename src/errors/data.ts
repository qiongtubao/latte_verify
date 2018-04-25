export default class DataError extends Error {
  constructor(message, ...args) {
    super(message)
  }
};