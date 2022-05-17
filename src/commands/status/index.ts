import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";
import {
  getPinStatus,
  getStorageProviders,
  parseDate,
  parseSize,
} from "../../utils/parsers";

export default class Status extends AuthenticatedCommand {
  static description: string | undefined = "Check the status of an upload";

  static args?: ArgInput | undefined = [
    {
      name: "cid",
      description: "The CID of the upload to check the status of",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Status);
    const { cid } = args;
    const client = this.client;

    const spinner = ora("Fetching status...").start();

    try {
      const status = await client.status(cid);

      if (!status) {
        spinner.fail("No status for the given CID found");
        return;
      }

      spinner.succeed("Fetched status");

      this.log(chalk.cyan("Created At:"), parseDate(status.created));
      this.log(chalk.cyan("Size:"), parseSize(status.dagSize));
      this.log(chalk.cyan("Pin Status:"), getPinStatus(status));
      this.log(
        chalk.cyan("Storage Providers:"),
        getStorageProviders(status).join(", ")
      );
    } catch (error) {
      spinner.fail("Failed to fetch status");
      this.error(chalk.red(error));
    }
  }
}
