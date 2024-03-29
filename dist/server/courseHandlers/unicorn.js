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
exports.formatResponse = exports.formatParams = exports.fetchTeeTimes = void 0;
const axios_1 = __importDefault(require("axios"));
const time_1 = require("../utils/time");
const constants_1 = require("../constants");
const UNICORN_API_PATH = "https://phx-api-be-east-1b.kenna.io/v2/tee-times?facilityIds=13988";
const fetchTeeTimes = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(UNICORN_API_PATH, {
        headers: { "X-Be-Alias": "unicorn-golf-course" },
        params,
    });
    return data;
});
exports.fetchTeeTimes = fetchTeeTimes;
const formatParams = (params) => {
    const { year, month, day } = (0, time_1.getDateParts)(params.date);
    return {
        date: `${year}-${(0, time_1.padDatePart)(month)}-${(0, time_1.padDatePart)(day)}`,
    };
};
exports.formatParams = formatParams;
const formatResponse = (resp) => {
    if (resp && resp[0] && resp[0].teetimes) {
        return resp[0].teetimes.map((teeTime) => {
            return {
                courseName: constants_1.COURSE_HANDLERS.unicorn.label,
                availablePlayers: 4 - teeTime.bookedPlayers,
                time: teeTime.teetime,
            };
        });
    }
    return [];
};
exports.formatResponse = formatResponse;
//# sourceMappingURL=unicorn.js.map