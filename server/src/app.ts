import express, { Application } from "express";
import { PortType } from "./types/types";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { UserRouter } from "./routers/userRouter";
import { connect, connection } from "mongoose";
import { DatabaseConnectionURL } from "./constants/constants";

class App {
	private app: Application = express();
	private port: PortType = process.env.PORT || 8080;

	private setMiddlewares() {
		this.app.use(
			cors({
				origin: ["http://localhost:3000"],
				credentials: true,
			})
		);
		this.app.use(cookieParser());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.use(morgan("common"));
	}
	private addRouters() {
		this.app.use("/user", UserRouter);
	}

	private openDatabaseConnection() {
		connect(DatabaseConnectionURL)
			.then(() => {
				// connection.db.dropDatabase();
				console.log("Successfully Connected To The Database");
			})
			.catch(() => {
				console.log("DB Connection Failed");
			});
	}

	private runServer() {
		this.app.listen(this.port, () =>
			console.log(`listening on port ${this.port}`)
		);
	}

	public constructor() {
		this.openDatabaseConnection();
		this.setMiddlewares();
		this.addRouters();
		this.runServer();
	}
}

new App();
