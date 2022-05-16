import { Command } from "@oclif/core";
import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import Conf from "conf";
import { getFilesFromPath } from "web3.storage";

export default class Upload extends Command {
  static description = "Upload a file to IPFS";

  static args?: ArgInput | undefined = [
    {
      name: "filePath",
      description: "Filepath of the file to upload (can also be a directory)",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const userConf = new Conf({ projectSuffix: "cli" });

    if (!userConf.get("web3StorageAPIToken")) {
      this.error(
        chalk.red(
          "Please set a web3.storage API token. Run `storli config` to do so."
        )
      );
    }

    const { args } = await this.parse(Upload);
    const { filePath } = args;
    const files = await getFilesFromPath(filePath);
    console.log(files);
  }
}
