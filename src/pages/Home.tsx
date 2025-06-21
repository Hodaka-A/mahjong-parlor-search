import { useNavigate } from "react-router-dom";
import homeLayout from "../assets/ホームレイアウト.png";
import logo from "../assets/ロゴ.png";

const Home = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/search");
  };
  return (
    <div className="">
      <header className="h-[85px] border-b border-gray-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="">
            <img
              width={180}
              height={60}
              className="w-full h-fit"
              src={logo}
            ></img>
          </div>
          <button className="inline-flex h-11 items-center justify-center rounded-md bg-red-600 px-6 font-bold cursor-pointer text-neutral-50 transition active:scale-110">
            ログイン
          </button>
        </div>
      </header>

      <div className="bg-background h-full">
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
      </div>
    </div>
  );
};

export default Home;
