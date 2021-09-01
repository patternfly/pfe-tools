const Generator = require("yeoman-generator");
const yosay = require("yosay");
const chalk = require("chalk");
const _ = require("lodash");
const fs = require("fs");
const util = require("util");
const mkdirp = require("mkdirp");
// const packageJson = require("../../package.json");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.env.options.nodePackageManager = "npm";
  }

  prompting() {
    const done = this.async();
    this.log(yosay(`Welcome to the ${chalk.red("PatternFly Elements")} generator!`));

    this.prompt([
      {
        type: "input",
        name: "name",
        message: "Element name (i.e. pfe-card)",
        validate: function(answer) {
          let parts = _.words(answer);
          if (answer.length < 1) {
            return "I get it, naming is hard; but it must have a name. You can always change it later.";
          } else if (parts.length < 2) {
            return "Elements should always have at least two parts. Check that you included the prefix for the name; for example, pfe-cta.";
          } else {
            return true;
          }
        },
        filter: function(response) {
          // Ensure it is passed to the results in kebab case
          return _.kebabCase(response);
        }
      }
    ]).then(answers => {
      if (Object.keys(answers).length > 0) {
        let name = "";

        // Trim prefixing of the name
        answers.name.split("-").forEach(part => {
          if (part !== "pfe") {
            name += part + " ";
          }
        });

        // Trim the whitespace
        name = name.trim();

        const { version: pfelementVersion } = fs.existsSync(this.destinationPath("elements/pfelement/package.json"))
          ? require(this.destinationPath("elements/pfelement/package.json"))
          : "";

        const { version: pfeSassVersion } = fs.existsSync(this.destinationPath("elements/pfe-sass/package.json"))
          ? require(this.destinationPath("elements/pfe-sass/package.json"))
          : "";

        const packageName = `@patternfly/${answers.name}`;

        this.props = {
          name: answers.name,
          elementName: answers.name,
          elementClassName: _.chain(answers.name).camelCase().upperFirst().value(),
          readmeName: _.upperFirst(name),
          lowerCaseName: name,
          camelCaseName: _.camelCase(answers.name),
          // generatorPfelementVersion: packageJson.version,
          pfelementVersion,
          pfeSassVersion,
          packageName,
        };

        mkdirp.sync(`elements/${this.props.elementName}`);
      } else {
        console.error("Prompting was exited without storing results");
      }

      console.log(this.props);

      done();
    });
  }

  writing() {
    const files = [
      {
        template: "package.json",
        path: `elements/${this.props.elementName}/package.json`
      },
      {
        template: "README.md",
        path: `elements/${this.props.elementName}/README.md`
      },
      {
        template: "demo/index.html",
        path: `elements/${this.props.elementName}/demo/index.html`
      },
      {
        template: "src/element.ejs",
        path: `elements/${this.props.elementName}/src/${this.props.elementName}.ts`
      },
      {
        template: "src/element.scss",
        path: `elements/${this.props.elementName}/src/${this.props.elementName}.scss`
      },
      {
        template: "test/element.spec.js",
        path: `elements/${this.props.elementName}/test/${this.props.elementName}.spec.js`
      }
    ];

    if (Object.keys(this.props).length > 0) {
      try {
        files.forEach(file => {
          if (fs.existsSync(this.templatePath(file.template))) {
            this.fs.copyTpl(this.templatePath(file.template), this.destinationPath(file.path), this.props);
          }
        });
      } catch (error) {
        console.log(error);
        console.log("//------ Properties set by yeoman:\n");
        console.log(util.inspect(this.props, { showHidden: false, depth: 4 }));
        console.log("-------------------------------------------//\n");
      }
    } else {
      console.error("Prompting was exited without storing values");
    }
  }

  async end() {
    // link the node_modules to the new directory
    await this.spawnCommand("npm", ["run", "bootstrap"]);
    
    // re-run the build step
    await this.spawnCommand("npm", ["run", "build"]);
  }
}