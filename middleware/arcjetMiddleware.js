import aj from "../config/arcjet.js";
export const arcjetMiddleware = async (req, res, next) => {
  try {
    const desicion = await aj.protect(req, { requested: 1 })
    if (desicion.isDenied()) {
      if (desicion.reason.isRateLimit()) {
        return res.status(429).json({ success: false, message: "Too many requests, please try again later." })
      }
      if (desicion.reason.isBot()) {
        return res.status(403).json({ success: false, message: "Bots are not allowed." })
      }
      return res.status(403).json({ success: false, message: "Access denied." })
    }
    next()

  } catch (error) {
    console.error("Arcjet error:", error)
    next(error)
  }

}