import { orderCache } from "@/libs/order-cache";
import { sendReceiptEmail } from "@/libs/sendReceiptEmail";
import crypto from "crypto";


export async function POST(req) {
  try {
    const rawBody =
      await req.text();

    const signature =
      req.headers.get(
        "x-razorpay-signature"
      );

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_WEBHOOK_SECRET
        )
        .update(rawBody)
        .digest("hex");

    if (
      expectedSignature !==
      signature
    ) {
      return new Response(
        "Invalid signature",
        {
          status: 400,
        }
      );
    }

    const payload =
      JSON.parse(rawBody);

    if (
      payload.event ===
      "payment.captured"
    ) {
      const payment =
        payload.payload.payment
          .entity;

      const razorpay_order_id =
        payment.order_id;

      const orderDetails =
        orderCache.get(
          razorpay_order_id
        );

      if (orderDetails) {
        await sendReceiptEmail({
          to: orderDetails.email,

          name: orderDetails.name,

          amount:
            orderDetails.amount,

          paymentId: payment.id,

          products:
            orderDetails.cartItems,

          address:
            orderDetails.address,

          phone:
            orderDetails.phone,

          pincode:
            orderDetails.pincode,

          city:
            orderDetails.city,

          state:
            orderDetails.state,
        });
      }
    }

    return new Response("OK", {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return new Response(
      "Webhook Error",
      {
        status: 500,
      }
    );
  }
}