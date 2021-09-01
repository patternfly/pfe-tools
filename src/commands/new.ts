import {Command, flags} from '@oclif/command'
import * as yeoman from "yeoman-environment";
import { resolve } from "path";

const env = yeoman.createEnv();
const generatorPath = resolve(__dirname, "../generators/patternfly-element-generator");
env.register(generatorPath, "pfe:component");

export default class New extends Command {
  static description = 'Create a new web component'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    env.run("pfe:component");
  }
}
