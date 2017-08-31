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
class DhtRecord extends Instance<DhtRecordDocument, DhtRecord> implements DhtRecordDocument {
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

export const save = (hash: string, count: number, files: string[]): Bluebird<Object> => {
    return db.DhtRecords
        .insert({ hash, count, files })
        .then(() => { return { ok: true } })
        .catch(() => { return { ok: false } });
};

export const get = (hash: number): Bluebird<DhtRecord | Error> => {
    return db.DhtRecords
        .get({ hash })
        .then((record: DhtRecord) => record)
        .catch(err => new Error('Couldn\'t find the specified hash'));
};

export const close = (): Bluebird<Object> => {
    return db.close()
        .then(() => { return { ok: true } })
        .catch(err => { return { ok: false } });
};

export default {
    connect,
    save,
    get,
    close
};