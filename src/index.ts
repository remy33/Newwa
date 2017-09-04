var debug = require('debug')('newaa');
import WebTorrent = require('webtorrent');
import natUpnp = require('nat-upnp');

import {global}  from'./Global';
import {DhtEngine} from './DhtSpider/DhtEngine';
//import Spider = require('./DhtSpider/spider');
//var spidy  = new Spider.Spider();

debug(`Booting : ${global.AppName}, version ${global.AppVersion} `);

var TorrentClient = new WebTorrent({
     // We don't want to use trackers becaouse it will be extremly rude to kill the with requests
    tracker: false,
    dht: { concurrency: 10000,  maxTables: 10000, maxPeers: 10000, }, // More peers = more speed
    dhtPort: global.DHT_PORT,
    // While recent restarting the progrma we want the same indentity
    //nodeId:'ca73017abdd9b8d8454896278be7951186d6b545', 
  });

  TorrentClient.dht.on('ready', () => {
    debug(TorrentClient.dht.address());
});

var dhtEngine = new DhtEngine(TorrentClient.dht);

var search = (keyword : string) : void => {
    // Hash the file

    // Check cache

    // Search hash in DHT

    // Try to get torrents

    // Try to fetch the the files
}





// NAT-Mapper (uPnP)

var client = natUpnp.createClient();
var DHT_PORT = global.DHT_PORT;

client.portMapping({
  public: DHT_PORT,
  private: DHT_PORT,
  ttl: 0,
  protocol: 'UDP',
}, function (err) {
  if (err)
    debug('Cannot map the port, it is still close');
  else
    debug('Suceed open port UDP = ' + DHT_PORT);
});

client.portMapping({
  public: DHT_PORT,
  private: DHT_PORT,
  ttl: 0,
}, function (err) {
  if (err)
    debug('Cannot map the port, it is still close');
  else
    debug('Suceed open port TCP = ' + DHT_PORT);
});

// client.portUnmapping({
//  public: 12345
// });

// client.getMappings(function(err, results) {
// });

// client.getMappings({ local: true }, function(err, results) {
// });

client.externalIp(function (err, ip) {
  debug('My ip is:' + ip);
});

// PORT MAPPING ENDS HERE