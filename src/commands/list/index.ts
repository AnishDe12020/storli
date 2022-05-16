import Table from "cli-table";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";

export default class List extends AuthenticatedCommand {
  static description: string | undefined = "List all files uploaded to IPFS";

  async run(): Promise<void> {
    const spinner = ora("Retrieving...").start();

    try {
      const uploads = [];
      const client = this.client;
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
