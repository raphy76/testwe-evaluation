import { app } from 'electron';

const root = app.getAppPath().split('app.asar').join('');

const paths = {
  rootPath: root,
};

export default paths;
