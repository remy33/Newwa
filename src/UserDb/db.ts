import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';

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
    @Property(String) files: string[];
}

class UserDb extends Core {
    DhtRecords = new Model<DhtRecordDocument, DhtRecord>(this, DhtRecord);
}

let db = new UserDb({ database: 'newwa' })

db.connect()
    .then(() => {
        db.DhtRecords.insert({
            hash: '5dg9r2o0was3m',
            count: 5,
            files: [
                'first_file',
                'second_file',
                'third_file'
            ]
        })
    })
    .then(() => db.DhtRecords.get())
    .then(record => console.log(record))
    .catch(err => console.error(err.message))