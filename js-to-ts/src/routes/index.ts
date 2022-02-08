import express, {Request, Response, NextFunction} from 'express';
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send("This is the index page");
});

export default router;
