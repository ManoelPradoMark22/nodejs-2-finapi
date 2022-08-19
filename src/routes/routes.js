const { router } = require("../config/app/AppConfig")
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const CategorieController = require('../controllers/CategorieController');
const AccountMiddlewares = require('../middlewares/AccountMiddlewares');
const { validateBodyPOSTaccount, validateBodyPUTaccount }  = require('../support/schema/AccountSchema');
const validateBodyStatement  = require('../support/schema/StatementSchema');
const validateBodyCategorie  = require('../support/schema/CategorieSchema');
const validateHeaderCpf  = require('../support/schema/HeaderCpfSchema');

router.post("/account", validateBodyPOSTaccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAllAccounts(req, res));
router.get("/all-statements", (req, res) => StatementController.listAllStatements(req, res));

router.get("/categorie", (req, res) => CategorieController.listAllCategories(req, res));
router.post("/categorie", validateBodyCategorie, (req, res) => CategorieController.createCategory(req, res));

router.use(validateHeaderCpf);

router.get("/account", (req, res) => AccountController.getAccount(req, res));
router.put("/account", validateBodyPUTaccount, (req, res) => AccountController.updateAccount(req, res));

router.post("/statement", validateBodyStatement, (req, res) => StatementController.createStatement(req, res));

router.use(AccountMiddlewares.checkCpfExists);

router.delete("/account", (req, res) => AccountController.deleteAccount(req, res));

router.get("/statement", (req, res) => StatementController.listStatementsByCpf(req, res));
router.delete("/statement", (req, res) => StatementController.deleteAllStatementsByCpf(req, res));

router.get("/balance", (req, res) => StatementController.getBalanceByCpf(req, res));

module.exports = router;