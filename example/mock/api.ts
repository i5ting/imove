const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, './db.json'));
const db = low(adapter);

const queryGraph = (req: any, res: any) => {
  const { projectId = 'default' } = req.body;
  const data = db.get(projectId).value() || [];
  res.send({ status: 200, code: 0, success: true, data: { cells: data } });
};

const modifyGraph = (req: any, res: any) => {
  const { projectId = 'default', actions = [] } = req.body;
  const projectData = db.get(projectId).value() || [];
  actions.forEach((action: any) => {
    const { data, actionType } = action;
    if (actionType === 'create') {
      projectData.push(data);
    } else if (actionType === 'update') {
      const foundIdx = projectData.findIndex((item: any) => item.id === data.id);
      if (foundIdx > -1) {
        projectData[foundIdx] = data;
      }
    } else if (actionType === 'remove') {
      const foundIdx = projectData.findIndex((item: any) => item.id === data.id);
      if (foundIdx > -1) {
        projectData.splice(foundIdx, 1);
      }
    }
  });
  db.set(projectId, projectData).write();
  res.send({ status: 200, code: 0, success: true, data: [] });
};


export default {
  'POST /api/queryGraph': queryGraph,
  'POST /api/modifyGraph': modifyGraph,
};
