"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const timed_cache_1 = __importDefault(require("timed-cache"));
// 3 minute TTL
exports.cache = new timed_cache_1.default({ defaultTtl: 180 * 1000 });
//# sourceMappingURL=cache.js.map