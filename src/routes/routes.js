const { router } = require("../config/app/AppConfig")
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const AccountMiddlewares = require('../middlewares/AccountMiddlewares');
const validateBodyAccount  = require('../support/schema/AccountSchema');
const validateBodyStatement  = require('../support/schema/StatementSchema');
const validateHeaderCpf  = require('../support/schema/HeaderCpfSchema');

router.post("/account", validateBodyAccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAllAccounts(req, res));
router.get("/all-statements", (req, res) => StatementController.listAllStatements(req, res));

router.use(validateHeaderCpf);

router.get("/account", (req, res) => AccountController.getAccount(req, res));
router.put("/account", (req, res) => AccountController.updateAccount(req, res));

router.use(AccountMiddlewares.checkCpfExists);

router.delete("/account", (req, res) => AccountController.deleteAccount(req, res));

router.get("/statement", (req, res) => StatementController.listStatementsByCpf(req, res));
router.delete("/statement", (req, res) => StatementController.deleteAllStatementsByCpf(req, res));
router.post("/statement", validateBodyStatement, (req, res) => StatementController.createStatement(req, res));

module.exports = router;