const catchAsync = (fn) => async (req,res,next) => {
    return Promise.resolve(fn(req,res,next)).catch((err) => next(err))
}
export {catchAsync}