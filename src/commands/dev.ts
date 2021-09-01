import {Command, flags} from '@oclif/command'
import Build from "./build";

export default class Dev extends Command {
  static description = 'Dev runs the build script with a watcher'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    process.env.WATCH = "true";
    await Build.run();
  }
}
