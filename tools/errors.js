module.exports = {
    badRequest: function (res, error) {
        res.status(400).send({
            error: error
        })
    },
    internalError: function (res, error) {
        res.status(500).send({
            error: error
        })
    },
    forbidden: function(res, error) {
        res.status(403).send({
            error: error
        })
    }
}