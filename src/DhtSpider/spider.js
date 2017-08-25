export default class Spider {
  constructor() {
  

var x = function(){};

var WebTorrent = require('webtorrent');
var fs = require('fs');
var natUpnp = require('nat-upnp');


var DHT_PORT = 25732;
// NAT-Mapper (uPnP)

var client = natUpnp.createClient();

client.portMapping({
  public: DHT_PORT,
  private: DHT_PORT,
  ttl: 0,
  protocol: 'UDP',
}, function (err) {
  if (err)
    console.log('Cannot map the port, it is still close');
  else
    console.log('Suceed open port UDP = ' + DHT_PORT);
});

client.portMapping({
  public: DHT_PORT,
  private: DHT_PORT,
  ttl: 0,
}, function (err) {
  if (err)
    console.log('Cannot map the port, it is still close');
  else
    console.log('Suceed open port TCP = ' + DHT_PORT);
});

// client.portUnmapping({
//  public: 12345
// });

// client.getMappings(function(err, results) {
// });

// client.getMappings({ local: true }, function(err, results) {
// });

client.externalIp(function (err, ip) {
  console.log('My ip is:' + ip);
});

// PORT MAPPING ENDS HERE

var client = new WebTorrent({
  tracker: false, // Enable trackers (default=true), or options object for Tracker
  dht: { concurrency: 16, maxTables: 5000, maxPeers: 5000, },// Enable DHT (default=true), or options object for DHT
  dhtPort: DHT_PORT,
  //nodeId:'ca73017abdd9b8d8454896278be7951186d6b545',
});

//var magnetURI = 'magnet:?xt=urn:btih:7fbc58e324b539bdda58c15bda3acd26b0d5fbd1';
var dht = client.dht;

var onQuery = function (query, peer) {
  var q = query.q.toString();
  console.log(q);
  var y = query.y.toString();
  if ((!query.a) || (y === 'r')) return;

  if (q === 'get_peers') {
    console.log('We got this: ' + query.a.info_hash.toString('hex'));
    if (client.get(query.a.info_hash) === null) {
      console.log('We will download it.');

      client.add(query.a.info_hash.toString('hex'), function (torrent) {
        torrent.on('done', function () {
          console.log('torrent download finished');
        });
      });
    }
  }
};

dht._rpc.on('query', onQuery);

dht.on('announce', (peer, infoHash) => {
  if (client.get(infoHash) === null) {
    console.log('We will try to get :' + infoHash.toString('hex'))
    client.add(infoHash, function (torrent) {
      torrent.on('done', function () {
        console.log('torrent download finished');
      });
    });
  }
});

dht.on('peer', function (peer, infoHash, from) {
  if (from === null) {
    console.log('found potential peer ' + peer.host + ':' + peer.port);
  }
  else {
    console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port);
  }
});

// client.add(magnetURI ,function (torrent) {
//   torrent.on('done', function () {
//     console.log('torrent download finished');
//   });
// });

client.on('torrent', function (torrent) {
  console.log('Got the torrent data');
  console.log(torrent.path);
  torrent.files.forEach(function (file) {
    console.log(file.path);
  }, this);

  // fs.writeFile("C:\\Users\\Remy\\Desktop\\Projects\\NodeJs\\TorrentSpider\\TMP\\" + torrent.infoHash,
  //   torrent.infoBuffer, function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }

  //     console.log("The file was saved!");
  //   });
  client.remove(torrent.infoHash);
});


dht.on('ready', () => {
  console.log(dht.address());
});
    
  }
}