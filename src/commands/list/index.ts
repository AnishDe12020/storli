import Table from "cli-table";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";
import {
  getPinStatus,
  getStorageProviders,
  parseDate,
  parseSize,
} from "../../utils/parsers";

export default class List extends AuthenticatedCommand {
  static description: string | undefined = "List all files uploaded to IPFS";

  static aliases: string[] = ["ls"];

  async run(): Promise<void> {
    const client = this.client;
    const spinner = ora("Retrieving...").start();

    try {
      const uploads = [];
      for await (const upload of client.list()) {
        uploads.push(upload);
      }

      spinner.succeed("Retrieved");

      const uploadsTable = new Table({
        head: [
          "Name",
          "CID",
          "Size",
          "Created At",
          "Pin Status",
          "Storage provider ",
        ],
      });

      for (const upload of uploads) {
        uploadsTable.push([
          upload.name,
          upload.cid,
          parseSize(upload.dagSize),
          parseDate(upload.created),
          getPinStatus(upload),
          getStorageProviders(upload),
        ]);
      }

      this.log(uploadsTable.toString());
    } catch (error) {
      spinner.fail("Failed");
      console.log(error);
    }
  }
}
