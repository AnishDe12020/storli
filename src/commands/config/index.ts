import { Command } from "@oclif/core";
import chalk from "chalk";
import Conf from "conf";
import inquirer from "inquirer";

export default class Config extends Command {
  static description = "Configure the CLI";

  async run(): Promise<void> {
    const userConf = new Conf({ projectSuffix: "cli" });

    this.log("⚙️ Let us configure the CLI");

    inquirer
      .prompt([
        {
          type: "password",
          name: "web3StorageAPIToken",
          message: "What is your Web3.storage API Token?",
          default: userConf.get("web3StorageAPIToken"),
          required: true,
          mask: "*",
        },
      ])
      .then(answers => {
        userConf.set("web3StorageAPIToken", answers.web3StorageAPIToken);
      })
      .catch(error => {
        this.error(chalk.red(error));
      });
  }
}
