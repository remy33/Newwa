import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import * as Bluebird from 'bluebird'

interface DhtRecordDocument {
    _id?: string;
    hash: string;
    count: number;
    files: string[];
}

@Index({ count: 1 })
@Collection('dhtRecords')
export class DhtRecord extends Instance<DhtRecordDocument, DhtRecord> implements DhtRecordDocument {
    @ObjectID _id: string;
    @Property(String) hash: string;
    @Property(Number) count: number;
    @Property([String]) files: string[];
}

class UserDb extends Core {
    DhtRecords = new Model<DhtRecordDocument, DhtRecord>(this, DhtRecord);
}

// Create instance of the mongodb
const db = new UserDb({ database: 'newwa' });


export const connect = (): Bluebird<UserDb | Error> => {
    return db.connect()
        .then(() => db)
        .catch(err => new Error('Couldn\'t connect to mongodb'));
};

export const save = (hash: string, count: number, files: string[]): Bluebird<Object | Error> => {
    return db.DhtRecords
        .remove({ hash })
        .then(() => db.DhtRecords.insert({ hash, count, files }))
        .then(() => { return { ok: true } })
        .catch(() => new Error('Couldn\'t save values to mongodb'));
};

export const get = (hash: string): Bluebird<DhtRecord | Error> => {
    return db.DhtRecords
        .get({ hash })
        .then((record: DhtRecord) => record)
        .catch(err => new Error('Couldn\'t get the specified hash'));
};

export const close = (): Bluebird<Object | Error> => {
    return db.close()
        .then(() => { return { ok: true } })
        .catch(err => new Error('Error while closing connection to mongodb'));
};

export default {
    connect,
    save,
    get,
    close,
    version: '1.0.0',
    author: 'Yishai Zehavi'
};