export const errorHandler = (err, req, res, next) => {

    console.error(err);

    res.status(err.code || 500).send({
        status: 'error',
        error: err.name,
        message: err.message,
        cause: err.cause
    });

};