const { updateInstance, addInstance } = require("../controllers/instances");
const {
  getAllServices,
  addService,
  deleteService,
} = require("../controllers/Services");

const router = require("express").Router();

//////////Service//////////
router.get("/services", getAllServices);
router.post("/service", addService);
router.delete("/service", deleteService);

//////////Instance//////////
router.patch("/instance", updateInstance);
router.post("/instance", addInstance);

module.exports = router;
