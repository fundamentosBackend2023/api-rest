const globalMw = (req, res, next) => {
    console.log('hello from global mw');
    next();
}

const rootMw = (req, res, next) => {
    console.log('hello from root mw');
    next();
}

const routeMw = (req, res, next) => {
    console.log('This is a route mw');
    next();
}

const greetingMw = (req, res, next) => {
    console.log('GREETING MW');
    next();
}

const mwClosure = (firstName, color) => {
    return (req, res, next) => {
        console.log('Hello',firstName,'i know your fc is',color);
        next();
    }
}

module.exports = { globalMw, rootMw, routeMw, greetingMw, mwClosure };