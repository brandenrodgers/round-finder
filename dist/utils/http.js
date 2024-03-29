"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTeeTimesForCourse = void 0;
const constants_1 = require("../constants");
const fetchTeeTimesForCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const handler = constants_1.COURSE_HANDLERS[courseId].handler;
    try {
        const response = yield handler.fetchTeeTimes(handler.formatParams(TEMP_PARAMS));
        console.log(response);
        return handler.formatResponse(response);
    }
    catch (e) {
        res.send(e.response.data);
    }
});
exports.fetchTeeTimesForCourse = fetchTeeTimesForCourse;
//# sourceMappingURL=http.js.map