import { useState } from 'react';
import './Issues.scss';

enum IssueStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  DONE = 'done',
}

interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
}

interface Column {
  id: IssueStatus;
  title: string;
}

export default function Issues() {
  const [columns] = useState<Column[]>([
    { id: IssueStatus.TODO, title: 'To Do' },
    { id: IssueStatus.DONE, title: 'Done' },
  ]);

  const [issues] = useState<Issue[]>([
    {
      id: '1',
      title: 'Issue 1',
      description: 'Description for Issue 1',
      status: IssueStatus.TODO,
    },
    {
      id: '2',
      title: 'Issue 2',
      description: 'Description for Issue 2',
      status: IssueStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Issue 3',
      description: 'Description for Issue 3',
      status: IssueStatus.DONE,
    },
  ]);

  const groupedIssues = columns.map((column) => ({
    ...column,
    issues: issues.filter((issue) => issue.status === column.id),
  }));

  return (
    <div className="issue-container">
      <div className="issue-columns">
        {groupedIssues.map((column) => (
          <div key={column.id} className="issue-column">
            <h2>{column.title}</h2>
            {column.issues.map((issue) => (
              <div key={issue.id} className="issue-item">
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
