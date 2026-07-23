import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,

  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export async function sendBookingNotification(booking) {
  try {
    const info = await transporter.sendMail({
      from: '"Klinik Migrasi PQC Booking" <a.safwanrazali@gmail.com>',

      to: "faridatulakhma@upm.edu.my",

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

    console.log("EMAIL SENT:", info.messageId);

    return true;
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return false;
  }
}
