db = db.getSiblingDB('traveldb');

db.createCollection('registrations');

db.createUser({
  user: 'traveluser',
  pwd: 'travelpass',
  roles: [
    { role: 'readWrite', db: 'traveldb' }
  ]
});