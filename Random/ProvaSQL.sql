-----------------------------------
-- Criação ------------------------
-----------------------------------

-- 1. Informe o SQL para criação da tabela aluno (4 pontos):

CREATE TABLE aluno(
matricula integer NOT NULL PRIMARY KEY AUTOINCREMENT,
nome text,
email text,
turma integer(1) NOT NULL
);

-- 2. Informe o SQL para criação da tabela disciplina (4 pontos):

CREATE TABLE disciplina(
id_disciplina integer NOT NULL PRIMARY KEY AUTOINCREMENT,
nome text,
carga_horaria integer NOT NULL
);

-- 3. Informe o SQL para criação da tabela pauta (4 pontos):

CREATE TABLE pauta (
id_pauta integer NOT NULL PRIMARY KEY AUTOINCREMENT,
matricula integer,
id_disciplina integer NOT NULL,
nota_1 decimal,
nota_2 decimal,
nota_3 decimal,
FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
FOREIGN KEY (matricula) REFERENCES aluno(matricula)
);

-- 4. Com o comando ALTER TABLE mude o nome das colunas nota_1, nota_2 e nota_3 para avaliacao_1, avaliacao_2 e avaliacao_3 (2 pontos):

ALTER TABLE pauta RENAME nota_1 to avaliacao_1;
ALTER TABLE pauta RENAME nota_2 to avaliacao_2;
ALTER TABLE pauta RENAME nota_3 to avaliacao_3;

-----------------------------------
-- Inserção dos dados -------------
-----------------------------------
-- Planilha com os dados a serem inseridos: https://tinyurl.com/y3ngdd5s

-- 1. Informe o SQL para inserção na tabela alunos (3 pontos):

INSERT INTO aluno (nome, email, turma)
VALUES ("Ana Paula Silva", "aps@residencia.com.br", 1),
("João Souza", "js@residencia.com.br",1),
("Maria Moreira", "mm@residencia.com.br",1),
("Daiane Costa", "dc@residencia.com.br",2),
("Guilherme Silva", "gs@residencia.com.br",1),
("Júlia Almeida", "ja@residencia.com.br",2),
("Diogo Andrade", "da@residencia.com.br",2),
("Manuela Botelho", "mb@gmail.com.br",1),
("Thiago Tavares", "tt@residencia.com.br",2),
("João Pedro Carvalho", "jpc@residencia.com.br",1);

-- 2. Informe o SQL para inserção na tabela disciplina (3 pontos):

INSERT INTO disciplina (nome, carga_horaria)
VALUES ("Banco de dados", 24),
("Lógica de programação", 40),
("Programação backend", 44);

-- 3. Informe o SQL para inserção dos dados na tabela pauta
-- (note que devem ser inseridos os respectivos identificadores de alunos e disciplinas, não os nomes) (3 pontos):

INSERT INTO pauta (matricula,id_disciplina,avaliacao_1,avaliacao_2,avaliacao_3)
VALUES ((select matricula from aluno where nome like 'Ana Paula Silva'), (select id_disciplina from disciplina where nome like 'Banco de dados'), 10,9,10),
((select matricula from aluno where nome like 'Ana Paula Silva'), (select id_disciplina from disciplina where nome like 'Lógica de programação'), 9,8,7),
((select matricula from aluno where nome like 'Ana Paula Silva'), (select id_disciplina from disciplina where nome like 'Programação backend'), 7,7,9),
((select matricula from aluno where nome like 'João Souza'), (select id_disciplina from disciplina where nome like 'Banco de dados'), 9,6,7),
((select matricula from aluno where nome like 'João Souza'), (select id_disciplina from disciplina where nome like 'Lógica de programação'), 10,10,10),
((select matricula from aluno where nome like 'João Souza'), (select id_disciplina from disciplina where nome like 'Programação backend'), 9,8,9),
((select matricula from aluno where nome like 'Maria Moreira'), (select id_disciplina from disciplina where nome like 'Banco de dados'), 10,7,7),
((select matricula from aluno where nome like 'Daiane Costa'), (select id_disciplina from disciplina where nome like 'Lógica de programação'), 8,6,9),
((select matricula from aluno where nome like 'Daiane Costa'), (select id_disciplina from disciplina where nome like 'Programação backend'), 6,6,8),
((select matricula from aluno where nome like 'Guilherme Silva'), (select id_disciplina from disciplina where nome like 'Programação backend'), 8,6,9),
((select matricula from aluno where nome like 'Diogo Andrade'), (select id_disciplina from disciplina where nome like 'Banco de dados'), 8,8,10),
((select matricula from aluno where nome like 'Manuela Botelho'), (select id_disciplina from disciplina where nome like 'Lógica de programação'), 5,7,7),
((select matricula from aluno where nome like 'Thiago Tavares'), (select id_disciplina from disciplina where nome like 'Programação backend'), 5,5,4),
((select matricula from aluno where nome like 'Thiago Tavares'), (select id_disciplina from disciplina where nome like 'Lógica de programação'), 7,7,6),
((select matricula from aluno where nome like 'João Pedro Carvalho'), (select id_disciplina from disciplina where nome like 'Banco de dados'), 5,5,2);


-----------------------------------
-- Atualização dos dados ----------
-----------------------------------

-- 1. Atualizar o e-mail da aluna Manuela Botelho para mb@residencia.com.br (3 pontos):

UPDATE aluno SET email = "mb@residencia.com.br" WHERE nome = "Manuela Botelho";

-- 2. Atualizar a nota 3 do aluno João Pedro Carvalho em Banco de dados para 7 (3 pontos):

UPDATE pauta SET avaliacao_3 = "7" WHERE id_pauta = 15;

-----------------------------------
-- Consultas ----------------------
-----------------------------------

-- 1. Selecionar o nome e a turma dos alunos (1 ponto):

SELECT nome,turma FROM aluno;

-- 2. Selecionar a quantidade total de alunos cadastrados (2 pontos):

SELECT COUNT(matricula) FROM aluno;

-- 3. Selecionar a quantidade total de alunos em cada disciplina (4 pontos):

select d.nome, count(matricula)
from pauta p 
inner join disciplina d on d.id_disciplina = p.id_disciplina 
group by d.nome;

-- 4. Selecionar o nome do aluno, disciplina e as três notas de cada aluno (usando INNER JOIN ou WHERE) (4 pontos):

SELECT aluno.nome,pauta.id_disciplina,pauta.avaliacao_1,pauta.avaliacao_2,pauta.avaliacao_3 
FROM aluno 
INNER JOIN pauta on aluno.matricula = pauta.matricula;

-- 5. Selecionar o nome dos alunos e a quantidade de disciplinas que cada um cursa (4 pontos): 

SELECT aluno.nome,COUNT(pauta.id_disciplina)
FROM aluno
INNER JOIN pauta on aluno.matricula = pauta.matricula
GROUP BY aluno.nome;

-- 6. Selecionar o nome, disciplina e a média das três notas de cada aluno (4 pontos):

SELECT aluno.nome,pauta.id_disciplina,(pauta.avaliacao_1+pauta.avaliacao_2+pauta.avaliacao_3)/3
FROM aluno 
INNER JOIN pauta on aluno.matricula = pauta.matricula;

-- 7. Selecionar o nome, disciplina e a média das três notas dos alunos que tenham média menor que 6 (4 pontos):

SELECT aluno.nome,pauta.id_disciplina,(pauta.avaliacao_1+pauta.avaliacao_2+pauta.avaliacao_3)/3
FROM aluno 
INNER JOIN pauta on aluno.matricula = pauta.matricula
WHERE (pauta.avaliacao_1+pauta.avaliacao_2+pauta.avaliacao_3)/3 < 6;

-- 8. Selecionar o nome da disciplina e as médias das 3 notas (separadamente) de todos os alunos para cada disciplina (4 pontos):

SELECT d.nome,
round(AVG(avaliacao_1),2) as med_av1,
round(AVG(avaliacao_2),2) as med_av2,
round(AVG(avaliacao_3),2) as med_av3
FROM pauta p
INNER JOIN disciplina d ON d.id_disciplina = p.id_disciplina
GROUP BY d.nome
order BY 1;

-- 9. Selecione o aluno com maior nota na avaliação 1 de banco de dados, mostrando qual foi a nota (4 pontos):

SELECT a.nome,
d.nome,
p.avaliacao_1 AS Maior_Nota
FROM aluno a, pauta p, disciplina d
WHERE p.matricula = a.matricula
AND p.id_disciplina = (SELECT d.id_disciplina WHERE d.nome LIKE '%Dados')
AND p.avaliacao_1 = (SELECT MAX (p.avaliacao_1) FROM pauta p)
GROUP BY a.nome
