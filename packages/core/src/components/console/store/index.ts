export interface ConsoleType {
  logType: string
  infos: any[]
}

export class ConsoleStore {
  logList: ConsoleType[] = []
  logType: string = 'All'

  addLog(log: ConsoleType) {
    this.logList.push(log)
  }

  clearLog() {
    this.logList = []
  }

  get computeLogList() {
    let ret: ConsoleType[] = []
    if (this.logType === 'All') {
      ret = this.logList
    } else {
      ret = this.logList.filter((item) => {
        return item.logType === this.logType.toLowerCase()
      })
    }
    return ret
  }

  changeLogType(type: string) {
    this.logType = type
  }
}

export default new ConsoleStore()
