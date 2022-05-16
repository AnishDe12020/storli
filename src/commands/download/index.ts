import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import { outputFile } from "fs-extra";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default class Download extends AuthenticatedCommand {
  static description = "Download files in an upload";

  static args?: ArgInput | undefined = [
    {
      name: "cid",
      description: "The CID of the upload",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args } = await this.parse(Download);
    const { cid } = args;
    const client = this.client;

    const spinner = ora("Retrieving files...").start();

    try {
      const upload = await client.get(cid);
      if (!upload) {
        spinner.fail("No upload found");
        return;
      }

      const files = await upload.files();

      if (files.length === 0) {
        spinner.fail("No files found");
        return;
      }

      spinner.succeed(`Found ${files.length} files`);
      await Promise.all(
        files.map(async file => {
          this.log(chalk.green(`Downloading ${file.name}`));
          const buffer = Buffer.from(await file.arrayBuffer());
          await sleep(2000);
          const data = await outputFile(cid + "/" + file.name, buffer);
          this.log(chalk.green(`Downloaded ${file.name}`));
        })
      );
    } catch (error) {
      spinner.fail("Failed to retrieve files");
      this.error(chalk.red(error));
    }
  }
}
