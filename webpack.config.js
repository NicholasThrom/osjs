const path = require("path");
const nodeExternals = require("webpack-node-externals");
const fs = require("mz/fs");
const argv = require("yargs").argv;

/**
 * This file generates a webpack config based on various options.
 * It also cleans out the dist directory if necessary,
 * so there is only one has per file,
 * to make it easier to find files.
 *
 * This uses command line arguments for various things.
 * 
 * To run for everything, use `npm run build`.
 * 
 * Various flags are available.
 * To use flags, `npm run` need an extra `--` before the flags.
 * For example, `npm run build -- --frontend`.
 * 
 * Flags:
 * `--front`:
 *      Only pack the frontend.
 *      Packs both front and backend by default.
 *      Alias: `--frontend`
 * `--back`:
 *      Only pack the backend.
 *      Packs both front and backend by default.
 *      Alias: `--backend`
 * `--mode=[dev, development, prod, production]`:
 *      Whether to pack for development or production.
 *      Defaults to production.
 *      Aliases: `--dev`, `--development`, `--prod`, `--production`.
 *      Run `npm run build-dev` to automatically include the `--dev` flag.
 * `--[class, classes]=[whatever front end class names to pack]`:
 *      What classes to pack. Otherwise just packs every one.
 * `--output-config`
 *      Outputs the resulting config.
 *      Alias: `--log-config`
 */

// Helper functions

/**
 * Gets the files in a directory.
 */
async function filesInDirectory(directory) {
    try {
        return await fs.readdir(directory);
    } catch (e) {
        return [];
    }
}

/**
 * Gets the mode. There are a lot of flags.
 */
function mode() {
    const defaultMode = "production";
    const isDev = argv.mode === "dev" || argv.mode === "development" || argv.dev || argv.development;
    const isProd = argv.mode === "prod" || argv.mode === "production" || argv.prod || argv.production;
    if (isDev && !isProd) {
        return "development";
    } else if (isProd && !isDev) {
        return "production";
    }

    return defaultMode;
}

// Shared

/**
 * Shared configuration
 */
const sharedConfig = {
    /** Transpiles TypeScript */
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    /** Files to pack */
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    /** Whether to pack for production or development */
    mode: mode(),
    context: __dirname,
    devtool: "source-map",
};

// Backend

/**
 * Generates the backend configuration.
 */
async function backendConfig() {
    const target = "node";
    const externals = [nodeExternals()];
    const entry = {
        backend: path.join(__dirname, "backend/index.ts"),
    };
    const output = {
        path: path.join(__dirname, "dist", "backend"),
        filename: "[name].bundle.js",
    };
    const node = {
        // Apparently setting __dirname and __filename is required for sane behaviour.
        // Otherwise replaces them with "/".
        __dirname: false,
        __filename: false,
    };

    return {
        ...sharedConfig,
        entry,
        output,
        target,
        externals,
        node,
    }
}

// Frontend

/**
 * Gets the filenames for the front end
 */
async function frontendFileNamesToPack() {
    const passedClasses = argv.class || argv.classes;
    let result;
    if (passedClasses) {
        result = passedClasses.split(",");
    } else {
        result = (await filesInDirectory(path.join(__dirname, "frontend", "entry")));
    }

    return result
        .map(filename => filename.replace(/\.tsx?$/g, ""));
}

/**
 * Generates the entry for the frontend config.
 * Based on filenames that do not include `.` endings.
 */
function frontendEntry(filenames) {
    const entry = {};
    for (const filename of filenames) {
        entry[filename] = path.join(__dirname, "frontend", "entry", `${filename}.ts`);
    }
    return entry;
}

/**
 * This is the function that is run when compilation finishes.
 * It cleans up.
 */
async function onFrontendBuild(stats) {
    const builtFiles = Object.keys(stats.compilation.assets);
    await deleteOldFrontEndFilesSimilarTo(builtFiles);
}

/**
 * Deletes old files that are similar to the passed files.
 * Specifically, it deletes files that start with the same thing
 * but have a different filename.
 * For example, if `File.blah.wow.js` is passed,
 * `File.oh.no.js` is deleted,
 * but not `File.blah.wow.js`.
 */
async function deleteOldFrontEndFilesSimilarTo(files) {
    const extantFiles = await filesInDirectory(path.join(__dirname, "dist", "frontend"));
    const fileNames = files.map(file => file.split(".")[0]);
    const filesToDelete = extantFiles
        // Only delete files that have had a similar file be built.
        .filter(extantFile => !files.includes(extantFile) && fileNames.includes(extantFile.split(".")[0]));
    for (const fileToDelete of filesToDelete) {
        fs.unlink(path.join(__dirname, "dist", "frontend", fileToDelete));
    }
}

/**
 * Generates the config for the front end
 */
async function frontendConfig() {
    const filenames = await frontendFileNamesToPack();
    const entry = frontendEntry(filenames);
    const output = {
        path: path.join(__dirname, "dist", "frontend"),
        // If this is renamed it will break the file cleaning code.
        // The name has to come first, before a .
        filename: "[name].[hash].bundle.js",
    };

    // This is a hack to get a function called after things build.
    // It sneaks the function `onFrontendBuild` in as a plugin.
    // It's based on the out-of-date `on-build-webpack`
    // with the deprecated calls changed
    // and the boilerplate removed.
    const plugins = [{
        apply(compiler) {
            compiler.hooks.done.tap("Cleanup", onFrontendBuild);
        },
    }];

    return {
        ...sharedConfig,
        entry,
        output,
        plugins,
    }
}

// Final output

/**
 * Generates the whole config
 */
async function config() {
    if (argv.back || argv.backend) {
        return await backendConfig();
    } else if (argv.front || argv.frontend) {
        return await frontendConfig();
    }
    const config = [await backendConfig(), await frontendConfig()];
    if (argv.logConfig || argv.outputConfig) {
        console.log("Using config:")
        console.dir(config, { depth: null });
        console.log();
    }
    return config;
};

module.exports = config();
