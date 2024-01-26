import jwt from 'jsonwebtoken';

export const jwtVerify = async (req, res) => {
    const authHeader = await req.headers.authorization;
    const token = await authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "Unauthorized: Invalid token"
            });
        }
        return res.status(200).json(decoded);
    });
};