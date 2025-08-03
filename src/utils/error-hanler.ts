import httpStatus from "http-status";
import { Response } from "express";

const handleError = (error: any, res?: Response, resCode = httpStatus.BAD_REQUEST) => {
    console.log(error.stack);
    if (res) {
        return res.status(httpStatus.BAD_REQUEST).send({ "message": (error?.errors && error?.errors[0]?.message) ? error?.errors[0]?.message : error.message });
    }
}

export default handleError;