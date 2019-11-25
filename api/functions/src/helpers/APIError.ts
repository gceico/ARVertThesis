import * as httpStatus from 'http-status'

class APIError extends Error {
    status: number | undefined = httpStatus.INTERNAL_SERVER_ERROR

    constructor(message: string, status: number | undefined = httpStatus.INTERNAL_SERVER_ERROR) {
        super(message);
        this.status = status
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export default APIError
