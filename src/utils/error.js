class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

exports.AuthError = AuthError;
