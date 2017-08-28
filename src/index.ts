var debug = require('debug')('index');
import Spider from './DhtSpider/spider';
import global from './global';

var spidy  = new Spider();
 
 var glb = new global();

debug(`Booting : ${glb.getAppName()}, version ${glb.getAppVersion()} `);


