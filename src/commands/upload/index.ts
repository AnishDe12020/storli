import { Command, Flags } from "@oclif/core";
import { ArgInput } from "@oclif/core/lib/interfaces";
import chalk from "chalk";
import Conf from "conf";
import ora from "ora";
import { Filelike, getFilesFromPath, Web3Storage } from "web3.storage";

export default class Upload extends Command {
  static description = "Upload a file to IPFS";

  static args?: ArgInput | undefined = [
    {
      name: "filePath",
      description: "Filepath of the file to upload (can also be a directory)",
      required: true,
    },
  ];

  static flags = {
    name: Flags.string({
      char: "n",
      description:
        "Name you want to give to the upload (this is just for the purpose of seeing the upload in web3.storage, it is not stored alongside the data in IPFS)",
    }),
    dontWrapCID: Flags.boolean({
      char: "d",
      description:
        "Don't wrap the file/dir with the CID in IPFS (by default, it is wrapped)",
      default: false,
    }),
  };

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

    const { args, flags } = await this.parse(Upload);
    const { filePath } = args;
    const { name, dontWrapCID } = flags;
    const files = await getFilesFromPath(filePath);

    const client = new Web3Storage({ token: web3StorageAPIToken as string });

    const spinner = ora("Uploading...").start();

    try {
      const rootCID = await client.put(files as Iterable<Filelike>, {
        name,
        wrapWithDirectory: !dontWrapCID,
        maxRetries: 3,
      });

      spinner.succeed(chalk.green(`Uploaded files with CID: ${rootCID}`));
    } catch (error) {
      spinner.fail("Failed to upload files to IPFS :(");
      console.log(chalk.red(error));
    }
  }
}
