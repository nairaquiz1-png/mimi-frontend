"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";

export default function FundWalletPage() {
  const [amount, setAmount] = useState("");

  const handleFund = async () => {
    const token = localStorage.getItem("access");

    const res = await fetch("http://62.171.148.243:8000/api/wallet/fund/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });

    const data = await res.json();

    if (data.payment_link) {
      window.location.href = data.payment_link;
    } else {
      alert("Payment initialization failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-xl mx-auto px-6">

          <h1 className="text-3xl font-bold mb-8">
            💳 Fund Wallet
          </h1>

          <div className="bg-white rounded-xl p-6 shadow">

        <label className="block mb-2 font-medium">
            Amount (₦)
        </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-6"
            />

            <button
              onClick={handleFund}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Proceed to Payment
            </button>

          </div>

        </div>
      </main>
    </>
  );
}