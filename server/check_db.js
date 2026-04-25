const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('--- Connecting to SQLite Database ---');
console.log(`Path: ${dbPath}\n`);

db.serialize(() => {
    // Check Admins
    db.all("SELECT id, username, createdAt FROM Admins", (err, rows) => {
        if (err) {
            console.error('Error fetching Admins:', err);
        } else {
            console.log('--- Table: Admins ---');
            if (rows.length === 0) {
                console.log('No admins found.');
            } else {
                console.table(rows);
            }
            console.log('\n');
        }
    });

    // Check Contacts
    db.all("SELECT id, name, email, subject, status, createdAt FROM Contacts", (err, rows) => {
        if (err) {
            console.error('Error fetching Contacts:', err);
        } else {
            console.log('--- Table: Contacts ---');
            if (rows.length === 0) {
                console.log('No contact submissions found.');
            } else {
                console.table(rows);
            }
            console.log('\n');
        }
    });
});

db.close();
