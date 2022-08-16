const { router } = require("../config/app/appConfig")
const accountController = require('../controllers/account.controller');

router.post("/account", (req, res) => accountController.create(req, res));
module.exports = router;