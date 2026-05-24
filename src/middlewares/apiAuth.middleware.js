import Developer from "../developer/developer.model.js";

export const validateDeveloperApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ message: "API key required" });
    }

    
    const developer = await Developer.findOne({ apiKey });
    if (!developer) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    req.developer = developer;
    next();
  } catch (error) {
    next(error);
  }
};
