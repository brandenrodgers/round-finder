"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateParts = exports.padDatePart = void 0;
const padDatePart = (datePart) => datePart.toString().padStart(2, "0");
exports.padDatePart = padDatePart;
const getDateParts = (date) => {
    const formattedDate = new Date(date);
    const month = formattedDate.getUTCMonth() + 1; // months from 1-12
    const day = formattedDate.getUTCDate();
    const year = formattedDate.getUTCFullYear();
    return { month, day, year };
};
exports.getDateParts = getDateParts;
//# sourceMappingURL=time.js.map