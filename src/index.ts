import express, { Express } from "express";
import cors from "cors";
import {AddressInfo} from "net";
import { userRouter } from "./routes/userRouter";
import { musicRouter } from "./routes/musicRouter";

const app: Express = express();
app.use(express.json({limit: "500mb"}));
app.use(cors());

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