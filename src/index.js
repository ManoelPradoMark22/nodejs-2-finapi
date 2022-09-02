const cors = require('cors');

const { app } = require("./config/app/AppConfig");
const { PORT } = require("./config/Constants");
const router = require("./routes/Routes");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
const server = app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = server;