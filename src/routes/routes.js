const { router } = require("../config/app/AppConfig")
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const AccountMiddlewares = require('../middlewares/AccountMiddlewares');
const validateBodyAccount  = require('../support/schema/AccountSchema');

router.post("/account", validateBodyAccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAll(req, res));

router.get("/account", (req, res) => AccountController.getAccount(req, res));

router.use(AccountMiddlewares.checkCpfExists);
router.post("/statement", (req, res) => StatementController.createStatement(req, res));
router.get("/statement", (req, res) => StatementController.listStatementByCpf(req, res));

module.exports = router;