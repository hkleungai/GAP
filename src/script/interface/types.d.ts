export interface GitLogs {
  [date: string]: string;
}

export interface DailyGitLog {
  date: string;
  logs: string[];
}

export interface DailyGitLogEntries {
  [date: DailyGitLog['date']]: DailyGitLog['logs'];
}
