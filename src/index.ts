import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AddressInfo} from "net";
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({
  limit: "500mb",
  parameterLimit: 500000000,
  extended: true
}));

app.use("/user", userRouter);
app.use("/music", musicRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});