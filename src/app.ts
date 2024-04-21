import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // TODO: Connection with database

  // Initialize the server
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
