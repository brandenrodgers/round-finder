import express, { Response, Request, Router } from "express";
import { TeeTime } from "../types/TeeTime";
import { Handler } from "../types/Handler";
import courseHandlers from "../courseHandlers";

const router = Router();

router.use(express.json());

const TEMP_PARAMS = {
  date: "04-01-2024",
};

router.get("/tee-times", async (req: Request, res: Response) => {
  const { date } = req.query;

  const params = { date } as { date: string };

  const fetchTeeTimesForCourse = async (
    handler: Handler
  ): Promise<Array<TeeTime>> => {
    try {
      const resp = await handler.fetchTeeTimes(handler.formatParams(params));
      const formattedResponse = handler.formatResponse(resp);
      return formattedResponse;
    } catch (e: any) {
      console.log(e);
      return [];
    }
  };

  const courseIds = Object.keys(courseHandlers) as Array<
    keyof typeof courseHandlers
  >;

  const responses: Array<Array<TeeTime>> = await Promise.all<Array<TeeTime>>(
    courseIds.map((courseId) => {
      const handler = courseHandlers[courseId];
      return fetchTeeTimesForCourse(handler as Handler);
    })
  );

  res.send(responses.flat());
});

router.get("/unicorn", async (req: Request, res: Response) => {
  const handler = courseHandlers.unicorn;
  try {
    const response = await handler.fetchTeeTimes(
      handler.formatParams(TEMP_PARAMS)
    );
    console.log(response);
    const teeTimes = handler.formatResponse(response);
    res.send(teeTimes);
  } catch (e: any) {
    res.send(e.response.data);
  }
});

router.get("/sagamore-spring", async (req: Request, res: Response) => {
  const handler = courseHandlers.sagamoreSpring;
  try {
    const response = await handler.fetchTeeTimes(
      handler.formatParams(TEMP_PARAMS)
    );
    console.log(response);
    const teeTimes = handler.formatResponse(response);
    res.send(teeTimes);
  } catch (e: any) {
    res.send(e.response.data);
  }
});

export default router;
