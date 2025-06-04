import React, { useState } from "react";

export default function FunPaymentPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipient || !amount || !method || parseFloat(amount) <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    let message = `✅ ₹${amount} sent to ${recipient} via ${method}!`;

    if (method === "Girlfriend") {
      message += "\n💘 Warning: Emotional interest may apply. No refunds. 😂";
    }

    alert(message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          💖 Fun Payment Page
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700">
              Recipient Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Riya, Pizza Guy, Netflix"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Note (optional)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. For coffee ☕ or drama 💅"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={method === "UPI"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={method === "Credit Card"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Girlfriend"
                  checked={method === "Girlfriend"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span>Girlfriend 💃</span>
              </label>
            </div>

            {method === "Girlfriend" && (
              <p className="mt-2 text-pink-600 text-sm italic">
                💘 Caution: High maintenance. Emotional surcharge applies.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Send ₹{amount || 0}
          </button>
        </form>
      </div>
    </div>
  );
}
