import { connectDB } from "../../../lib/mongodb";
import Holiday from "../../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await Holiday.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Holiday deleted",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
  });
}
