class UnprocessableError extends Error {
    status: number
    constructor(message: any) {
      super(message)
      this.name = 'UnprocessableError'
      this.message = message
      this.status = 422
    }
  }
  
  export default UnprocessableError