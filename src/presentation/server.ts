import express, { Router } from "express";

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  public start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // App routes
    this.app.use(this.routes);

    // Listen on port
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
