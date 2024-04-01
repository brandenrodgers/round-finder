"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "crystalLake";
const NAME = "Crystal Lake Golf Club";
const IMAGE = "https://www.crystallake-golf.com/wp-content/uploads/sites/7086/2018/08/Home-page-pic-1.jpg";
const FACILITY_ID = 13676;
const FACILITY_ALIAS = "crystal-lake-golf";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
});
//# sourceMappingURL=crystalLake.js.map