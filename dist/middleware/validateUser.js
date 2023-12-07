"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const validateUser = (req, res, next) => {
    var _a;
    const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!user) {
        return res
            .status(401)
            .send({ message: 'User Credentials not Valid' });
    }
    try {
        res.status(200).json("User validated!");
    }
    catch (ex) {
        res.status(500).send({ message: 'Invalid Credentials' });
        next(ex);
    }
};
exports.validateUser = validateUser;
