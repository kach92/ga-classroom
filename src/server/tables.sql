-- create pokemons table
CREATE TABLE IF NOT EXISTS classrooms (
    id SERIAL PRIMARY KEY,
    title TEXT,
    instructor TEXT,
    starttime TEXT,
    endtime TEXT,
    nickname TEXT
);

CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    instructor TEXT,
    starttime TEXT,
    endtime TEXT,
    nickname TEXT
);
