const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).send({
//             error: "Access denied",
//         });
//     }
//     try {
//         const decode = jwt.verify(token, "secret");
//         console.log(decode);
//         next();
//     } catch (err) {
//         return res.status(401).send({
//             error: "Invalid token",
//         });
//     }
// }

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({
            error: "Access denied",
        });
    }

    // Expecting: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(400).send({
            error: "Invalid token format",
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, "secret"); // use env in prod
        req.user = decoded; // ✅ Attach to req.user
        next();
    } catch (err) {
        return res.status(401).send({
            error: "Invalid token",
        });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            error: "Forbidden",
        });
    }
}

module.exports = { verifyToken, isAdmin };