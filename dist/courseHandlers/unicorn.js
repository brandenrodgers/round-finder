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
const axios_1 = __importDefault(require("axios"));
const time_1 = require("../utils/time");
const ID = "unicorn";
const NAME = "Unicorn Golf Course";
const UNICORN_API_PATH = "https://phx-api-be-east-1b.kenna.io/v2/tee-times?facilityIds=13988";
const fetchTeeTimes = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(UNICORN_API_PATH, {
        headers: { "X-Be-Alias": "unicorn-golf-course" },
        params,
    });
    return data;
});
const formatParams = (params) => {
    const { year, month, day } = (0, time_1.getDateParts)(params.date);
    return {
        date: `${year}-${(0, time_1.padDatePart)(month)}-${(0, time_1.padDatePart)(day)}`,
    };
};
const formatResponse = (resp) => {
    if (resp && resp[0] && resp[0].teetimes) {
        return resp[0].teetimes.map((teeTime) => {
            return {
                courseId: ID,
                courseName: NAME,
                availablePlayers: 4 - teeTime.bookedPlayers,
                time: (0, time_1.getTimeFromDate)(teeTime.teetime),
            };
        });
    }
    return [];
};
exports.default = {
    bookLink: "https://unicorn-golf-course.book.teeitup.golf/?course=13988",
    fetchTeeTimes,
    formatParams,
    formatResponse,
    id: ID,
    name: NAME,
};
//# sourceMappingURL=unicorn.js.map