"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, messaage) {
        super(messaage);
        this.status = status;
        this.message = messaage;
    }
}
exports.default = HttpException;
//# sourceMappingURL=httpException.js.map