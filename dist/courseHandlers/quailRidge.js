"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "quailRidge";
const NAME = "Quail Ridge Country Club";
const IMAGE = "https://golf-pass.brightspotcdn.com/dc/70/418aaacafeab50cbbc1e37793864/53638.jpg";
const FACILITY_ID = 13011;
const FACILITY_ALIAS = "quailridge-country-club";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
});
//# sourceMappingURL=quailRidge.js.map