const config = require('../../config.json');

/**
 * @param {Object} state
 * @returns {String|Boolean}
 */
function getDirective(state) {
    let directive;

    if ('useDirective' in state.opts && state.opts.useDirective !== true) {
        directive = state.opts.useDirective;
    } else {
        directive = config.default.useDirective;
    }

    return directive;
}


/**
 * @param {NodePath} path
 * @param {Object} state
 * @param {Boolean} hasGlobalDirective
 * @returns {String|null}
 */
module.exports = function findRelativeComment(path, state, hasGlobalDirective) {
    let node = path.node;

    if (!node.leadingComments) {
        return null;
    }

    let comments = node.leadingComments;
    let directive = getDirective(state);

    let previousNode = path.key !== 0 ? path.getSibling(path.key - 1) : null;
    let previousNodeEnd = previousNode && previousNode.node ? previousNode.node.end || -1 : -1;

    let functionDeclarationStart;

    /**
     * Fix for annoying edge case, when ObjectProperty node doesn't have start index
     * Workaround: find function body and get it's start index.
     */
    if (path.isObjectProperty()) {
        functionDeclarationStart = node.start || path.get('value').get('body').node.start;
    } else {
        functionDeclarationStart = node.start;
    }

    let foundedCommentsCollection = comments.filter((comment) => {
        return (
            comment.start > previousNodeEnd &&
            comment.end < functionDeclarationStart
        );
    });

    if (!foundedCommentsCollection.length) {
        return null;
    }

    let foundedComment = foundedCommentsCollection[foundedCommentsCollection.length - 1];

    if (typeof directive === 'string' && !hasGlobalDirective) {
        foundedComment = foundedComment.value.includes(`@${directive}`) ? foundedComment : null;
    }

    return foundedComment ? foundedComment.value : null;
};
