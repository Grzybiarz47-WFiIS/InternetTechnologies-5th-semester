CREATE TABLE dwutlenek_siarki(
    data_pomiaru char(30) NOT NULL, 
    lokalizacja char(30) NOT NULL, 
    wartosc integer, 
    PRIMARY KEY (data_pomiaru, lokalizacja)
);
CREATE TABLE dwutlenek_azotu(
    data_pomiaru char(30) NOT NULL, 
    lokalizacja char(30) NOT NULL, 
    wartosc integer, 
    PRIMARY KEY (data_pomiaru, lokalizacja)
);
CREATE TABLE pm10(
    data_pomiaru char(30) NOT NULL, 
    lokalizacja char(30) NOT NULL, 
    wartosc integer, 
    PRIMARY KEY (data_pomiaru, lokalizacja)
);