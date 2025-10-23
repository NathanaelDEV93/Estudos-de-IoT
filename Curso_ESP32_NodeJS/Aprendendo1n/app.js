const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Banco de dados em memória (simples array)
let users = [
    {id: 1, name: "João"},
    {id: 2, name: "Maria"}

];

// Rota GET - Listar usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// Rota POST - Criar novo usuário
app.post('/users', (req, res) => {
    const { name } = req.body;
    const newUser = {id: users.length + 1, name};
    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota PUT - Atualizar usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: `Usuário não encontrado` });
    }
    user.name = name;
    res.json(user);
});

// Rota DELETE - Remover um usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== parseInt(id));
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.status(200).send({message: "API ONLINE"});
})

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
