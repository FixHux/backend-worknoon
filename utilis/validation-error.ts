class ValidationError extends Error {
    status: number;
    constructor(message: any) {
        super(message);
        this.name = 'ValidationError';
        this.message = message;
        this.status = 400;
    }
}

export default ValidationError;