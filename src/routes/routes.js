const { router } = require("../config/app/AppConfig")
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const CategorieController = require('../controllers/CategorieController');
const ModelMiddlewares = require('../middlewares/ModelMiddlewares');
const AccountSchema  = require('../support/schema/AccountSchema');
const StatementSchema  = require('../support/schema/StatementSchema');
const CategorieSchema  = require('../support/schema/CategorieSchema');
const HeaderSchema  = require('../support/schema/HeaderSchema');

router.post("/account", AccountSchema.validateBodyPOSTaccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAllAccounts(req, res));
router.get("/all-statements", (req, res) => StatementController.listAllStatements(req, res));

router.get("/categorie", (req, res) => CategorieController.listAllCategories(req, res));
router.post("/categorie", 
  CategorieSchema.validateBodyPOSTCategory, 
  (req, res) => CategorieController.createCategory(req, res)
);
router.put("/categorie", 
  HeaderSchema.validateHeaderKey, 
  CategorieSchema.validateBodyPUTCategory, 
  (req, res) => CategorieController.updateCategory(req, res)
);

router.use(HeaderSchema.validateHeaderCpf);

router.get("/account", (req, res) => AccountController.getAccount(req, res));
router.put("/account", AccountSchema.validateBodyPUTaccount, 
(req, res) => AccountController.updateAccount(req, res));
router.delete("/account", (req, res) => AccountController.deleteAccount(req, res));

router.post("/statement", StatementSchema.validateBodyStatement, 
(req, res) => StatementController.createStatement(req, res));

router.delete("/statement", ModelMiddlewares.checkCpfExistsInStatements, 
(req, res) => StatementController.deleteAllStatementsByCpf(req, res));

router.use(ModelMiddlewares.checkCpfExistsInAccount);

router.get("/statement", (req, res) => StatementController.listStatementsByCpf(req, res));

router.get("/balance", (req, res) => StatementController.getBalanceByCpf(req, res));

module.exports = router;