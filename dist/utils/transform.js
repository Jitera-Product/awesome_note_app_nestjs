"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeArray = exports.serialize = void 0;
const class_transformer_1 = require("class-transformer");
function serialize(transformClass, plainObject) {
    return (0, class_transformer_1.plainToClass)(transformClass, plainObject, { excludeExtraneousValues: true });
}
exports.serialize = serialize;
function serializeArray(transformClass, plainArray) {
    return plainArray.map((object) => (0, class_transformer_1.plainToClass)(transformClass, object, { excludeExtraneousValues: true }));
}
exports.serializeArray = serializeArray;
//# sourceMappingURL=transform.js.map