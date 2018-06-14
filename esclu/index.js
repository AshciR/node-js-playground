'use strict';

const program = require('commander');
const pkg = require('./package.json');
const request = require('request');

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('[options] <command> [...]')
    .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
    .option('-p, --port <number>', 'port number [9200]', '9200')
    .option('-j, --json', 'format output as JSON')
    .option('-i, --index <name>', 'which index to use')
    .option('-t, --type <type>', 'default type for bulk operations');

program
    .command('url [path]')
    .description('generate the URL for the options and path (default is /)')
    .action((path = '/') => console.log(fullUrl(path)));

program
    .command('get [path]')
    .description('perform an HTTP GET request for path (default is /)')
    .action((path = '/') => {
        const options = {
            url: fullUrl(path),
            json: program.json,
        };
        request(options, (err, res, body) => {
            if (program.json) {
                console.log(JSON.stringify(err || boy));
            } else {
                if (err) throw err;
                console.log(body);
            }
        });
    });

const fullUrl = (path = '') => {
    let url = `http://${program.host}:${program.port}/`;
    if (program.index) {
        url += program.index + '/';
        if (program.type) {
            url += program.type + '/';
        }
    }
    return url + path.replace(/^\/*/g, ''); //The regex strips the first forward slash
};

program.parse(process.argv);

// If there are no arguments then display the help message
if (!program.args.filter(arg => typeof arg === 'object').length) {
    program.help();
}