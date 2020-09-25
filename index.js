const fse = require('fs-extra')
const path = require('path');
const spawn = require('cross-spawn');

const FUN_PACKAGE = 'https://github.com/creasoft-dev/fundamenty';

const npmCommand = 'npm';

function parseArgs() {
    let params = {};
    const program = new commander.Command(packageJson.name)
        .version(packageJson.version)
        .arguments('<site-name> [description]')
        .usage(`<site-name> [description]`)
        .action((siteName, args) => {
            params.siteName = siteName;
        })
        .option('--verbose', 'print additional logs')
        .option('--info', 'print environment debug info')
        .on('--help', () => {
            console.log('*** Help on the way');
        })
        .parse(process.argv);
    return params;
}

function normalizeSiteName(pathName) {
    return path.basename(pathName)
        .replace(/[^A-Za-z0-9.-]+/g, '-')
        .replace(/^[-_.]+|-+$/g, '')
        .toLowerCase()
}

function createPackageJson(destPath, params) {
    const package = {
        name: params.siteName,
        version: '0.0.1',
        description: params.description,
        repository: '',
        author: params.author
    }
    fs.writeFileSync(
        destPath,
        JSON.stringify(packageJson, null, 2) + os.EOL
    );
}

function installPackages(baseDir) {

    let args = ['add', '--exact', '--cwd', baseDir];
    args = [...args, FUN_PACKAGE]

    const proc = spawn.sync(npmCommand, args, { stdio: 'inherit' });
    if (proc.status !== 0) {
      console.error(`\`${command} ${args.join(' ')}\` failed`);
      return;
    }
}

(async () => {
    const params = parseArgs();
    params.siteNameNormalized = normalizeSiteName(params.siteName);

    const root = path.resolve(params.siteNameNormalized);
    const siteRoot = fse.ensureDirSync(root);

    const destPath = path.join(root, 'package.fun.json');
    createPackageJson(destPath, params);

    // npm install FUN_PACKAGE
    installPackages(root);


    // copy over folders & files


})();
