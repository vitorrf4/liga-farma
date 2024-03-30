const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const arquivo = "./liga_farma.db";

function criaConexaoDb() {
    // verifica se o arquivo já existe na pasta 
    if (fs.existsSync(arquivo)) {
        return new sqlite3.Database(arquivo);
    } 
    
    const db = new sqlite3.Database(arquivo, (error) => {
        if (error) {
            return console.error(error.message);
        }
        criaTabelas(db);
    });
    console.log("Arquivo SQLite liga_farma.db criado");
    return db;
}

function criaTabelas(db) {
    db.exec(`
        CREATE TABLE FARMACIA(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome   VARCHAR(50) NOT NULL,
            cnpj   VARCHAR(14) NOT NULL,
            endereco VARCHAR(200) NOT NULL,
            email varchar(60),
            telefone VARCHAR(20)
        );
        
        CREATE TABLE FARMACEUTICO(
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nome   VARCHAR(50) NOT NULL,
           cpf   VARCHAR(11) NOT NULL,
           numero_crf VARCHAR(20) NOT NULL,
           telefone VARCHAR(20),
           especializacao varchar(100) 
        );

        CREATE TABLE CONTRATACAO(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contratante_cnpj varchar(14) references FARMACIA(cnpj),
            contratado_cpf varchar(11) references FARMACEUTICO(cpf),
            data_inicio date,
            data_fim date
        );
    `);
}

module.exports = criaConexaoDb();
