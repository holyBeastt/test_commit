// Logging middleware
const crypto = require("crypto")

module.exports = (req, res, next) => {
    const traceId = crypto.randomUUID();
    
    const start = Date.now()

    req.traceId = traceId;

    console.log(traceId, req.method, req.url)

    res.on("finish", () => {
        const duration = Date.now() - start

        console.log("Response:", {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: duration + "ms"
        })
    })

    next()
}