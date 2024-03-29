"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const unicorn_1 = require("../courseHandlers/unicorn");
const sagamoreSpring_1 = require("../courseHandlers/sagamoreSpring");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
router.use(express_1.default.json());
router.get("/tee-times", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        date: "2024-03-28",
    };
    const fetchTeeTimesForCourse = (handler) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield handler.fetchTeeTimes(handler.formatParams(params));
            const formattedResponse = handler.formatResponse(resp);
            return formattedResponse;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    });
    const courseIds = Object.keys(constants_1.COURSE_HANDLERS);
    const responses = yield Promise.all(courseIds.map((courseId) => {
        const { handler } = constants_1.COURSE_HANDLERS[courseId];
        return fetchTeeTimesForCourse(handler);
    }));
    console.log(responses);
    res.send(responses.flat());
}));
router.get("/unicorn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, unicorn_1.fetchTeeTimes)({ date: "2024-03-28" });
        console.log(response);
        res.send(response[0]);
    }
    catch (e) {
        res.send(e.response.data);
    }
}));
router.get("/sagamore-spring", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, sagamoreSpring_1.fetchTeeTimes)({ date: "03-28-2024" });
        console.log(response);
        res.send(response);
    }
    catch (e) {
        res.send(e.response.data);
    }
}));
exports.default = router;
//# sourceMappingURL=apiController.js.map