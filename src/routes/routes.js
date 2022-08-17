const { router } = require("../config/app/AppConfig")
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const AccountMiddlewares = require('../middlewares/AccountMiddlewares');
const validateBodyAccount  = require('../support/schema/AccountSchema');
const validateBodyStatement  = require('../support/schema/StatementSchema');
const validateHeaderCpf  = require('../support/schema/HeaderCpfSchema');

router.post("/account", validateBodyAccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAllAccounts(req, res));

router.use(validateHeaderCpf);
router.get("/account", (req, res) => AccountController.getAccount(req, res));

router.use(AccountMiddlewares.checkCpfExists);
router.delete("/account", (req, res) => AccountController.deleteAccount(req, res));
router.post("/statement", validateBodyStatement, (req, res) => StatementController.createStatement(req, res));
router.get("/statement", (req, res) => StatementController.listStatementByCpf(req, res));

module.exports = router;