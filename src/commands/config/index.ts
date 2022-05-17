import { Command } from "@oclif/core";
import chalk from "chalk";
import Conf from "conf";
import inquirer from "inquirer";
import logSymbols from "log-symbols";

export default class Config extends Command {
  static description = "Configure the CLI";

  async run(): Promise<void> {
    const userConf = new Conf({ projectSuffix: "cli" });

    this.log("⚙️ Let us configure the CLI");

    this.log("===========================================================");

    this.log(chalk.dim("We use web3.storage to stored files in IPFS"));
    this.log(
      chalk.dim(
        "To get started, head over to https://web3.storage/ and create a free account"
      )
    );
    this.log(
      chalk.dim("No credit card required, you get 1 TiB of storage for free")
    );
    this.log(
      chalk.dim(
        "Next create a new API Key by heading over to https://web3.storage/tokens/"
      )
    );
    this.log(chalk.dim("Copy the API Key and paste it below"));

    this.log("===========================================================");

    inquirer
      .prompt([
        {
          type: "password",
          name: "web3StorageAPIToken",
          message: "web3.storage API Key",
          default: userConf.get("web3StorageAPIToken"),
          required: true,
          mask: "*",
        },
      ])
      .then(answers => {
        userConf.set("web3StorageAPIToken", answers.web3StorageAPIToken);
        this.log(logSymbols.success, "Successfully set API Key");
      })
      .catch(error => {
        this.error(chalk.red(error));
      });
  }
}
