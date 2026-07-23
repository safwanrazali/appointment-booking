import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingNotification(booking) {
  try {
    const result = await resend.emails.send({
      from: "Klinik Migrasi PQC Booking <onboarding@resend.dev>",
      to: ["asrya252@gmail.com"],
      subject: `New Booking - ${booking.referenceNo}`,
      html: `
        <h2>New Appointment Booking</h2>

        <p><strong>Reference No:</strong> ${booking.referenceNo}</p>
        <p><strong>Name:</strong> ${booking.requesterName}</p>
        <p><strong>Email:</strong> ${booking.requesterEmail}</p>
        <p><strong>Phone:</strong> ${booking.requesterPhone}</p>
        <p><strong>Date:</strong> ${booking.appointmentDate}</p>
        <p><strong>Slot:</strong> ${booking.appointmentSlot}</p>
        <p><strong>Purpose:</strong> ${booking.purpose}</p>
      `,
    });

    console.log("RESEND RESULT:", JSON.stringify(result));

    return true;
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return false;
  }
}
