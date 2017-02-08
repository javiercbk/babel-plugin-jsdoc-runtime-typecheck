const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

const mocha = new Mocha();

addFilesFrom(mocha, path.resolve(config.path.smokeTest));
addFilesFrom(mocha, path.resolve(config.path.unitTest));

mocha.run((failures) => {
    process.on('exit', () => {
        process.exit(failures);  // exit with non-zero status if there were failures
    });
});

/**
 * @param {Mocha} mocha
 * @param {String} directory
 */
function addFilesFrom(mocha, directory) {
    fs.readdirSync(directory)
        .filter((file) => file.substr(-3) === '.js')
        .forEach((file) => {
            mocha.addFile(
                path.join(directory, file)
            );
        });
}
