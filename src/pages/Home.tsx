import { useNavigate } from "react-router-dom";
import homeLayout from "../assets/ホームレイアウト.png";
import logo from "../assets/ロゴ.png";
import responsiveHomeLayout from "../assets/ホームレイアウトスマホサイズ.png";
import { useScreenWidthMeasurement } from "../hooks/useScreenWidthMeasurement";

const Home = () => {
  const navigate = useNavigate();
  const windowWidth = useScreenWidthMeasurement();

  const handleOnClick = () => {
    navigate("/search");
  };
  return (
    <div className="">
      <header className="border-b border-gray-300 py-1">
        {windowWidth < 550 ? (
          <div className="container mx-auto px-4 flex flex-row justify-between items-center h-auto">
            <div className="w-36">
              <img
                width={144}
                height={48}
                className="w-full h-fit"
                src={logo}
                alt="ロゴ"
              />
            </div>
            <button className="inline-flex h-8 px-4 text-sm items-center justify-center rounded-md bg-red-600 font-bold cursor-pointer text-neutral-50 transition active:scale-110">
              ログイン
            </button>
          </div>
        ) : (
          <div className="container mx-auto flex justify-between items-center h-[85px]">
            <div>
              <img
                width={180}
                height={60}
                className="w-full h-fit"
                src={logo}
                alt="ロゴ"
              />
            </div>
            <button className="inline-flex h-11 items-center justify-center rounded-md bg-red-600 px-6 font-bold cursor-pointer text-neutral-50 transition active:scale-110">
              ログイン
            </button>
          </div>
        )}
      </header>

      <div className="bg-background h-full">
        {windowWidth >= 550 ? (
          <div className="container bg-background mx-auto relative">
            <img
              className="w-full object-fill"
              src={homeLayout}
              alt="ホームレイアウト"
            />

            {/* ボタンを中央に配置 */}
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handleOnClick}
                className="bg-red-600 text-white text-xl cursor-pointer font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-red-700 transition"
              >
                今すぐ検索
              </button>
            </div>
          </div>
        ) : (
          <div className="container bg-background mx-auto relative">
            <img
              className="w-full object-fill"
              src={responsiveHomeLayout}
              alt="ホームレイアウト"
            />

            {/* ボタンを中央に配置 */}
            <div className="absolute top-[-34%] inset-0 flex justify-center items-center ">
              <button
                onClick={handleOnClick}
                className="bg-red-600 text-white text-xl cursor-pointer font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-red-700 transition"
              >
                今すぐ検索
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="">{windowWidth}</div>
    </div>
  );
};

export default Home;
