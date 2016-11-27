const path = require('path');
const fs = require('fs');
const babel = require('babel-core');

const config = require('../config.json');

const SOURCE_DIRECTORY_ERRORS = path.join(config.path.data, 'strict-mode', 'should-throw-exception');
const SOURCE_DIRECTORY_NO_ERRORS = path.join(config.path.data, 'strict-mode', 'should-not-throw-exception');
const FILE_ENCODING = 'utf8';
const EXCEPTION_NOT_THROWN = 'Cannot handle this case - exception not thrown!';
const EXCEPTION_THROWN = 'Cannot handle this case - exception thrown!';
const BABEL_CONFIG = {
    code: false,
    plugins: [
        [
            config.path.plugin,
            {
                useStrict: true
            }
        ]
    ]
};

describe('Strict mode', function () {
    describe('should throw exception', () => {
        fs.readdirSync(SOURCE_DIRECTORY_ERRORS).forEach((filename) => {
            it(`in '${filename}'`, () => {
                let fileSource = fs.readFileSync(path.join(SOURCE_DIRECTORY_ERRORS, filename), FILE_ENCODING);
                let transformed = false;

                try {
                    babel.transform(fileSource, BABEL_CONFIG);
                    transformed = true;
                } catch (e) {
                    // if exception was thrown - it's okay, test passed
                }

                if (transformed) {
                    throw new Error(EXCEPTION_NOT_THROWN);
                }
            });
        });
    });

    describe('shouldn\'t throw exception', () => {
        fs.readdirSync(SOURCE_DIRECTORY_NO_ERRORS).forEach((filename) => {
            it(`in '${filename}'`, () => {
                let fileSource = fs.readFileSync(path.join(SOURCE_DIRECTORY_NO_ERRORS, filename), FILE_ENCODING);

                try {
                    babel.transform(fileSource, BABEL_CONFIG);
                } catch(e) {
                    throw new Error(EXCEPTION_THROWN);
                }
            });
        });
    });
});
