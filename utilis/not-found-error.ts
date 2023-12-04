class NotFoundError extends Error {
    status: number
    constructor(entity: any) {
      super()
      this.name = 'NotFoundError'
      this.message = `${entity} not found`
      this.status = 404
    }
  }
  export default NotFoundError