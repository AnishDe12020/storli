import { Command } from "@oclif/core";
import chalk from "chalk";
import Table from "cli-table";
import Conf from "conf/dist/source";
import ora from "ora";
import { Web3Storage } from "web3.storage";

export default class List extends Command {
  static description: string | undefined = "List all files uploaded to IPFS";

  async run(): Promise<void> {
    const userConf = new Conf({ projectSuffix: "cli" });

    if (!userConf.get("web3StorageAPIToken")) {
      this.error(
        chalk.red(
          "Please set a web3.storage API token. Run `storli config` to do so."
        )
      );
    }

    const web3StorageAPIToken = userConf.get("web3StorageAPIToken");

    const client = new Web3Storage({ token: web3StorageAPIToken as string });

    const spinner = ora("Retrieving...").start();

    try {
      const uploads = [];
      for await (const upload of client.list()) {
        uploads.push(upload);
      }

      spinner.succeed("Retrieved");

      const uploadsTable = new Table({
        head: ["Name", "CID", "Size", "Created At"],
      });

      for (const upload of uploads) {
        uploadsTable.push([
          upload.name,
          upload.cid,
          upload.dagSize,
          upload.created,
        ]);
      }

      this.log(uploadsTable.toString());
    } catch (error) {
      spinner.fail("Failed");
      console.log(error);
    }
  }
}
