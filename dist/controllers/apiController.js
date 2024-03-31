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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const courseHandlers_1 = __importDefault(require("../courseHandlers"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
const TEMP_PARAMS = {
    date: "04-01-2024",
};
router.get("/tee-times", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    const params = { date };
    const fetchTeeTimesForCourse = (handler) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resp = yield handler.fetchTeeTimes(handler.formatParams(params));
            const formattedResponse = handler.formatResponse(resp);
            return {
                courseId: handler.id,
                courseName: handler.name,
                bookLink: handler.bookLink,
                courseImage: handler.image,
                teeTimes: formattedResponse,
            };
        }
        catch (e) {
            console.error(e);
            return {
                courseId: handler.id,
                courseName: handler.name,
                bookLink: handler.bookLink,
                courseImage: handler.image,
                error: `Failed to fetch tee times for ${handler.name}`,
            };
        }
    });
    const courseIds = Object.keys(courseHandlers_1.default);
    const teeTimesByCourse = yield Promise.all(courseIds.map((courseId) => {
        const handler = courseHandlers_1.default[courseId];
        return fetchTeeTimesForCourse(handler);
    }));
    const response = teeTimesByCourse.reduce((acc, course) => {
        acc[course.courseId] = course;
        return acc;
    }, {});
    res.send(response);
}));
router.get("/unicorn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const handler = courseHandlers_1.default.unicorn;
    try {
        const response = yield handler.fetchTeeTimes(handler.formatParams(TEMP_PARAMS));
        console.log(response);
        const teeTimes = handler.formatResponse(response);
        res.send(teeTimes);
    }
    catch (e) {
        res.send(e.response.data);
    }
}));
router.get("/sagamore-spring", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const handler = courseHandlers_1.default.sagamoreSpring;
    try {
        const response = yield handler.fetchTeeTimes(handler.formatParams(TEMP_PARAMS));
        console.log(response);
        const teeTimes = handler.formatResponse(response);
        res.send(teeTimes);
    }
    catch (e) {
        res.send(e.response.data);
    }
}));
exports.default = router;
//# sourceMappingURL=apiController.js.map