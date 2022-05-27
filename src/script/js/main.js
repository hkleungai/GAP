import BoardRenderer from './BoardRenderer.js';
import __GIT_LOGS from '../data/gitLogs.js';
console.log({ __GIT_LOGS });
main();
function main() {
    try {
        _main();
    }
    catch (error) {
        alert(error.message);
        throw error;
    }
}
function _main() {
    const mainDiv = document.querySelector('div.main');
    if (!mainDiv) {
        throw new Error('No closing div can be found!!');
    }
    const boardRenderer = new BoardRenderer();
    console.log({ boardRenderer });
    const fragment = boardRenderer.render({ __GIT_LOGS }).fragment;
    mainDiv.appendChild(fragment);
}
