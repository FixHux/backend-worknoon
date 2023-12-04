"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
exports.ResponseService = {
    success(res, message, data = null, meta = null) {
        const payload = {
            message,
            status: true,
            error: false,
        };
        if (data)
            payload.data = data;
        if (meta)
            payload.meta = meta;
        res.status(200).json(payload);
        return {};
    },
};
