const { ZodError } = require('zod');

const printErrorHandler = (error, req, res, next) => {
    console.log(error.stack);
    next(error);
}

const zodErrorHandler = (error, req, res, next) => {
    if(error instanceof ZodError){
        return res.status(400).json({
            error: "Error de validación",
            details: error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            }))
        });
    }else{
        next(error)
    }
}

const boomErrorHandler = (error, req, res, next) => {
    if(error.isBoom){
        res.status(error.output.statusCode).json({
            message: error.output.payload
        });
    } else {
        next(error);
    }
}

const generalErrorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
}

module.exports = { printErrorHandler, boomErrorHandler,
                    zodErrorHandler, generalErrorHandler }