import {Command, flags} from '@oclif/command'
import * as shell from "shelljs";
import { spawn, exec } from 'child_process';
import { resolve } from 'path';

export default class TestWatch extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    // shell.exec("npm config set group=default && npm config set element=\"*\" && web-test-runner \"elements/*/test/$npm_config_element.spec.js\" --node-resolve --playwright --watch --group=$npm_config_group", { async: true })
    const shell = spawn(
      "node",
      [resolve(__dirname, "../utilities/test.js")],
      { stdio: "inherit", shell: true, detached: true }
    );
  }
}
