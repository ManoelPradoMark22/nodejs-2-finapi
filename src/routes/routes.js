const { router } = require("../config/app/AppConfig")
const accountController = require('../controllers/AccountController');

router.post("/account", (req, res) => accountController.createAccount(req, res));
router.get("/all-accounts", (req, res) => accountController.listAll(req, res));
router.get("/account", (req, res) => accountController.getAccount(req, res));
module.exports = router;