import React, { useState } from "react";

export default function Dashboard() {
  const [showUsersTable, setShowUsersTable] = useState(false);

  const toggleUsersTable = () => {
    setShowUsersTable(!showUsersTable);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="bg-forest text-secondary w-full md:w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <ul className="mt-4">
            <li className="py-2">
              <a
                href="#"
                className="block hover:bg-gray-700 rounded-md px-4 py-2 text-secondary"
              >
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a
                href="#"
                onClick={toggleUsersTable}
                className="block hover:bg-gray-700 rounded-md px-4 py-2 text-secondary"
              >
                Users
              </a>
            </li>
            {/* Tambahkan opsi menu lainnya sesuai kebutuhan */}
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-soft-yellow p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Total Pengguna</h2>
            <p className="text-2xl font-bold">100</p>
          </div>
          <div className="bg-soft-yellow p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Pengguna Aktif</h2>
            <p className="text-2xl font-bold">80</p>
          </div>
          <div className="bg-soft-yellow p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Pengguna Tidak Aktif</h2>
            <p className="text-2xl font-bold">20</p>
          </div>
        </div>

        {/* Grafik (Placeholder) */}
        <div className="mt-8 bg-soft-yellow p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Grafik Statistik</h2>
          <p className="text-gray-600">Grafik akan ditampilkan di sini</p>
        </div>

        {/* Tabel Pengguna */}
        {showUsersTable && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Daftar Pengguna</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-secondary">
                <thead>
                  <tr className="bg-soft-yellow border-b border-secondary">
                    <th className="text-left py-2 px-3 border-r border-secondary">
                      ID
                    </th>
                    <th className="text-left py-2 px-3 border-r border-secondary">
                      Nama
                    </th>
                    <th className="text-left py-2 px-3 border-r border-secondary">
                      Email
                    </th>
                    <th className="text-left py-2 px-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-secondary">
                    <td className="py-2 px-3 border-r border-secondary">1</td>
                    <td className="py-2 px-3 border-r border-secondary">
                      John Doe
                    </td>
                    <td className="py-2 px-3 border-r border-secondary">
                      john.doe@example.com
                    </td>
                    <td className="py-2 px-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-secondary">
                    <td className="py-2 px-3 border-r border-secondary">2</td>
                    <td className="py-2 px-3 border-r border-secondary">
                      Jane Smith
                    </td>
                    <td className="py-2 px-3 border-r border-secondary">
                      jane.smith@example.com
                    </td>
                    <td className="py-2 px-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                        Hapus
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-secondary">
                    <td className="py-2 px-3 border-r border-secondary">3</td>
                    <td className="py-2 px-3 border-r border-secondary">
                      Michael Johnson
                    </td>
                    <td className="py-2 px-3 border-r border-secondary">
                      michael.johnson@example.com
                    </td>
                    <td className="py-2 px-3">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md">
                        Hapus
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
