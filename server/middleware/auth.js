import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({ message: "Invalid token." })
            next();
        }
        else {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, 'testSolveIt');

            req.userId = decodedData?.id;
        }

        next();
        }
    } catch (error) {
        console.log(error);
    }
}

export default auth;