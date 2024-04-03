"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foreupsoftwareApi_1 = require("../utils/foreupsoftwareApi");
const ID = "brookline";
const NAME = "Brookline Golf Course";
const IMAGE = "https://golf.com/wp-content/uploads/2022/06/tcc-18.jpg";
const RANK = 9;
const BOOKING_CLASS = 7275;
const BOOKING_ID = 19865;
const SCHEDULE_ID = 2748;
exports.default = (0, foreupsoftwareApi_1.makeForeupsoftwareHandler)({
    bookingClass: BOOKING_CLASS,
    bookingId: BOOKING_ID,
    image: IMAGE,
    id: ID,
    name: NAME,
    rank: RANK,
    scheduleId: SCHEDULE_ID,
});
//# sourceMappingURL=brookline.js.map