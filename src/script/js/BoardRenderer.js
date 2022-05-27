var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BoardRenderer_instances, _BoardRenderer_buildGitLogs, _BoardRenderer_buildLog, _BoardRenderer_buildDailyLogs;
import BaseRenderer from 'https:/hkleungai.github.io/mini-web-component/BaseRenderer.js';
export default class BoardRenderer extends BaseRenderer {
    constructor() {
        super('Board');
        _BoardRenderer_instances.add(this);
    }
    ;
    build() {
        const gitLogs = __classPrivateFieldGet(this, _BoardRenderer_instances, "m", _BoardRenderer_buildGitLogs).call(this, this.props.__GIT_LOGS);
        const dailyLogs = gitLogs.map((gitLog) => __classPrivateFieldGet(this, _BoardRenderer_instances, "m", _BoardRenderer_buildDailyLogs).call(this, gitLog));
        const notices = dailyLogs.join('\n');
        this.innerHTML = (`
      <div class="notice-wrapper">
        <h3 class="common-title" id="Page Updates">
          Page Updates
        </h3>
        <div class="board">
          ${notices}
        </div>
      </div>
      `);
        return this;
    }
    attachEvent() { return this; }
}
_BoardRenderer_instances = new WeakSet(), _BoardRenderer_buildGitLogs = function _BoardRenderer_buildGitLogs(__GIT_LOGS) {
    const logEntries = Object.entries(__GIT_LOGS);
    const dailyLogObject = logEntries.reduce((acc, [key, rawLog]) => {
        const dateString = key.replace(/^[0-9]{4,}\//, '').replace(/:[0-9]{2}$/, '');
        const log = rawLog.replace(/^.*:\s+/, '');
        const sentenceCasedLog = log[0].toUpperCase() + log.slice(1);
        if (acc[dateString]) {
            acc[dateString].push(sentenceCasedLog);
        }
        else {
            acc[dateString] = [sentenceCasedLog];
        }
        return acc;
    }, {});
    const dailyLogEntries = Object.entries(dailyLogObject);
    const dailyLogList = dailyLogEntries.map(([date, logs]) => ({ date, logs }));
    return dailyLogList.sort((a, b) => new Date((b.date)).getTime() - new Date(a.date).getTime());
}, _BoardRenderer_buildLog = function _BoardRenderer_buildLog(log) {
    return (`
      <div class="daily-log">
        ${log}
      </div>`);
}, _BoardRenderer_buildDailyLogs = function _BoardRenderer_buildDailyLogs({ date, logs }) {
    return (`
      <div class="notice-row">
        <div class="date">
          ${date}
        </div>
        <div class="daily-log-list">
          ${logs.map((log) => __classPrivateFieldGet(this, _BoardRenderer_instances, "m", _BoardRenderer_buildLog).call(this, log)).join('\n')}
        </div>
      </div>
      `);
};
