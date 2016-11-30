const config = require('../../config.json');

const ALLOWED_NODE_TYPE = 'CallExpression';

/**
 * @param {NodePath} path
 * @returns {Boolean}
 */
function findInsertedExpression(path) {
    if (!path.isExpressionStatement()) {
        return false;
    }

    return (
        path.node.expression.type === ALLOWED_NODE_TYPE &&
        path.node.expression.callee.name === config.functionName
    );
}

/**
 * @param {NodePath} path
 * @returns {Boolean}
 */
module.exports = (path) => {
    /**
     * @type {Array<NodePath>}
     */
    let innerPaths = path.get('body').get('body');

    return innerPaths.filter(findInsertedExpression).length === 0;
};
