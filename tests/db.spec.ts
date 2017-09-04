import UserDb, { DhtRecord } from '../src/UserDb/db'

console.log(`Version ${UserDb.version} created by ${UserDb.author}.\n`);

UserDb.connect()
    .then(() => console.log('Connection established successfully'))
    .then(() => UserDb.save('5d68ik9a', 3, ['first file', 'second file', 'third file']))
    .then(() => UserDb.get('5d68ik9a'))
    .then(rec => (<DhtRecord>rec).files.forEach(file => console.log(file)))
    .then(() => UserDb.close())
    .catch(err => console.error(err))