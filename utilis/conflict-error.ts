class ConflictError extends Error {
  status: number;
  constructor(message: any) {
    super(message);
    this.name = "ConflictError";
    this.message = message;
    this.status = 409;
  }
}

export default ConflictError;
