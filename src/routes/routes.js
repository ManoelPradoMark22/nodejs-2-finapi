const { router } = require("../config/app/AppConfig")
const accountController = require('../controllers/AccountController');
const AccountMiddlewares = require('../middlewares/AccountMiddlewares');
const validateBodyAccount  = require('../support/schema/AccountSchema');

router.post("/account", validateBodyAccount, (req, res) => accountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => accountController.listAll(req, res));

router.get("/account", (req, res) => accountController.getAccount(req, res));

//router.use(AccountMiddlewares.checkCpfExists);

module.exports = router;