var debug = require('debug')('newaa');

/**
 * DHT engine, will do all non torrent related stuff
 */
export class DhtEngine {

    dht: any;

    constructor(Dht: any) {
        if (Dht == null) {
            throw new TypeError('should be dht object');
        }

        this.dht = Dht;

        this.startCrawl();
    }

    private publish(hash: string, onSucces: () => boolean): void {
        // Publish single dht to hive

    }

    publishFiles(relatedHash: string, files: string[]): void {
        // Hash and publish each file into the hive

        // On each sucsess add the add {relatedHask, file} to the DB
    }

    publishTorrent(): void {
        // Filter the audio only ( via @Helpers)

        // Call publish files.
    }

    startCrawling(): void {
        //
    }

    searchHash(): void {
        // Will return list of peers who holds the hash.
    }

    /**
     * Search file in the dht
     * @param query Search query
     */
    searchName(query: string): string[] {
        return ["7fbc58e324b539bdda58c15bda3acd26b0d5fbd1"];
    }

    /**
     * 
     * @param hash Hash to search
     * @param callBack Callback, string of found object, null if empty.
     */
    onFoundHash(hash: string, callBack: (string) => void): void {
        // Will check the db, and if it's not exist, try to get the metadata.
    }


    private onQuery(query, peer) {
        var q = query.q.toString();
        debug(q);
        var y = query.y.toString();
        if ((!query.a) || (y === 'r')) return;

        if (q === 'get_peers') {
            debug('We got this: ' + query.a.info_hash.toString('hex'));

            // if (client.get(query.a.info_hash) === null) {
            //     debug('We will download it.');

            //     client.add(query.a.info_hash.toString('hex'), function (torrent) {
            //         torrent.on('done', function () {
            //             debug('torrent download finished');
            //         });
            //     });
            // }

            // Check if the hash already listed
            // info: announce isnt necessarily becaouse it require getpeers anyway.
            // try to download
            // TODO: Download from Torrents module.
        }
    }

    startCrawl(): void {
        this.dht._rpc.on('query', this.onQuery);


        this.dht.on('peer', function (peer, infoHash, from) {
            if (from === null) {
                debug('found potential peer ' + peer.host + ':' + peer.port);
            }
            else {
                debug('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port);
            }
        });
    }
}