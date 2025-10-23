// --------- importações --------- 

const express = require('express');
const bodyParser = require('body-parser');
const aedes = require('aedes')();
const cors = require('cors');
const { default: Aedes } = require('aedes');

// --------- instanciações --------- 

const app = express();

const mqttServer = require('net').createServer(aedes.handle);
const mqttPort = 1883;

mqttServer.listen(mqttPort, () => {
    console.log(`MQTT server is running on port ${mqttPort}`);
});


aedes.on('client', (client) => {
    console.log("New client connected", client)
});

aedes.on('cilentDisconnect',(client) => {
    console.log('client disconnected', client);
});

aedes.on('publish', (packet, client) => {
    console.log(`mensagem recebido do cliente ${client} - Tópico : ${packet.topic} => ${packet.payload.toString()}`)
});


app.use(cors()); // Cors é um mecanismo de segurança que é implementados nos navegadores que restinguem solicitações.

app.use(bodyParser.json()); // Middleware utilizado para analisar o corpo da solicitação HTTP.

app.get('/', (req, res) => {
    res.send({message: "API MQTT RODANDO"});
});


app.post('/send', (req, res) => {
    try {
        const mensagem = req.body.mensagem;
        aedes.publish({topic:'esp32/data', payload: mensagem});
        res.status(200).send({menssage : 'Menssagem publicada' });
    } catch (error) {
        throw new Error("Falha ao publicar mensagem");
    }
})

const port = 3000;

app.listen(port,() => {
    console.log("Servidor rodando na porta "+port);
}) // Função de Callback






