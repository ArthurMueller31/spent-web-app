// server.js
const express = require('express');
const cors = require('cors'); // Usado para permitir requisições do frontend

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Permite que o servidor leia JSON no corpo da requisição

app.post('/api/enviar-valor', (req, res) => {
  const { valor } = req.body;
  console.log('Valor recebido no backend:', valor);
  
  // Aqui você pode salvar o valor no banco de dados ou processá-lo de alguma forma
  res.status(200).send({ message: 'Valor recebido com sucesso' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
