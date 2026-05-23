"use client";

import { toast } from "@/utils/toast";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  // Load Razorpay only when needed
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      toast.show("Please enter your full name.", "error");
      return false;
    }

    if (!emailRegex.test(form.email)) {
      toast.show("Please enter a valid email address.", "error");
      return false;
    }

    if (!phoneRegex.test(form.phone)) {
      toast.show("Please enter a valid 10-digit phone number.", "error");
      return false;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      toast.show("Please enter a valid 6-digit pincode.", "error");
      return false;
    }

    return true;
  };

  const resetCheckout = () => {
    clearCart();

    localStorage.removeItem("checkoutForm");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
    });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.pincode ||
      !form.address ||
      !form.city ||
      !form.state
    ) {
      toast.show("Please fill all details.", "error");
      return;
    }

    if (!validateForm()) return;

    if (!total || total <= 0) {
      toast.show(
        "Cart total is invalid. Please try again.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      // Load Razorpay SDK
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        toast.show("Razorpay SDK failed to load.", "error");
        return;
      }

      localStorage.setItem(
        "checkoutForm",
        JSON.stringify(form)
      );

      const savedform = JSON.parse(
        localStorage.getItem("checkoutForm") || "{}"
      );

      // Create Order
      const res = await fetch(`/api/create-order`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: total * 100,

          name: savedform.name,
          email: savedform.email,
          phone: savedform.phone,
          address: savedform.address,
          pincode: savedform.pincode,
          city: savedform.city,
          state: savedform.state,

          cartItems,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const orderData = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: orderData.amount,

        currency: orderData.currency,

        name: "Daminih Arts",

        description: "Order Payment",

        order_id: orderData.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `/api/verify-payment`,
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  name: savedform.name,
                  email: savedform.email,
                  phone: savedform.phone,
                  address: savedform.address,
                  pincode: savedform.pincode,
                  city: savedform.city,
                  state: savedform.state,

                  cartItems,

                  total: total * 100,
                }),
              }
            );

            const result = await verifyRes.json();

            if (result.success) {
  toast.show(
    "✅ Payment Successful!",
    "success"
  );

              resetCheckout();

              router.push("/success");
            } else {
              toast.show(
                "❌ Payment verification failed!",
                "error"
              );
            }
          } catch (error) {
            console.error(error);

            toast.show(
              "Payment verification failed.",
              "error"
            );
          }
        },

        prefill: {
          name: savedform.name,
          email: savedform.email,
          contact: savedform.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (error) {
      console.error("Checkout Error:", error);

      toast.show(
        "Something went wrong during checkout.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] py-12 px-4 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center mb-10">
          Checkout
        </h1>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-5">
          <h2 className="text-xl font-medium text-black">
            Customer Details
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
            />
          </div>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition"
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            rows={4}
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none text-black rounded-xl px-4 py-3 transition resize-none"
          />

          {/* Total */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-medium text-gray-700">
              Total
            </span>

            <span className="text-2xl font-bold text-black">
              ₹{total}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-medium text-lg transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800 cursor-pointer"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;