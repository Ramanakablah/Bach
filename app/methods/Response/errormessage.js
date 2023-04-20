function ErrorMessage(res, code = 400, status = "Failed", mssg = null, errmssg=null) {
    res.status(code).json({ status, mssg, errmssg })
}

module.exports = ErrorMessage