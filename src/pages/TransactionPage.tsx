import React, { useState } from "react";
import { api } from "../api/api";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface MarketingAgent {
  id: number;
  name: string;
}

interface ShippingLocation {
  id: number;
  name: string;
  address: string;
  cargo_fee: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Med Flash II",
    price: 100000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/09ec403adb84e71b45ea26b1e0f17f290_mobile.png",
  },
  {
    id: 2,
    name: "Helios III",
    price: 200000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/b2f8596dc4560c295ee5cdc1ba116b710_mobile.png",
  },
  {
    id: 3,
    name: "Power Flash",
    price: 300000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/c9107d6618a19c2406fe0890c2d9917a0_mobile.png",
  },
  {
    id: 4,
    name: "Cool Shaping",
    price: 100000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/dff93fc6d4461225bae3d5517dfb5f490_mobile.png",
  },
  {
    id: 5,
    name: "Asset",
    price: 200000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/d6c0c87617aa6ec59e1c46741e9a358e0_mobile.png",
  },
  {
    id: 6,
    name: "Promi Blue",
    price: 300000,
    imageUrl:
      "https://www.hercaweb.com/images/gallery/a255c476dceae869a5d06305deb91fed0_mobile.png",
  },
];

const marketingAgents: MarketingAgent[] = [
  {
    id: 1,
    name: "Alfandy",
  },
  {
    id: 2,
    name: "Mery",
  },
  {
    id: 3,
    name: "Danang",
  },
];

const shippingLocations: ShippingLocation[] = [
  {
    id: 1,
    name: "Alamat Rumah",
    address: "Jl. Contoh No. 123, Jakarta",
    cargo_fee: 50000,
  },
  {
    id: 2,
    name: "Alamat Kantor",
    address: "Jl. Bisnis No. 456, Surabaya",
    cargo_fee: 75000,
  },
];

const TransactionPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedMarketingAgent, setSelectedMarketingAgent] =
    useState<MarketingAgent | null>(null);
  const [selectedShippingLocation, setSelectedShippingLocation] =
    useState<ShippingLocation | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const totalProductPrice = cart.reduce(
      (total, product) => total + product.price,
      0
    );
    const cargoFee = selectedShippingLocation
      ? selectedShippingLocation.cargo_fee
      : 0;
    return totalProductPrice + cargoFee;
  };

  const handleCheckout = async () => {
    if (!selectedMarketingAgent || !selectedShippingLocation) {
      alert("Silakan pilih Marketing Agent dan Lokasi Pengiriman");
      return;
    }

    const checkoutData = {
      marketing_id: selectedMarketingAgent.id,
      cargo_fee: selectedShippingLocation.cargo_fee,
      total_balance: calculateTotal(),
    };

    await api.post("/transaction/create", checkoutData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Checkout berhasil!");

    setCart([]);
    setSelectedMarketingAgent(null);
    setSelectedShippingLocation(null);
  };

  return (
    <div className="bg-gray-100 h-screen p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        {/* Daftar Produk */}
        <div className="col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">Belanja Produk</h1>
          <div className="grid grid-cols-3 gap-4">
            {productsData.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-lg font-bold mt-2">
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => addToCart(product)}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Keranjang dan Checkout */}
        <div className="space-y-6 overflow-y-auto max-h-screen">
          {/* Pilih Marketing Agent */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Pilih Marketing Agent</h2>
            <div className="space-y-2">
              {marketingAgents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedMarketingAgent?.id === agent.id
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedMarketingAgent(agent)}
                >
                  <p className="font-semibold">{agent.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pilih Lokasi Pengiriman */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Pilih Lokasi Pengiriman</h2>
            <div className="space-y-2">
              {shippingLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-3 border rounded-md cursor-pointer ${
                    selectedShippingLocation?.name === location.name
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedShippingLocation(location)}
                >
                  <p className="font-semibold">{location.name}</p>
                  <p className="text-sm text-gray-600">{location.address}</p>
                  <p className="text-sm text-gray-600">
                    Ongkos Kirim:{" "}
                    {location.cargo_fee.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Keranjang Belanja */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Keranjang Anda kosong.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-300 pb-2"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2">
                        {item.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
                <li className="font-semibold flex justify-between">
                  <span>Total Produk</span>
                  <span>
                    {cart
                      .reduce((total, item) => total + item.price, 0)
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                  </span>
                </li>
                <li className="font-semibold flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span>
                    {selectedShippingLocation
                      ? selectedShippingLocation.cargo_fee.toLocaleString(
                          "id-ID",
                          {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )
                      : "0"}
                  </span>
                </li>
                <li className="font-bold text-lg flex justify-between">
                  <span>Grand Total</span>
                  <span>
                    {calculateTotal().toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </li>
              </ul>
            )}
          </div>
          {/* Tombol Checkout */}
          <div className="flex justify-end">
            <button
              className="w-full bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
