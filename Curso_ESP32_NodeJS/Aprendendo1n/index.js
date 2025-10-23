// -------- Exemplo 1 -------- 

//console.log("Olá Mundo!!")

// -------- Exemplo 2 --------

//const fs = require('fs'); // importação do módulo

//fs.writeFileSync("file.txt", "estou usando o fs!");

// -------- Exemplo 3 -------- 

//const fs = require('fs'); 

//const arquivo = fs.readFileSync('file.txt', 'utf-8');

//console.log(arquivo);

// -------- Exemplo 4 -------- 

const moment = require('moment');

const time = new Date();

const timeconvertido = moment(time).format("h:mm:ss");

console.log(timeconvertido);