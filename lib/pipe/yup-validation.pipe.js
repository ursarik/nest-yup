"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YupValidationPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
/**
 * Handle Error Message
 * @param err
 */
const serializeValidationError = (err) => {
    const invalid = err.inner.map(({ path, message }) => ({
        path,
        message,
    }));
    return invalid;
};
let YupValidationPipe = class YupValidationPipe {
    constructor(options = {}) {
        this.validationOptions = { abortEarly: true };
        this.validationOptions = Object.assign(this.validationOptions, options);
    }
    async transform(value, { metatype }) {
        const { schema } = metatype === null || metatype === void 0 ? void 0 : metatype.prototype;
        if (!schema)
            return value;
        try {
            return await schema.validate(value, this.validationOptions);
        }
        catch (err) {
            throw new common_1.BadRequestException(serializeValidationError(err));
        }
    }
};
YupValidationPipe = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [Object])
], YupValidationPipe);
exports.YupValidationPipe = YupValidationPipe;
