var pjson = require('../package.json');
// FIXME: This might be not safe at browser, need a closer , see - https://stackoverflow.com/a/10855054/3852918

export default class Global {
    // constructor() {
    // }
    public getAppName():string { 
        return pjson.name;
    }
    
    public getAppVersion():string {
        return pjson.version;        
    }
}