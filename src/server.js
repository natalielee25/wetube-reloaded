require("dotenv").config();
import express from "express";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo"
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import {localsMiddleware} from "./middlewares";


console.log (process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: "Hello",
    resave:false,
    saveUnitialized:false,
    store: MongoStore.create ({mongoUrl: 
        "mongodb://127.0.0.1:27017/wetube"}),
    })
);
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;