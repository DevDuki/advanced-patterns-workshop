import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Equal, Expect } from "../helpers/type-utils";

const app = express();

/**
 * This time we looked into express' types and used it to make a type safe get request, where query parameters are alrdy specified,
 * without needing to use any type annotation when using the "makeTypeSafeGet" function.
 */
const makeTypeSafeGet =
  <TQuery extends Request['query']>(
    parser: (queryParams: Request["query"]) => TQuery,
    handler: RequestHandler<any, any, any, TQuery>
  ) =>
  (req: Request<any, any, any, TQuery>, res: Response, next: NextFunction) => {
    try {
      parser(req.query);
    } catch (e) {
      res.status(400).send("Invalid query: " + (e as Error).message);
      return;
    }

    return handler(req, res, next);
  };

const getUser = makeTypeSafeGet(
  (query) => {
    if (typeof query.id !== "string") {
      throw new Error("You must pass an id");
    }

    return {
      id: query.id,
    };
  },
  (req, res) => {
    // req.query should be EXACTLY the type returned from
    // the parser above
    type tests = [Expect<Equal<typeof req.query, { id: string }>>];

    res.json({
      id: req.query.id,
      name: "Matt",
    });
  }
);

app.get("/user", getUser);
