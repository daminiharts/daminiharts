"use client";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "@/utils/toast";

const SuccessPage = () => {
  useEffect(() => {
    toast.show("🎉 Thank you for your order!", "success");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-yellow-600">Payment Successful 🎉</h1>
        <p className="text-gray-700">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
