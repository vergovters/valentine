"use client";
import { useState } from "react";
import BirthdayIntro from "./her-birthday-main/BirthdayIntro";

const BirthdayPage = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 relative overflow-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <BirthdayIntro />
      </div>
      <button
        onClick={onNext}
        className="absolute bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg"
      >
        Далі ➜
      </button>
    </div>
  );
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState("birthday");
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showSecondPage, setShowSecondPage] = useState(false);
  const [kissCount, setKissCount] = useState(0);
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "Ні",
      "Ти впевнена?",
      "А якщо я дуже ввічливо попрошу?",
      "Будь ласка",
      "Ееее, бля",
      "А ти ж мене любила",
      "БУДЬ ЛАСКА, КІЦЯ",
      "Але :*(",
      "Я помру",
      "Так, я мертвий",
      "ок, ти розмовляєш з привидом",
      "будь ласка, сонечко",
      ":((((",
      "БУДЬ ЛАСКА",
      "панятно",
      "Ні :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleYesClick = () => {
    setYesPressed(true);
    // Show second page after 2 seconds
    setTimeout(() => {
      setShowSecondPage(true);
    }, 2000);
  };

  const getKissMessage = () => {
    const messages = [
      "Один поцілунок! 💋",
      "Два поцілунки! 💋💋",
      "Три поцілунки! 💋💋💋",
      "Чотири поцілунки! 💋💋💋💋",
      "П'ять поцілунків! 💋💋💋💋💋",
      "Вау! Це багато поцілунків! 😘",
      "Ти машина для поцілунків! 💕",
      "Нескінченні поцілунки! 💋💋💋💋💋💋",
      "Моє серце тане! 🫠",
      "Найкраща валентинка завжди! ❤️",
    ];
    return messages[Math.min(kissCount, messages.length - 1)];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-red-50 py-8 px-4">
      {currentPage === "birthday" ? (
        <BirthdayPage onNext={() => setCurrentPage("valentine")} />
      ) : showSecondPage ? (
        <div className="flex flex-col items-center justify-center animate-fade-in px-4 py-8 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6 text-center">
            А тепер важливе питання...
          </h2>
          <img
            className="h-[200px] sm:h-[250px] mb-6 animate-float"
            src="https://tenor.com/en-GB/view/bubuiak14kiss1-gif-13338760645080724504.gif"
            alt="Поцілунки"
          />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center px-4">
            Скільки поцілунків ти хочеш? 😘
          </h3>
          <div className="flex flex-col items-center gap-6 w-full">
            <button
              onClick={() => setKissCount(kissCount + 1)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg sm:text-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 w-full sm:w-auto"
            >
              Натисни для поцілунку! 💋
            </button>
            {kissCount > 0 && (
              <div className="text-xl sm:text-2xl font-bold text-pink-600 animate-pulse text-center px-4">
                {getKissMessage()}
              </div>
            )}
            <div className="text-base sm:text-lg text-gray-600 font-semibold">
              Всього поцілунків: <span className="text-pink-600 text-xl sm:text-2xl">{kissCount}</span> 💕
            </div>
          </div>
          <div className="mt-8 p-6 bg-white rounded-xl shadow-xl max-w-md w-full text-center border-2 border-pink-100">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {kissCount === 0
                ? "Натисни кнопку, щоб почати збирати поцілунки! 😊"
                : kissCount < 5
                ? "Продовжуй! Більше поцілунків = більше кохання! 💖"
                : kissCount < 10
                ? "Ти чудово справляєшся! Продовжуй! 🌟"
                : kissCount < 20
                ? "Ваууу! 🌟"
                : "Ти чемпіон поцілунків! 🏆"}
            </p>
          </div>
        </div>
      ) : yesPressed ? (
        <div className="flex flex-col items-center animate-fade-in">
          <img
            className="animate-bounce-slow"
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="Celebration"
          />
          <div className="my-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 animate-pulse">
            УРАААА!!! Я тебе кохаю, кісуля!! ;))
          </div>
          <div className="text-xl text-gray-600 animate-fade-in">
            Завантаження чогось особливого... ✨
          </div>
        </div>
      ) : (
        <>
          <img
            className="h-[200px]"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
          />
          <h1 className="my-4 text-4xl">Чи будеш ти моєю валентинкою?</h1>
          <div className="flex items-center">
            <button
              className={`mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 transition-all duration-300`}
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Так
            </button>
            <button
              onClick={handleNoClick}
              className=" rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {noCount === 0 ? "Ні" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
