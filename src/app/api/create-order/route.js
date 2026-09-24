
import { orderCache } from "@/libs/order-cache";
import { razorpay } from "@/libs/razorpay";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(req) {
  try {
    const body = await req.json();

    const {
      amount,
      name,
      email,
      phone,
      address,
      pincode,
      city,
      state,
      cartItems,
    } = body;

    const order =
      await razorpay.orders.create({
        amount: Math.round(amount),

        currency: "INR",

        receipt: `rcpt_${Date.now()}`,
      });

    orderCache.set(order.id, {
      email,
      name,
      amount,
      cartItems,
      address,
      phone,
      pincode,
      city,
      state,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error creating order",
      },
      {
        status: 500,
      }
    );
  }
}