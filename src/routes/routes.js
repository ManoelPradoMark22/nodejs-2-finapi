const { router } = require("../config/app/appConfig")
const accountController = require('../controllers/account.controller');

router.post("/account", (req, res) => accountController.create(req, res));
router.get("/allaccounts", (req, res) => accountController.listAll(req, res));
router.get("/account", (req, res) => accountController.getAccount(req, res));
module.exports = router;