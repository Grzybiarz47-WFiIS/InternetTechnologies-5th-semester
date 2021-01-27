CREATE TABLE zadania(
    id integer PRIMARY KEY AUTOINCREMENT,
    kategoria varchar(30),
    tytul varchar(30), 
    tresc text, 
    data_start char(10), 
    data_koniec char(10),
    status_zadania varchar(30)
);