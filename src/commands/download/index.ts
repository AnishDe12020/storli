import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import { outputFile } from "fs-extra";
import ora from "ora";
import AuthenticatedCommand from "../../lib/authenticated-command";

export default class Download extends AuthenticatedCommand {
  static description = "Download files from an upload";

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

    const spinner = ora("Downloading files...").start();

    try {
      const upload = await client.get(cid);
      if (!upload) {
        spinner.fail("No upload found with the given CID");
        return;
      }

      if (!upload.ok) {
        spinner.fail("No upload found with the given CID");
        return;
      }

      const files = await upload.files();

      if (files.length === 0) {
        spinner.fail("No files found");
        return;
      }

      spinner.succeed(
        `Found ${files.length} ${files.length === 1 ? "file" : "files"}`
      );
      await Promise.all(
        files.map(async file => {
          const spinner = ora(`Writing ${file.name} to disk`).start();
          try {
            const buffer = Buffer.from(await file.arrayBuffer());
            await outputFile(cid + "/" + file.name, buffer);
            spinner.succeed(`Wrote ${chalk.cyan(file.name)} to disk`);
          } catch (error) {
            spinner.fail(`Failed to write ${chalk.cyan(file.name)} to disk`);
            this.error(chalk.red(error));
          }
        })
      );
    } catch (error) {
      spinner.fail("Failed to retrieve files");
      this.error(chalk.red(error));
    }
  }
}
