import { connectDB } from "../../../lib/mongodb";
import Holiday from "../../../models/Holiday";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const holidays = await Holiday.find().sort({
      date: 1,
    });

    return res.status(200).json({
      success: true,
      data: holidays,
    });
  }

  if (req.method === "POST") {
    try {
      const holiday = await Holiday.create(req.body);

      return res.status(201).json({
        success: true,
        data: holiday,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  return res.status(405).json({
    success: false,
  });
}
