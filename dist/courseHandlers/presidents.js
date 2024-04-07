"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "presidents";
const NAME = "Presidents Golf Course";
const IMAGE = "https://www.presidentsgc.com/wp-content/uploads/sites/7480/2019/05/page-slider-pic02.jpg";
const RANK = 8;
const FACILITY_ID = 17943;
const FACILITY_ALIAS = "presidents-golf-course";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
    rank: RANK,
});
//# sourceMappingURL=presidents.js.map