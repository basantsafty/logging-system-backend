import jwt from "jsonwebtoken";

export const validateAuthToken = async (request, response, next) => {
    const { authorization } = request.headers;

    try
    {
        console.log(authorization);

        if (!authorization || typeof authorization !== "string")
        {
            return response.status(401).json({ message: "Unauthorized" });
        }

        const authorizationHeaderValue = authorization.split(" ");

        if (authorizationHeaderValue.length !== 2 || authorizationHeaderValue[0] !== 'Bearer' || !authorizationHeaderValue[1])
        {
            return response.status(401).json({ message: "Unauthorized" });
        }
          
        
        if (tokenBlacklist.includes(token)) {
            return res.status(401).json({ message: "Token has been revoked" });
        }


        const token = authorizationHeaderValue.at(-1);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        request.userId = decodedToken.userId;

        return next();
    } catch(error)
    {
        return next(error);
    }
}