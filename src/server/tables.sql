-- create pokemons table
CREATE TABLE IF NOT EXISTS classrooms (
    id SERIAL PRIMARY KEY,
    title TEXT,
    instructor TEXT,
    startTime TEXT,
    endTime TEXT
);

CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    instructor TEXT,
    startTime TEXT,
    endTime TEXT
);
