export { handleNotFound, errorHandler };

function handleNotFound(req, res, next) {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on this server`,
    // });

    var error = new Error(`Can't find ${req.originalUrl} on this server.`);
    error.status = "fail";
    error.statusCode = 404;
    next(error);
}

function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        statusCode: err.statusCode,
    });
    // var statusCode = err.statusCode === 200 ? 500 : err.statusCode;
    // res.status(statusCode).json({
    //     message: err.message,
    //     stack: process.env.NODE_ENV !== "production" ? err.stack : null,
    // });
}
