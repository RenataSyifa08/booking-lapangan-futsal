"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [lapangan, setLapangan] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [durasi, setDurasi] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Manual");

  async function kirimBooking() {
    const { error } = await supabase.from("bookings").insert([
      {
        nama,
        lapangan,
        tanggal,
        jam,
        durasi,
        payment_method: paymentMethod,
        payment_status: "Belum Bayar",
        status: "Pending",
      },
    ]);
console.log(error)
    if (error) {
  alert(error.message);
  console.log(error);
  return;
}

    alert("Booking berhasil masuk database!");

    setNama("");
    setTanggal("");
    setJam("");
    setDurasi("");
    setLapangan("");
  }

  return (
    <div className="min-h-screen bg-green-100 p-10">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Booking Lapangan Futsal
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {["Lapangan A", "Lapangan B", "Lapangan C"].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold">{item}</h2>

            <p className="mt-2 text-gray-600">
              Tersedia untuk booking
            </p>

            <button
              onClick={() => setLapangan(item)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Booking
            </button>
          </div>
        ))}
      </div>

      {lapangan && (
        <div className="bg-white max-w-xl mx-auto p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Form Booking {lapangan}
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nama lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="time"
              value={jam}
              onChange={(e) => setJam(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Durasi main / jam"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="button"
              onClick={kirimBooking}
              className="w-full bg-green-600 text-white p-3 rounded-lg"
            >
              Kirim Booking
            </button>
          </form>
        </div>
      )}<div className="bg-white p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold mb-4">
    Form Booking
  </h2>

  <input
    type="text"
    placeholder="Nama"
    value={nama}
    onChange={(e) => setNama(e.target.value)}
    className="w-full border p-3 rounded-lg mb-3"
  />

  <input
    type="date"
    value={tanggal}
    onChange={(e) => setTanggal(e.target.value)}
    className="w-full border p-3 rounded-lg mb-3"
  />

  <input
    type="time"
    value={jam}
    onChange={(e) => setJam(e.target.value)}
    className="w-full border p-3 rounded-lg mb-3"
  />

  <input
    type="number"
    placeholder="Durasi main / jam"
    value={durasi}
    onChange={(e) => setDurasi(e.target.value)}
    className="w-full border p-3 rounded-lg mb-3"
  />
<select
  value={paymentMethod}
  onChange={(e) => setPaymentMethod(e.target.value)}
  className="w-full border p-3 rounded-lg mb-3"
>
  <option value="Transfer Manual">Transfer Manual</option>
  <option value="Cash">Cash</option>
  <option value="E-Wallet">E-Wallet</option>
</select>
  <button
    type="button"
    onClick={kirimBooking}
    className="w-full bg-green-600 text-white p-3 rounded-lg"
  >
    Kirim Booking
  </button>
</div>
    </div>
  );
}