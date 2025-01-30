import React, { useState } from "react";
import { Link } from "react-router";

interface OverviewData {
  marketing: string;
  bulan: string;
  omzet: number;
  komisi_persen: number;
  komisi_nominal: number;
}

interface User {
  username: string;
}

const HomePage: React.FC = () => {
  const hardcodedData: OverviewData[] = [
    {
      marketing: "Alfandy",
      bulan: "Januari",
      omzet: 138000000,
      komisi_persen: 2.5,
      komisi_nominal: 3450000,
    },
    {
      marketing: "Mery",
      bulan: "Januari",
      omzet: 80000000,
      komisi_persen: 0,
      komisi_nominal: 0,
    },
    {
      marketing: "Danang",
      bulan: "Januari",
      omzet: 44320000,
      komisi_persen: 0,
      komisi_nominal: 0,
    },
    {
      marketing: "Alfandy",
      bulan: "Februari",
      omzet: 75000000,
      komisi_persen: 0,
      komisi_nominal: 0,
    },
    {
      marketing: "Mery",
      bulan: "Februari",
      omzet: 1010020000,
      komisi_persen: 10,
      komisi_nominal: 101002100,
    },
    {
      marketing: "Danang",
      bulan: "Februari",
      omzet: 205000000,
      komisi_persen: 5,
      komisi_nominal: 10250100,
    },
  ];

  const user: User = { username: "alexanderbryan" };

  const [overviewData, setOverviewData] = useState<
    Record<string, OverviewData[]>
  >(
    hardcodedData.reduce(
      (acc: Record<string, OverviewData[]>, item: OverviewData) => {
        if (!acc[item.bulan]) {
          acc[item.bulan] = [];
        }
        acc[item.bulan].push(item);
        return acc;
      },
      {}
    )
  );

  const totalRevenue = hardcodedData.reduce((sum, item) => sum + item.omzet, 0);
  const totalCommission = hardcodedData.reduce(
    (sum, item) => sum + item.komisi_nominal,
    0
  );
  console.log(overviewData);

  return (
    <div className="text-white min-h-screen p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <p className="text-3xl font-semibold mt-2">
            {totalRevenue.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
        <Link
          to="/transaction"
          className="col-span-2 p-4 bg-orange-400 rounded-lg shadow-lg flex items-center justify-center text-xl text-gray-900 font-semibold"
        >
          Mulai Belanja
        </Link>
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold">Selamat Datang!</h3>
          <p className="text-3xl font-semibold mt-2">{user.username}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-8">
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold mb-4">Overview</h3>
          <div className="space-y-6 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {Object.entries(overviewData).map(([bulan, records]) => (
              <div key={bulan} className="mb-4">
                <h4 className="text-md font-bold mb-2 border-b border-gray-600 pb-2">
                  {bulan}
                </h4>
                {records.map((title, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-2"
                  >
                    <div>
                      <p className="font-semibold">{title.marketing}</p>
                      <p className="text-sm text-gray-400">
                        Omzet :{" "}
                        {title.omzet.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          title.komisi_nominal === 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {title.komisi_nominal.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <p className="text-sm text-gray-400">
                        Komisi : {title.komisi_persen}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
