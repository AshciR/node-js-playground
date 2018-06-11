'use strict';

const program = require('commander');
const pkg = require('./package.json');

program
    .version(pkg.version)
    .description(pkg.description)
    .usage('[options] <command> [...]')
    .option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
    .option('-p, --port <number>', 'port number [9200]', '9200')
    .option('-j, --json', 'format output as JSON')
    .option('-i, --index <name>', 'which index to use')
    .option('-t, --type <type>', 'default type for bulk operations');
    
program.parse(process.argv);

// If there are no arguments then display the help message
if (!program.args.filter(arg => typeof arg === 'object').length){
    program.help();
}

program
    .command('url [path]')
    .description('generate the URL for the options and path (default is /)')
    .action((path = '/') => console.log(fullUrl(path)));

const fullUrl = (path = '') => {
    let url = 'http://${program.host}:${program.port}/';
    if (program.index){
        url += program.index + '/';
        if(program.type){
            url += program.type + '/';
        }
    }
    return url + path.replace(/^\/*/g, ''); //The regex strips the first forward slash
};






    



