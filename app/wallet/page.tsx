"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type Transaction = {
  id: number;
  transaction_type: string;
  amount: string;
  description: string;
  created_at: string;
};

export default function WalletPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    // Fetch wallet balance
    fetch("http://62.171.148.243:8000/api/wallet/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBalance(data.balance);
      });

    // Fetch transactions
    fetch("http://62.171.148.243:8000/api/wallet/transactions/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-3xl font-bold mb-8">💰 Wallet</h1>

          {/* Balance Card */}
          <div className="bg-white rounded-xl p-6 mb-10 shadow">
            <h2 className="text-lg text-gray-500 mb-2">Current Balance</h2>
            <p className="text-3xl font-bold">
              {balance !== null ? `₦${balance}` : "Loading..."}
            </p>

        <a
            href="/wallet/fund"
            className="inline-block mt-4 bg-black text-white px-6 py-2 rounded-lg"
>
            Fund Wallet
        </a>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Transaction History
            </h2>

            {transactions.length === 0 && (
              <p className="text-gray-500">No transactions yet.</p>
            )}

            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.created_at).toLocaleString()}
                  </p>
                </div>

                <div
                  className={
                    tx.transaction_type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {tx.transaction_type === "credit" ? "+₦" : "-₦"}{tx.amount}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}