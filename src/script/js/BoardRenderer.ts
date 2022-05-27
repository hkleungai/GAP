import BaseRenderer, { BaseProps } from 'https://hkleungai.github.io/mini-web-component/BaseRenderer.js';
import { DailyGitLog, DailyGitLogEntries, GitLogs } from '../interface/types';

interface BoardRendererProps extends BaseProps {
  __GIT_LOGS: GitLogs;
}
export default class BoardRenderer extends BaseRenderer<BoardRendererProps> {
  constructor() {
    super('Board');
  }
  #buildGitLogs(__GIT_LOGS: GitLogs): DailyGitLog[] {
    const logEntries = Object.entries(__GIT_LOGS);
    const dailyLogObject = logEntries.reduce<DailyGitLogEntries>((acc, [key, rawLog]) => {
      const dateString = key;
      // Get rid of conventional commits' prefixes with the form "...: "
      const log = rawLog.replace(/^.*:\s+/, '');
      // An unfortunatate trick for making sentence-case string
      const sentenceCasedLog = log[0].toUpperCase() + log.slice(1);
      if (acc[dateString]) {
        acc[dateString].push(sentenceCasedLog);
      }
      else {
        acc[dateString] = [sentenceCasedLog];
      }
      return acc;
    }, {});
    const dailyLogEntries = Object.entries<DailyGitLog['logs']>(dailyLogObject);
    const dailyLogList = dailyLogEntries.map<DailyGitLog>(([date, logs]) => ({ date, logs }));
    return dailyLogList.sort((a, b) => new Date((b.date)).getTime() - new Date(a.date).getTime());
  }
  #buildLog(log: string): string {
    return (
      /* html */`
      <div class="daily-log">
        ${log}
      </div>`
    );
  }
  #buildDailyLogs({ date, logs }: DailyGitLog): string {
    return (
      /* html */`
      <div class="notice-row">
        <div class="date">
          ${date}
        </div>
        <div class="notice-list-by-date">
          ${logs.map((log) => this.#buildLog(log)).join('\n')}
        </div>
      </div>
      `
    )
  };
  protected build(): this {
    const gitLogs = this.#buildGitLogs(this.props.__GIT_LOGS);
    const dailyLogs = gitLogs.map((gitLog) => this.#buildDailyLogs(gitLog));
    const notices = dailyLogs.join('\n');
    this.innerHTML = (
      /* html */`
      <div class="notice-wrapper">
        <h3 class="common-title" id="Page Updates">
          Page Updates
        </h3>
        <div class="board">
          ${notices}
        </div>
      </div>
      `
    );
    return this;
  }
  protected attachEvent(): this { return this; }
}
