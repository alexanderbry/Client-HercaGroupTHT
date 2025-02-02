import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/api";

interface OverviewData {
  Marketing: string;
  Bulan: string;
  Omzet: number;
  "Komisi %": number;
  "Komisi Nominal": number;
}

interface User {
  username: string;
}

const HomePage: React.FC = () => {
  const getOverviewData = async () => {
    try {
      const res = await api.get("/overview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOverviewData(res.data.data);
    } catch (error) {
      alert(error);
    }
  };

  const user: User = { username: "alexanderbryan" };

  const [overviewData, setOverviewData] = useState([] as OverviewData[]);

  const totalRevenue = overviewData.reduce((sum, item) => sum + item.Omzet, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  useEffect(() => {
    getOverviewData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <p className="text-3xl font-semibold mt-2">
            {totalRevenue.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <Link
          to="/transaction"
          className="col-span-2 p-4 bg-orange-400 rounded-lg shadow-lg flex items-center justify-center text-xl text-gray-900 font-bold"
        >
          Mulai Belanja
        </Link>
        <div className="p-4 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold">Selamat Datang!</h3>
          <p className="text-3xl font-semibold mt-2">{user.username}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-8">
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Overview</h3>
          <div className="space-y-6 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            <div className="w-full p-4">
              <div className="space-y-6 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marketing
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission Rate
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {overviewData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.Marketing}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.Bulan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row.Omzet)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {row["Komisi %"]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          {formatCurrency(row["Komisi Nominal"])}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
