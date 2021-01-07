import axios from 'axios';
import { safeGet } from './index';

const regex = /import\s([\s\S]*?)\sfrom\s(?:('[@\.\/\-\w]+')|("[@\.\/\-\w]+"))/mg;

const extractPkgs = (code: string, excludePkgs?: string[]): string[] => {
  let matchRet = null;
  const pkgNames: string[] = [];
  while ((matchRet = regex.exec(code)) != null) {
    let pkgName = (matchRet[2] || matchRet[3]);
    pkgName = pkgName.slice(1, pkgName.length - 1);
    // NOTE: ignore relative path (./ and ../) and excludePkgs
    if (
      pkgName.indexOf('./') === -1 &&
      pkgName.indexOf('../') === -1 &&
      excludePkgs?.indexOf(pkgName) === -1
    ) {
      pkgNames.push(pkgName);
    }
  }
  return pkgNames;
};

const getPkgLatestVersion = (pkg: string): Promise<string[]> => {
  return axios.get(`https://registry.npm.taobao.org/${pkg}`)
    .then(res => {
      return [pkg, safeGet(res, 'data.dist-tags.latest', '*')];
    }).catch(err => {
      console.log(`get package ${pkg} info failed, the error is:`, err);
      return [pkg, '*'];
    });
};

const analyzeDeps = (code: string, excludePkgs?: string[]): Promise<{ [pkgName: string]: string }> => {
  const pkgs = extractPkgs(code, excludePkgs);
  return Promise
    .all(pkgs.map(pkg => getPkgLatestVersion(pkg)))
    .then(pkgResults => {
      const map: any = {};
      pkgResults.forEach(([pkg, version]) => {
        map[pkg] = version;
      });
      return map;
    }).catch(err => {
      console.log('analyze deps failed, the error is:', err);
    });
};

export default analyzeDeps;
