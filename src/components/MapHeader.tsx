import { useState } from "react";

type Props = {
  places: google.maps.places.PlaceResult[];
};

const MapHeader = ({ places }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg border-r border-gray-300 transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300 h-[85px]">
          <h2 className="font-bold text-lg">検索結果<span className="ml-1">{places.length}件</span></h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-85px)] space-y-6">
          {places.length === 0 ? (
            <p>近くに雀荘が見つかりませんでした。</p>
          ) : (
            places.map((place, index) => (
              <div key={index} className="border-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition">
                {/* 店舗名 */}
                <p className="text-base font-semibold text-gray-900 mb-1">
                   {place.name}
                </p>

                {/* 住所 */}
                <p className="text-sm text-gray-600 mb-1">
                  📍 {place.vicinity}
                </p>

                {/* 評価 */}
                {place.rating !== undefined && (
                  <p className="text-sm text-yellow-700 mb-1">
                    ⭐ {place.rating.toFixed(1)}（{place.user_ratings_total ?? 0}件）
                  </p>
                )}

                {/* 営業中かどうか */}
                {place.opening_hours?.open_now !== undefined && (
                  <p
                    className={`text-sm font-medium ${
                      place.opening_hours.open_now
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {place.opening_hours.open_now ? "営業中" : "営業時間外"}
                  </p>
                )}

                {/* Googleマップリンク */}
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                >
                  詳細を確認する
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MapHeader;
