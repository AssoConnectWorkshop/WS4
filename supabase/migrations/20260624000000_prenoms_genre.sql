create table if not exists prenoms (
  id   bigint generated always as identity primary key,
  nom  text not null
);

alter table prenoms add column if not exists genre text check (genre in ('M', 'F', 'M/F'));

-- Update existing rows
update prenoms set genre = 'F' where nom = 'Alice';
update prenoms set genre = 'M' where nom = 'Bob';
update prenoms set genre = 'M' where nom = 'Charlie';
update prenoms set genre = 'F' where nom = 'Diana';
update prenoms set genre = 'M' where nom = 'Étienne';

-- Insert French names - Garçons
insert into prenoms (nom, genre) values
  ('Aaron', 'M'), ('Achille', 'M'), ('Adam', 'M'), ('Adrien', 'M'), ('Alexandre', 'M'),
  ('Alexis', 'M'), ('Antoine', 'M'), ('Arthur', 'M'), ('Axel', 'M'), ('Ayoub', 'M'),
  ('Baptiste', 'M'), ('Benjamin', 'M'), ('Clément', 'M'), ('Colin', 'M'), ('Corentin', 'M'),
  ('Damien', 'M'), ('David', 'M'), ('Dylan', 'M'), ('Edgar', 'M'), ('Edouard', 'M'),
  ('Emile', 'M'), ('Enzo', 'M'), ('Ethan', 'M'), ('Evan', 'M'), ('Félix', 'M'),
  ('Florian', 'M'), ('François', 'M'), ('Gabriel', 'M'), ('Gauthier', 'M'), ('Guillaume', 'M'),
  ('Hugo', 'M'), ('Ilyes', 'M'), ('Ismaël', 'M'), ('Julien', 'M'), ('Kylian', 'M'),
  ('Laurent', 'M'), ('Léo', 'M'), ('Liam', 'M'), ('Louis', 'M'), ('Luca', 'M'),
  ('Lucas', 'M'), ('Lukas', 'M'), ('Malo', 'M'), ('Martin', 'M'), ('Mathieu', 'M'),
  ('Mathis', 'M'), ('Matteo', 'M'), ('Maxime', 'M'), ('Milan', 'M'), ('Nathan', 'M'),
  ('Nicolas', 'M'), ('Noah', 'M'), ('Noé', 'M'), ('Nolan', 'M'), ('Octave', 'M'),
  ('Olivier', 'M'), ('Oscar', 'M'), ('Paul', 'M'), ('Philippe', 'M'), ('Pierre', 'M'),
  ('Quentin', 'M'), ('Raphaël', 'M'), ('Rayan', 'M'), ('Rémi', 'M'), ('Robin', 'M'),
  ('Romain', 'M'), ('Samuel', 'M'), ('Sacha', 'M/F'), ('Simon', 'M'), ('Sofiane', 'M'),
  ('Théo', 'M'), ('Thomas', 'M'), ('Thibault', 'M'), ('Timothée', 'M'), ('Tom', 'M'),
  ('Tristan', 'M'), ('Ugo', 'M'), ('Valentin', 'M'), ('Victor', 'M'), ('William', 'M'),
  ('Xavier', 'M'), ('Yanis', 'M'), ('Yohan', 'M'), ('Younes', 'M'), ('Zachary', 'M'),
  ('Achille', 'M'), ('Anatole', 'M'), ('Apollon', 'M'), ('Augustin', 'M'), ('Basile', 'M'),
  ('Cassien', 'M'), ('Celestin', 'M'), ('Cyprien', 'M'), ('Dorian', 'M'), ('Édouard', 'M'),
  ('Eliott', 'M'), ('Eloi', 'M'), ('Emilien', 'M'), ('Erwann', 'M'), ('Esteban', 'M'),
  ('Gaspard', 'M'), ('Hadrien', 'M'), ('Harold', 'M'), ('Jérémy', 'M'), ('Joris', 'M'),
  ('Kenzo', 'M'), ('Killian', 'M'), ('Léonard', 'M'), ('Loïc', 'M'), ('Lorenzo', 'M'),
  ('Loup', 'M'), ('Maxence', 'M'), ('Mickaël', 'M'), ('Mikaël', 'M'), ('Nils', 'M'),
  ('Orion', 'M'), ('Pacôme', 'M'), ('Pierrick', 'M'), ('Renaud', 'M'), ('Roméo', 'M'),
  ('Sébastien', 'M'), ('Solal', 'M'), ('Tao', 'M'), ('Théodore', 'M'), ('Tiago', 'M'),
  ('Timéo', 'M'), ('Titouan', 'M'), ('Ulysse', 'M'), ('Vianney', 'M'), ('Victorien', 'M');

-- Insert French names - Filles
insert into prenoms (nom, genre) values
  ('Adèle', 'F'), ('Adélaïde', 'F'), ('Agathe', 'F'), ('Agnès', 'F'), ('Alexia', 'F'),
  ('Alicia', 'F'), ('Alina', 'F'), ('Amber', 'F'), ('Ambre', 'F'), ('Amélie', 'F'),
  ('Amina', 'F'), ('Anaïs', 'F'), ('Anais', 'F'), ('Anastasia', 'F'), ('Angelique', 'F'),
  ('Anouk', 'F'), ('Apolline', 'F'), ('Ariane', 'F'), ('Astrid', 'F'), ('Audrey', 'F'),
  ('Aurélie', 'F'), ('Axelle', 'F'), ('Camille', 'F'), ('Capucine', 'F'), ('Cécile', 'F'),
  ('Charlotte', 'F'), ('Chloé', 'F'), ('Clara', 'F'), ('Clémence', 'F'), ('Clémentine', 'F'),
  ('Coralie', 'F'), ('Elisa', 'F'), ('Elise', 'F'), ('Ella', 'F'), ('Elle', 'F'),
  ('Elodie', 'F'), ('Eloise', 'F'), ('Elsa', 'F'), ('Emma', 'F'), ('Eva', 'F'),
  ('Eve', 'F'), ('Fanny', 'F'), ('Fatoumata', 'F'), ('Flore', 'F'), ('Florence', 'F'),
  ('Gabrielle', 'F'), ('Gaelle', 'F'), ('Harriet', 'F'), ('Helena', 'F'), ('Hortense', 'F'),
  ('Inès', 'F'), ('Iris', 'F'), ('Jade', 'F'), ('Julie', 'F'), ('Juliette', 'F'),
  ('Laura', 'F'), ('Laure', 'F'), ('Laurence', 'F'), ('Layla', 'F'), ('Lena', 'F'),
  ('Léa', 'F'), ('Lilou', 'F'), ('Lilly', 'F'), ('Lily', 'F'), ('Lisa', 'F'),
  ('Lola', 'F'), ('Louise', 'F'), ('Lucie', 'F'), ('Luna', 'F'), ('Maëlys', 'F'),
  ('Maeva', 'F'), ('Maëva', 'F'), ('Manon', 'F'), ('Marie', 'F'), ('Marion', 'F'),
  ('Margaux', 'F'), ('Margot', 'F'), ('Mathilde', 'F'), ('Maya', 'F'), ('Mélanie', 'F'),
  ('Mia', 'F'), ('Mila', 'F'), ('Nina', 'F'), ('Noémie', 'F'), ('Nora', 'F'),
  ('Nour', 'F'), ('Océane', 'F'), ('Olivia', 'F'), ('Ophelie', 'F'), ('Pauline', 'F'),
  ('Priscilla', 'F'), ('Rachel', 'F'), ('Rania', 'F'), ('Romane', 'F'), ('Rose', 'F'),
  ('Sarah', 'F'), ('Sara', 'F'), ('Sofia', 'F'), ('Sophie', 'F'), ('Stella', 'F'),
  ('Valentine', 'F'), ('Victoire', 'F'), ('Victoria', 'F'), ('Yasmine', 'F'), ('Zoé', 'F'),
  ('Albane', 'F'), ('Alienor', 'F'), ('Alix', 'F'), ('Alixe', 'F'), ('Amalia', 'F'),
  ('Anaelle', 'F'), ('Andréa', 'F'), ('Angele', 'F'), ('Béatrice', 'F'), ('Blandine', 'F'),
  ('Cassandra', 'F'), ('Charline', 'F'), ('Chiara', 'F'), ('Clotilde', 'F'), ('Colette', 'F'),
  ('Delphine', 'F'), ('Diane', 'F'), ('Eleonore', 'F'), ('Emeline', 'F'), ('Eulalie', 'F'),
  ('Fantine', 'F'), ('Flavie', 'F'), ('Héloïse', 'F'), ('Hermine', 'F'), ('Isaure', 'F'),
  ('Jade', 'F'), ('Jeanne', 'F'), ('Joséphine', 'F'), ('Katell', 'F'), ('Laurie', 'F'),
  ('Lise', 'F'), ('Lou', 'F'), ('Louna', 'F'), ('Lucile', 'F'), ('Lydie', 'F'),
  ('Madeleine', 'F'), ('Maude', 'F'), ('Maud', 'F'), ('Morgane', 'F'), ('Nadège', 'F'),
  ('Naomi', 'F'), ('Nathalie', 'F'), ('Noemie', 'F'), ('Ondine', 'F'), ('Oriane', 'F'),
  ('Perrine', 'F'), ('Philippine', 'F'), ('Roxane', 'F'), ('Sixtine', 'F'), ('Solène', 'F'),
  ('Soraya', 'F'), ('Tifaine', 'F'), ('Tiphaine', 'F'), ('Violette', 'F'), ('Virginie', 'F');
