"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phxApi_1 = require("../utils/phxApi");
const ID = "unicorn";
const NAME = "Unicorn Golf Course";
const IMAGE = "https://www.unicorngc.com/wp-content/uploads/sites/7265/2019/01/slider2.jpg";
const RANK = 2;
const FACILITY_ID = 13988;
const FACILITY_ALIAS = "unicorn-golf-course";
exports.default = (0, phxApi_1.makePHXHandler)({
    facilityAlias: FACILITY_ALIAS,
    facilityId: FACILITY_ID,
    id: ID,
    image: IMAGE,
    name: NAME,
    rank: RANK,
});
//# sourceMappingURL=unicorn.js.map