const cors = require('cors');
const { router, app } = require("../config/app/AppConfig");
const AccountController = require('../controllers/AccountController');
const StatementController = require('../controllers/StatementController');
const CategoryController = require('../controllers/CategoryController');
const ModelMiddlewares = require('../middlewares/ModelMiddlewares');
const AccountSchema  = require('../support/schema/AccountSchema');
const StatementSchema  = require('../support/schema/StatementSchema');
const CategorieSchema  = require('../support/schema/CategorieSchema');
const HeaderSchema  = require('../support/schema/HeaderSchema');

app.use(cors());

router.get('/', (req, res) => res.send('Hello World'));//learning tests

router.post("/account", AccountSchema.validateBodyPOSTaccount, (req, res) => AccountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => AccountController.listAllAccounts(req, res));
router.get("/all-statements", (req, res) => StatementController.listAllStatements(req, res));

router.get("/all-categories", (req, res) => CategoryController.listAllCategories(req, res));
router.post("/category", 
  CategorieSchema.validateBodyPOSTCategory, 
  (req, res) => CategoryController.createCategory(req, res)
);
router.put("/category", 
  HeaderSchema.validateHeaderKey, 
  CategorieSchema.validateBodyPUTCategory, 
  (req, res) => CategoryController.updateCategory(req, res)
);

router.use(HeaderSchema.validateHeaderCpf);

router.get("/account", (req, res) => AccountController.getAccount(req, res));
router.put("/account", AccountSchema.validateBodyPUTaccount, 
(req, res) => AccountController.updateAccount(req, res));
router.delete("/account", (req, res) => AccountController.deleteAccount(req, res));

router.post("/statement", StatementSchema.validateBodyStatement, 
(req, res) => StatementController.createStatement(req, res));


router.use(ModelMiddlewares.checkCpfExistsInStatements);
router.delete("/statement", 
(req, res) => StatementController.deleteAllStatementsByCpf(req, res));
router.get("/full-dashboard", (req, res) => StatementController.listFullDashboardByCpf(req, res));
router.get("/statement", (req, res) => StatementController.listStatementsByCpf(req, res));

router.get("/balance", (req, res) => StatementController.getBalanceByCpf(req, res));
router.get("/full-balance", (req, res) => StatementController.getCategoryBalanceByCpf(req, res));

module.exports = router;