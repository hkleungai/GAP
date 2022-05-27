import BoardRenderer from './BoardRenderer';
import __GIT_LOGS from '../data/gitLogs';

main();

function main(): void {
  try {
    _main();
  }
  catch (error: unknown) {
    alert((error as Error).message);
    throw error;
  }
}

function _main(): void {
  const mainDiv = document.querySelector('div.main');
  if (!mainDiv) {
    throw new Error('No closing div can be found!!');
  }
  const boardRenderer = new BoardRenderer();
  const fragment = boardRenderer.render({ __GIT_LOGS }).fragment;
  mainDiv.appendChild(fragment);
}
