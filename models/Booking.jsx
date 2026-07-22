import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    requesterName: {
      type: String,
      required: true,
    },

    requesterEmail: {
      type: String,
      required: true,
    },

    requesterPhone: {
      type: String,
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    appointmentSlot: {
      type: String,
      enum: [
        "09:00-13:00",
        "14:00-18:00",
      ],
      required: true,
    },

    purpose: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index(
  {
    appointmentDate: 1,
    appointmentSlot: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);