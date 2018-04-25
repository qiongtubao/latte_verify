export default class ConfigError extends Error {
  constructor(message, ...args) {
    super(message);
  }
}