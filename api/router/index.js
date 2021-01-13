const {
  updateInstance,
  addInstance,
  deleteInstance,
} = require("../controllers/instances");
const {
  getAllServices,
  addService,
  deleteService,
} = require("../controllers/Services");

const router = require("express").Router();

//////////Service//////////
router.get("/services", getAllServices);
router.post("/service", addService);
router.delete("/service/:id", deleteService);

//////////Instance//////////
router.patch("/instance", updateInstance);
router.post("/instance", addInstance);
router.delete("/instance/:id", deleteInstance);

module.exports = router;
