"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "maynard";
const NAME = "Maynard Golf Course";
const IMAGE = "https://www.maynardgolf.com/wp-content/uploads/sites/811/2019/02/home-box01.jpg";
const RANK = 5;
const FACILITY_ID = 15974;
const FACILITY_ALIAS = "maynard-golf-course";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
    rank: RANK,
});
//# sourceMappingURL=maynard.js.map