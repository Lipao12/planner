CREATE TABLE IF NOT EXISTS trips(
    id TEXT PRIMARY KEY,
    destination TEXT NOT NULL,
    start_date TIMESTAMP, 
    end_date TIMESTAMP, 
    owner_name TEXT NOT NULL,
    owner_email TEXT NOT NULL,
    status INTEGER,
    user_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS emails_to_invite(
    id TEXT PRIMARY KEY,
    trip_id TEXT,
    email TEXT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS links(
    id TEXT PRIMARY KEY,
    trip_id TEXT,
    title TEXT NOT NULL,
    link TEXT NOT NULL,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS participants (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    emails_to_invite_id TEXT NOT NULL,
    name TEXT NOT NULL,
    is_confirmed INTEGER, -- 1 para verdadeiro (true), 0 para falso (false)
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (emails_to_invite_id) REFERENCES emails_to_invite(id)
);

CREATE TABLE IF NOT EXISTS activities (
    id TEXT PRIMARY KEY,
    trip_id TEXT NOT NULL,
    title TEXT NOT NULL,
    occurs_at TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);