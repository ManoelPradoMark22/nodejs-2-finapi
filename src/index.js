const { app } = require("./config/app/AppConfig")
const { PORT } = require("./config/Constants")
const router = require("./routes/Routes")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`))