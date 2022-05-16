import { Command } from "@oclif/core";
import chalk from "chalk";
import Conf from "conf";
import { Web3Storage } from "web3.storage";

export default abstract class AuthenticatedCommand extends Command {
  public userConf: Conf = new Conf({ projectSuffix: "cli" });

  get client(): Web3Storage {
    if (!this.userConf.get("web3StorageAPIToken")) {
      this.error(
        chalk.red(
          "Please set a web3.storage API token. Run `storli config` to do so."
        )
      );
    }

    const web3StorageAPIToken = this.userConf.get("web3StorageAPIToken");

    const client = new Web3Storage({ token: web3StorageAPIToken as string });

    return client;
  }
}
