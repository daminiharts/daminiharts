import nodemailer from "nodemailer";

const workshopLinks = {
  "10-Day Watercolor Course":
    process.env.WATERCOLOR_COURSE_LINK,

  "10-Day Acrylic Painting Course":
    process.env.ACRYLIC_COURSE_LINK,

  "15-Day Complete Art Course":
    process.env.COMPLETE_ART_COURSE_LINK,
};

export async function sendReceiptEmail({
  to,
  name,
  amount,
  paymentId,
  products,
  address,
  phone,
  pincode,
  city,
  state,
}) {
  const transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  const hasWorkshop = products.some(
    (item) => item.type === "workshop"
  );

  const workshopLinksArr = products
    .filter(
      (item) => item.type === "workshop"
    )
    .map(
      (item) =>
        workshopLinks[item.title]
    )
    .filter(Boolean);

  const youtubePlaylistLink = [
    ...new Set(workshopLinksArr),
  ];

  const productList = products
    .map((p) => {
      const itemTitle = p.title || p.name || "Product";
      const itemPrice = Number(p.offer || p.discountedPrice || p.price || p.originalPrice || 0);
      const itemQty = p.quantity || 1;
      return `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">
          ${itemTitle}
        </td>

        <td style="padding:8px;border:1px solid #ddd;">
          ₹${itemPrice}
        </td>

        <td style="padding:8px;border:1px solid #ddd;">
          ${itemQty}
        </td>

        <td style="padding:8px;border:1px solid #ddd;">
          ₹${itemPrice * itemQty}
        </td>
      </tr>
    `;
    })
    .join("");

  await transporter.sendMail({
    from: `"Damini Arts" <${process.env.EMAIL_USER}>`,

    to,

    bcc: process.env.EMAIL_USER,

    subject:
      "🧾 Payment Receipt - Damini Arts",

    html: `
      <div style="max-width:600px;margin:auto;font-family:Arial;padding:20px;">
        <h2>
          Thank You, ${name}! 🎉
        </h2>

        <table style="width:100%;border-collapse:collapse;">
          ${productList}
        </table>

        <p>
          <strong>Offer Price:</strong>
          ₹${(amount / 100).toFixed(2)}
        </p>

        <p>
          <strong>Payment ID:</strong>
          ${paymentId}
        </p>

        ${
          hasWorkshop &&
          youtubePlaylistLink.length > 0
            ? `
          <h3>🎨 Course Access</h3>

          <ul>
            ${youtubePlaylistLink
              .map(
                (link) => `
                <li>
                  <a href="${link}">
                    ${link}
                  </a>
                </li>
              `
              )
              .join("")}
          </ul>
        `
            : ""
        }

        <p>
          ${address},
          ${city},
          ${state}
          - ${pincode}
        </p>

        <p>${phone}</p>
      </div>
    `,
  });
}