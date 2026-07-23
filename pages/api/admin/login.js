import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res.setHeader(
      "Set-Cookie",
      `admin_token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 8}; SameSite=Strict`,
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
