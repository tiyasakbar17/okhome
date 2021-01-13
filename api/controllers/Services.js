const { service, instance } = require("../../models");
const { failedResponse, successResponse } = require("../responses");

module.exports = {
  getAllServices: async (req, res) => {
    try {
      const result = await service.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["date", "ASC"]],
        include: [
          {
            model: instance,
            as: "instances",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      successResponse(res, result, "Services Loaded", "services");
    } catch (error) {
      failedResponse(res, "Failed to get data");
    }
  },
  addService: async (req, res) => {
    const { serviceName, date, instanceNames } = req.body;
    try {
      const newService = await service.create({ name: serviceName, date });
      const uploadPhotos = async () => {
        return Promise.all(
          instanceNames.map(async (instanceName) => {
            await instance.create({
              name: instanceName,
              serviceId: newService.id,
              status: "waiting",
            });
          })
        );
      };
      const result = {
        name: newService.name,
        date,
        instances: instanceNames,
      };
      uploadPhotos().then(() =>
        successResponse(res, result, "Service Added", "service", 201)
      );
    } catch (error) {
      failedResponse(res, "Failed to add service");
    }
  },
  deleteService: async (req, res) => {
    try {
      const result = await service.destroy({
        where: {
          id: req.body.id,
        },
      });
      successResponse(res, result, "Service Deleted", "service");
    } catch (error) {
      failedResponse(res, "Failed to add service");
    }
  },
};
