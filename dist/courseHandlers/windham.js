"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "windham";
const NAME = "Windham Country Club";
const IMAGE = "https://images.newhampshiregolf.com/courselarge/windhamcc-large.jpg";
const FACILITY_ID = 15931;
const FACILITY_ALIAS = "windham-country";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
});
//# sourceMappingURL=windham.js.map