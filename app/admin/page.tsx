"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  nama: string;
  lapangan: string;
  tanggal: string;
  jam: string;
  durasi: string;
  status: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const admin = localStorage.getItem("adminLogin");

    if (admin !== "true") {
      router.push("/login-admin");
      return;
    }

    setIsLogin(true);

    const data = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(data);
  }, [router]);

  if (!isLogin) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          Admin Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("adminLogin");
            router.push("/login-admin");
          }}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Data Booking</h2>

        <table className="w-full border">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="p-3 border">Nama</th>
              <th className="p-3 border">Lapangan</th>
              <th className="p-3 border">Tanggal</th>
              <th className="p-3 border">Jam</th>
              <th className="p-3 border">Durasi</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((item, index) => (
              <tr key={index}>
                <td className="p-3 border">{item.nama}</td>
                <td className="p-3 border">{item.lapangan}</td>
                <td className="p-3 border">{item.tanggal}</td>
                <td className="p-3 border">{item.jam}</td>
                <td className="p-3 border">{item.durasi} jam</td>
                <td className="p-3 border text-orange-500">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}