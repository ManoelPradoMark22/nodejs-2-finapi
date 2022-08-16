const { app } = require("./config/app/appConfig")
const { PORT } = require("./config/constants.js")
const router = require("./routes/routes")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);
app.listen(PORT,() => console.log(`Servidor rodando na porta ${PORT}`))