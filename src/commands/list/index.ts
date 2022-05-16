import { ArgInput } from "@oclif/core/lib/interfaces";
import Table from "cli-table";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";
import { parseDate, parseSize } from "../../utils/parsers";

export default class List extends AuthenticatedCommand {
  static description: string | undefined = "List all files uploaded to IPFS";

  static aliases: string[] = ["ls"];

  static args?: ArgInput | undefined = [
    {
      name: "cid",
      required: false,
      description: "CID of the upload to list",
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(List);
    const client = this.client;

    if (args.cid) {
      const { cid } = args;
      const spinner = ora("Fetching upload").start();
      const upload = await client.get(cid);
      if (!upload) {
        spinner.fail("Upload not found");
        return;
      }

      spinner.text = "Fetching files";
      const files = await upload.files();
      spinner.succeed("Fetched files successfully");
      const filesTable = new Table({
        head: ["Name", "Size", "Last Modified", "CID"],
      });

      for (const file of files) {
        const { name, size, lastModified, cid } = file;
        filesTable.push([name, parseSize(size), parseDate(lastModified), cid]);
      }

      this.log(filesTable.toString());
    } else {
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
}
