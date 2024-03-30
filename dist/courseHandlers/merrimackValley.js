"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "merrimackValley";
const NAME = "Merrimack Valley Golf Club";
const IMAGE = "https://exddilid.cdn.imgeng.in/app/courses/image/preview/42924.jpg";
const FACILITY_ID = 16619;
const FACILITY_ALIAS = "merrimack-valley-golf-club";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
});
//# sourceMappingURL=merrimackValley.js.map