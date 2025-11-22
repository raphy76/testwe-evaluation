import { ipcMain } from 'electron';

import { app, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

//const dataPath = path.join(app.getPath('userData'), 'data_issues_and_columns.json');
const dataPath = path.join(process.cwd(), 'data_issues_and_columns.json');

const DEFAULT_COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" }
];

const DEFAULT_ISSUES = [
  { id: "1", title: "Issue 1", description: "Description 1", status: "todo" },
  { id: "2", title: "Issue 2", description: "Description 2", status: "inprogress" },
  { id: "3", title: "Issue 3", description: "Description 3", status: "done" }
];

function initDataFile() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(
      dataPath,
      JSON.stringify({ columns: DEFAULT_COLUMNS, issues: DEFAULT_ISSUES }, null, 2)
    );
  }
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (e) {
    return { columns: [], issues: [] };
  }
}

function writeData(data: any) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export function initElectronEventsHandler() {
  initDataFile();

  ipcMain.handle("get-data", () => {
    return readData();
  });

  ipcMain.handle("save-data", (_event, newData) => {
    writeData(newData);
    return true;
  });
}