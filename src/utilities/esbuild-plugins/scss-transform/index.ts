/*
 * scssTransform
 * This esbuild plugin is inspired by https://github.com/glromeo/esbuild-sass-plugin
 * 
 * Usage
 * Generate a standalone CSS file from scss
 * ```
 * esbuild.build({
 *   plugins: [
 *     scssTransform({
 *       type: "css"
 *     })
 *   ]
 * })
 * ```
 * 
 * Embed the scss into a JavaScript file
 * ```
 * esbuild.build({
 *   plugins: [
 *     scssTransform()
 *   ]
 * })
 * ```
 * 
 * This plugin looks for .scss files, runs the code through dart-sass and then either
 * generates a css file or embeds the resulting css into a component file.
 * 
 * The PFElement base class generates its own CSS that can be added to a page to help
 * with things like fading in a page after the web components have been resolved. 
 * Generating a standalone CSS file is achieved by passing the following type to
 * the scssTransform plugin
 * 
 * ```
 * scssTransform({
 *   type: "css"
 * })
 * ```
 * 
 * Components need to have the scss embedded in them and this is done by reading the
 * imported .scss files in the component file and then embedding it in the JavaScript
 * file.
 * 
 * ```
 * import styles from "./pfe-cta.scss";
 * 
 * class PfeCta extends PFElement {
 *   ...
 *   static styles = styles;
 *   ...
 * }
 * ```
 * 
 * The result is a compiled JavaScript file that imports `css` from `@patternfly/pfelement`
 * and the transformed scss is embedded in the file.
 * 
 * ```
 * import { css } from "@patternfly/pfelement";
 * var pfe_cta_default = css`
 *   ...
 * `
 * 
 * ...
 * PfeCta.styles = pfe_cta_default;
 * ```
 * 
 * It's important that we import `css` from `@patternfly/pfelement` because the PFElement
 * base class exports `css` from `lit` to help keep file sizes small.
 */


import * as sass from "node-sass";
import { dirname, resolve } from "path";

function pathResolve({ resolveDir, path, importer }) {
  return resolve(resolveDir || dirname(importer), path);
}

function getContents(type = null, contents) {
  if (type === "css") {
    return contents.css.toString();
  } else {
    return `
import { css } from "@patternfly/pfelement";
export default css\`
${contents.css.toString()}\``;
  }
} 

const scssTransform = function (options = {}) {
  return {
    name: "scsstransform",
    setup(build) {
      build.onResolve({ filter: /\.scss$/ }, (args) => {
        return {
          path: pathResolve(args),
          namespace: "scsstransform",
          pluginData: args
        };
      });

      build.onLoad({ filter: /./, namespace: "scsstransform" }, (args) => {
        const compiled = sass.renderSync({
          file: args.path,
          includePaths: ["./node_modules/"],
          outputStyle: "compressed"
        });
        return {
          contents: getContents(options.type, compiled),
          loader: options.type === "css" ? "css" : "js",
          resolveDir: dirname(args.pluginData.resolveDir),
          watchFiles: [args.path]
        };
      });
    },
  };
};

export default scssTransform;