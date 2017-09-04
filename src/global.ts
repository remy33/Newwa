var pjson = require('../../package.json');
// FIXME: This might be not safe at browser, need a closer , see - https://stackoverflow.com/a/10855054/3852918

export class global {

    /**
    * Name of the application
    */
    static get AppName(): string {
        return pjson.name;
    }

    /**
    *  Version of the application
    */
    static get AppVersion(): string {
        return pjson.version;
    }

    static get DHT_PORT(): number {
        return 25732;
    }
}
