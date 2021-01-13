const { instance } = require("../../models");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
  updateInstance: async (req, res) => {
    const { instanceId, status } = req.body;
    try {
      const result = await instance.update(
        { status },
        {
          where: {
            id: instanceId,
          },
        }
      );
      successResponse(res, result, "Instance Updated", "instance");
    } catch (error) {
      failedResponse(res, "Failed to add service");
    }
  },
  addInstance: async (req, res) => {
    const { serviceId, instanceName } = req.body;
    const result = await instance.create({
      serviceId,
      name: instanceName,
      status: "waiting",
    });
    successResponse(res, result, "instance Added", "instance", 201);
    try {
    } catch (error) {
      failedResponse(res, "Failed to add service");
    }
  },
};
