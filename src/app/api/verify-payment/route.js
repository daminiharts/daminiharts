import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendReceiptEmail } from "@/libs/sendReceiptEmail";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      address,
      pincode,
      city,
      state,
      cartItems,
      total,
    } = body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature ===
      razorpay_signature
    ) {
      // Send receipt email reliably
      try {
        if (email && cartItems) {
          await sendReceiptEmail({
            to: email,
            name,
            amount: total,
            paymentId: razorpay_payment_id,
            products: cartItems,
            address,
            phone,
            pincode,
            city,
            state,
          });
        }
      } catch (emailErr) {
        console.error("Failed to send receipt email from verify-payment:", emailErr);
      }

      return NextResponse.json({
        success: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}