import jwt from 'jsonwebtoken';

export const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];
        console.log('token : ', token);

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Unauthorized: Invalid token"
                });
            }
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};
