import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
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

      subject: `New Appointment Booking - ${booking.referenceNo}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          
          <div style="background:#7b1e3a; color:white; padding:20px; border-radius:8px 8px 0 0;">
            <h2 style="margin:0;">
              Klinik Migrasi PQC Booking
            </h2>
          </div>

          <div style="border:1px solid #ddd; padding:20px; border-top:none;">

            <p>
              A new appointment booking has been submitted through the
              <strong>Klinik Migrasi PQC Booking Platform</strong>.
            </p>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Reference No</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.referenceNo}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Name</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.requesterName}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Email</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.requesterEmail}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Phone Number</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.requesterPhone}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Agency / Entity:</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                   ${booking.agency}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Appointment Date</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.appointmentDate}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Time Slot</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.appointmentSlot}
                </td>
              </tr>

              <tr>
                <td style="padding:8px; border:1px solid #ddd;">
                  <strong>Purpose</strong>
                </td>
                <td style="padding:8px; border:1px solid #ddd;">
                  ${booking.purpose}
                </td>
              </tr>
            </table>

            <br />

            <p>
              Please review the booking details in the Klinik Migrasi PQC Admin Dashboard.
            </p>

          </div>

          <div style="background:#f5f5f5; padding:15px; text-align:center; color:#666; font-size:12px; border-radius:0 0 8px 8px;">
            Klinik Migrasi PQC Booking Platform<br />
            Pusat Teknologi Dan Pengurusan Kriptologi Malaysia
          </div>

        </div>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

    return true;
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return false;
  }
}
