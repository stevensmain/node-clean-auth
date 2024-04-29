import { connect } from "mongoose";

interface Options {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options;
    try {
      await connect(mongoUrl, {
        dbName,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.log("Mongo database connection error");
      throw error;
    }
  }
}
