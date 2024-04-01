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
exports.makeForeupsoftwareHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const time_1 = require("../utils/time");
const makeFetchTeeTimes = (bookingClass, scheduleId) => (_a) => __awaiter(void 0, [_a], void 0, function* ({ date, holes = "all", players, time = "all", }) {
    const { data } = yield axios_1.default.get(`https://foreupsoftware.com/index.php/api/booking/times?booking_class=${bookingClass}&schedule_id=${scheduleId}&schedule_ids%5B%5D=${scheduleId}&specials_only=0&api_key=no_limits`, {
        params: { date, holes, players, time },
    });
    return data;
});
const formatParams = (params) => {
    const { year, month, day } = (0, time_1.getDateParts)(params.date);
    return {
        date: `${(0, time_1.padDatePart)(month)}-${(0, time_1.padDatePart)(day)}-${year}`,
    };
};
const makeFormatResponse = (courseId, courseName) => (resp) => {
    const result = [];
    resp.forEach((teeTime) => {
        const holesArray = typeof teeTime.holes === "string" ? [9, 18] : [teeTime.holes];
        holesArray.forEach((hole) => {
            result.push({
                courseId,
                courseName,
                availablePlayers: teeTime.available_spots,
                startSide: teeTime.teesheet_side_name.toLowerCase(),
                time: {
                    hours: (0, time_1.getHoursFromDate)(teeTime.time),
                    minutes: (0, time_1.getMinutesFromDate)(teeTime.time),
                },
                holes: hole,
            });
        });
    });
    return result;
};
const makeForeupsoftwareHandler = ({ bookingClass, bookingId, id, image, name, scheduleId, }) => ({
    id,
    name,
    image,
    bookLink: `https://foreupsoftware.com/index.php/booking/${bookingId}/${scheduleId}#teetimes`,
    fetchTeeTimes: makeFetchTeeTimes(bookingClass, scheduleId),
    formatParams,
    formatResponse: makeFormatResponse(id, name),
});
exports.makeForeupsoftwareHandler = makeForeupsoftwareHandler;
//# sourceMappingURL=foreupsoftwareApi.js.map