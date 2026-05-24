import Application from "./application.model.js";

export const createApplication = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.userId);

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
     
    }

    const application = await Application.create({
      name,
      developer: req.userId 
    
    });
    

    res.status(201).json({
      message: "Application created successfully",
      application
    });
  } catch (error) {
    next(error);
  }
};

