"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTeeTimes = void 0;
const axios_1 = __importDefault(require("axios"));
const SAGAMORE_SPRING_API_PATH = "https://foreupsoftware.com/index.php/api/booking/times?booking_class=48598&schedule_id=6834&schedule_ids%5B%5D=6834&specials_only=0&api_key=no_limits";
const fetchTeeTimes = (_a) => __awaiter(void 0, [_a], void 0, function* ({ date, holes = "all", players, time = "all", }) {
    const { data } = yield axios_1.default.get(SAGAMORE_SPRING_API_PATH, {
        params: { date, holes, players, time },
    });
    return data;
});
exports.fetchTeeTimes = fetchTeeTimes;
//# sourceMappingURL=sagamoreSpring.js.map