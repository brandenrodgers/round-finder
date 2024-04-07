"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foreupsoftwareApi_1 = require("../utils/foreupsoftwareApi");
const ID = "mountHood";
const NAME = "Mount Hood Golf Course";
const IMAGE = "http://www.mthoodgolfclub.com/images/speasyimagegallery/albums/1/images/mthood-course-51.jpg";
const RANK = 3;
const BOOKING_CLASS = 13480;
const BOOKING_ID = 22108;
const SCHEDULE_ID = 9885;
exports.default = (0, foreupsoftwareApi_1.makeForeupsoftwareHandler)({
    bookingClass: BOOKING_CLASS,
    bookingId: BOOKING_ID,
    image: IMAGE,
    id: ID,
    name: NAME,
    rank: RANK,
    scheduleId: SCHEDULE_ID,
});
//# sourceMappingURL=mountHood.js.map