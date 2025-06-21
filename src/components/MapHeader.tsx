import { useState } from "react";

const MapHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ヘッダー */}
      <header className="h-[85px] border-b border-gray-300 py-3 flex items-center">
        <div className="container mx-auto flex justify-between">
          <div
            className="inline-flex h-11 items-center justify-center rounded-md bg-red-600 px-6 font-bold cursor-pointer text-neutral-50 transition active:scale-110"
            onClick={() => setSidebarOpen(true)}
          >
            <button>検索結果を表示</button>
          </div>
        </div>
      </header>

      {/* サイドバー */}
      <div
        className={`fixed top-0 left-0 h-full w-85 bg-white shadow-lg border-r border-gray-300 transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300 h-[85px]">
          <h2 className="font-bold text-lg">検索結果</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {/* 検索結果の内容をここに入れる */}
          <p>ここに検索結果を表示します。</p>
        </div>
      </div>
    </>
  );
};

export default MapHeader;
