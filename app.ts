import express from "express";
import loggerMiddleware from "./middleware/loggerMiddleware";
import datasource from "./db/data-source";
import employeeRouter from "./routes/employee.route";
import { errorMiddleware } from "./middleware/errorMiddleware";
import authRouter from "./routes/auth.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { LoggerService } from "./services/logger.service";
import departmentRouter from "./routes/department.routes";
import cors from "cors"

// import { LoggerService } from "./services/logger.service";


const { Client } = require('pg');

const server = express();
const logger = LoggerService.getInstance('app()')


server.use(express.json());
server.use(loggerMiddleware);
server.use(cors());

server.use("/employee", authMiddleware, employeeRouter);
server.use("/department", authMiddleware, departmentRouter);
server.use("/auth",authRouter)
server.use(errorMiddleware);

server.get("/", (req, res) => {
  logger.info(req.url);
  res.status(200).send("Hello world typescript");
});


(async () => {
  try {
    await datasource.initialize();
    console.log('connected');
  }catch {
    logger.error('failed to connect to DB');
    process.exit(1);
  }
 server.listen(4000, () => {
  logger.info("server listening to 3000");
});
})
();


