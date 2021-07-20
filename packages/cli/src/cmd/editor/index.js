/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const express = require('express');
const Base = require('../base');
const { DEFAULT_PORT, createServer } = require('../../utils/server');

class Editor extends Base {
  constructor(...args) {
    super(...args);
    if (!this.dbFile) {
      fs.ensureDirSync(this.outputPath);
      this.dbFile = path.join(this.outputPath, 'db.json');
    }
    // make sure dbFile existed
    fs.createFileSync(this.dbFile);

    const adapter = new FileSync(this.dbFile);
    this.db = low(adapter);
  }

  get projectName() {
    const { projectName = 'default' } = this.config || '';
    return projectName;
  }

  get outputPath() {
    const { outputPath } = this.config || '';
    return outputPath;
  }

  get dbFile() {
    const dbFile = this._dbFile || (this.config || '').dbFile;
    return dbFile;
  }

  set dbFile(val) {
    this._dbFile = val;
  }

  queryGraph(req, res) {
    const data = this.db.get(this.projectName).value() || [];
    res.send({ status: 200, code: 0, success: true, data: { cells: data } });
  }

  modifyGraph(req, res) {
    const { actions = [] } = req.body;
    const projectData = this.db.get(this.projectName).value() || [];
    actions.forEach((action) => {
      const { data, actionType } = action;
      if (actionType === 'create') {
        projectData.push(data);
      } else if (actionType === 'update') {
        const foundIdx = projectData.findIndex((item) => item.id === data.id);
        if (foundIdx > -1) {
          projectData[foundIdx] = data;
        }
      } else if (actionType === 'remove') {
        const foundIdx = projectData.findIndex((item) => item.id === data.id);
        if (foundIdx > -1) {
          projectData.splice(foundIdx, 1);
        }
      }
    });
    this.db.set(this.projectName, projectData).write();
    res.send({ status: 200, code: 0, success: true, data: [] });
  }

  run() {
    const server = createServer(DEFAULT_PORT, true);
    server.use(express.static(path.join(__dirname, './template')));
    server.post('/api/queryGraph', this.queryGraph.bind(this));
    server.post('/api/modifyGraph', this.modifyGraph.bind(this));
  }
}

module.exports = Editor;
