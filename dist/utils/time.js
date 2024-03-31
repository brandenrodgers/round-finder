"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateParts = exports.getMinutesFromDate = exports.getHoursFromDate = exports.padDatePart = void 0;
const padDatePart = (datePart) => datePart.toString().padStart(2, "0");
exports.padDatePart = padDatePart;
const getHoursFromDate = (date) => new Date(date).getHours();
exports.getHoursFromDate = getHoursFromDate;
const getMinutesFromDate = (date) => new Date(date).getMinutes();
exports.getMinutesFromDate = getMinutesFromDate;
const getDateParts = (date) => {
    const formattedDate = new Date(date);
    const month = formattedDate.getUTCMonth() + 1; // months from 1-12
    const day = formattedDate.getUTCDate();
    const year = formattedDate.getUTCFullYear();
    return { month, day, year };
};
exports.getDateParts = getDateParts;
//# sourceMappingURL=time.js.map