function ErrorHandler(err, req, res, next) {
    let status = err.statusCode || 500;
    if (err.length) {
        err.forEach(error => {
            LogError(error);
        });
        status = 409;        
    } else {
        LogError(err);
        if (res.headersSent)
            return next(err);               
    }
    res.status(status).json({
        "status": status,
        "error": `${err || "Something went wrong"}`
    });
}

function LogError(error) {
    console.log("Received error", error.message);
    console.log("Stacktrace", error.stack);
}

module.exports = ErrorHandler;