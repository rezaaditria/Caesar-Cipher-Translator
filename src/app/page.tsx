"use client";
import { caesarCipher } from "@/app/utils/caesarCipher";
import { useState } from "react";

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [shift, setShift] = useState<number>(3); // Default shift
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const [language, setLanguage] = useState<"en" | "id">("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "id" : "en"));
  };

  const handleSwap = () => {
    setMode((prevMode) => (prevMode === "encrypt" ? "decrypt" : "encrypt"));
    setInputText(outputText); // Swap input with output
    setOutputText(""); // Clear the output field
  };

  const handleCipher = () => {
    const isEncrypt = mode === "encrypt";
    const output = caesarCipher(inputText, shift, isEncrypt);
    setOutputText(output);
  };

  // Helper function to generate the shifted alphabet for visualization
  const generateShiftedAlphabet = (shift: number) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const shiftedAlphabet = alphabet.slice(shift) + alphabet.slice(0, shift); // Shift the alphabet
    return { original: alphabet, shifted: shiftedAlphabet };
  };

  const { original, shifted } = generateShiftedAlphabet(shift);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-blue-300 to-white text-gray-800 p-4 overflow-auto">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-12">
        {language === "en"
          ? "Caesar Cipher Translator"
          : "Penerjemah Caesar Cipher"}
      </h1>

      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="p-2 bg-slate-400 text-white rounded-full mb-6  transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-languages"
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      </button>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            {mode === "encrypt"
              ? language === "en"
                ? "Plain Text Input"
                : "Masukkan Teks Biasa"
              : language === "en"
              ? "Cipher Text Input"
              : "Masukkan Teks Cipher"}
          </h2>
          <textarea
            placeholder={`${
              mode === "encrypt"
                ? language === "en"
                  ? "Enter plain text"
                  : "Masukkan teks biasa"
                : language === "en"
                ? "Enter cipher text"
                : "Masukkan teks cipher"
            }`}
            className="w-full p-4 border rounded-2xl resize-none h-40"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition mt-4 md:mt-0"
          title={
            language === "en"
              ? "Swap Encrypt/Decrypt"
              : "Tukar Enkripsi/ Dekripsi"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-right"
          >
            <path d="M8 3 4 7l4 4" />
            <path d="M4 7h16" />
            <path d="m16 21 4-4-4-4" />
            <path d="M20 17H4" />
          </svg>
        </button>

        {/* Output Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-2 text-center">
            {mode === "encrypt"
              ? language === "en"
                ? "Cipher Text Output"
                : "Hasil Teks Cipher"
              : language === "en"
              ? "Plain Text Output"
              : "Hasil Teks Biasa"}
          </h2>
          <textarea
            readOnly
            placeholder={`${
              mode === "encrypt"
                ? language === "en"
                  ? "Your cipher text"
                  : "Teks cipher Anda"
                : language === "en"
                ? "Your plain text"
                : "Teks biasa Anda"
            }`}
            className="w-full p-4 border rounded-2xl resize-none h-40 bg-gray-50"
            value={outputText}
          />
        </div>
      </div>

      {/* Key Input and Button */}
      <div className="flex flex-col items-center mt-6 w-full max-w-4xl space-y-4">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">
            {language === "en" ? "Key" : "Kunci"}
          </h2>
          <input
            type="number"
            className="w-1/2 p-2 border rounded-2xl text-center appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
            placeholder={language === "en" ? "Shift value" : "Nilai pergeseran"}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
          />
        </div>
        <button
          onClick={handleCipher}
          className="w-1/2 p-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition "
        >
          {mode === "encrypt"
            ? language === "en"
              ? "Encrypt Text"
              : "Enkripsi Teks"
            : language === "en"
            ? "Decrypt Text"
            : "Dekripsi Teks"}
        </button>
      </div>

      {/* Explanation and Visualization Section */}
      <div className="w-full max-w-4xl mt-12 text-center bg-gradient-to-t from-blue-300 to-white-50/50 rounded-xl p-12">
        <h2 className="text-xl font-bold mb-4">
          {language === "en"
            ? "How Caesar Cipher Works"
            : "Cara Kerja Caesar Cipher"}
        </h2>
        <p className="mb-4 text-lg text-justify">
          {language === "en"
            ? "The Caesar Cipher works by shifting each letter in the text by a set number (key). When encrypting, each letter is shifted forward in the alphabet by the shift value. To decrypt, the letters are shifted back by the same amount."
            : "Caesar Cipher bekerja dengan menggeser setiap huruf dalam teks dengan jumlah yang ditentukan (kunci). Saat mengenkripsi, setiap huruf digeser maju dalam alfabet sesuai dengan nilai pergeseran. Untuk mendekripsi, huruf-huruf digeser kembali dengan jumlah yang sama."}
        </p>
      </div>

      {/* Visualization with Plain Example */}
      <div className="w-full max-w-4xl mt-12 text-center  rounded-xl px-12">
        <h3 className="text-3xl font-extrabold my-12 ">
          {language === "en"
            ? "Encryption Visualization"
            : "Visualisasi Enkripsi"}
        </h3>
        <div className="mb-6">
          <div className="text-xl mb-2 flex gap-12 justify-center">
            <strong>
              {language === "en" ? "Plain Text: " : "Teks Biasa: "}
              <span className="font-normal">HELLO</span>
            </strong>

            <div className="text-xl mb-2">
              <strong>
                {language === "en" ? "Shift by: " : "Pergeseran: "}
              </strong>
              {shift}
            </div>
            <div className="text-xl">
              <strong>
                {language === "en" ? "Cipher Text: " : "Teks Cipher: "}
              </strong>
              {caesarCipher("HELLO", shift, true)}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-8">
              <div className="mr-8">
                <h5 className="text-md font-semibold">
                  {language === "en" ? "Original Alphabet" : "Alfabet Asli"}
                </h5>
                <div className="flex justify-evenly mb-4 gap-1">
                  {original.split("").map((char, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 flex justify-center items-center bg-white rounded-full"
                    >
                      {char}
                    </div>
                  ))}
                </div>

                <div>
                  <h5 className="text-md font-semibold">
                    {language === "en"
                      ? "Shifted Alphabet"
                      : "Alfabet yang Digeser"}
                  </h5>
                  <div className="flex justify-evenly mb-4">
                    {shifted.split("").map((char, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 flex justify-center items-center bg-white rounded-full"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decryption Example */}
      <div className="w-full max-w-4xl mt-12 text-center  rounded-xl px-12">
        <h3 className="text-3xl font-extrabold my-12">
          {language === "en"
            ? "Decryption Visualization"
            : "Visualisasi Dekripsi"}
        </h3>
        <div>
          <div className="text-xl mb-2 flex gap-12 justify-center">
            <strong>
              {language === "en" ? "Cipher Text:" : "Teks Cipher:"}
              <span className="font-normal">
                {caesarCipher("HELLO", shift, true)}
              </span>
            </strong>

            <div className="text-xl mb-2">
              <strong>
                {language === "en" ? "Shift by: " : "Pergeseran: "}
              </strong>
              {shift}
            </div>
            <div className="text-xl">
              <strong>
                {language === "en" ? "Plain Text: " : "Teks Biasa: "}
              </strong>
              {caesarCipher(caesarCipher("HELLO", shift, true), shift, false)}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-center mb-8">
              <div className="mr-8">
                <h5 className="text-md font-semibold">
                  {language === "en"
                    ? "Shifted Alphabet"
                    : "Alfabet yang Digeser"}
                </h5>
                <div className="flex justify-evenly mb-4 gap-1">
                  {shifted.split("").map((char, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 flex justify-center items-center bg-white rounded-full"
                    >
                      {char}
                    </div>
                  ))}
                </div>
                <div>
                  <h5 className="text-md font-semibold">
                    {language === "en" ? "Original Alphabet" : "Alfabet Asli"}
                  </h5>
                  <div className="flex justify-evenly mb-4">
                    {original.split("").map((char, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 flex justify-center items-center bg-white rounded-full"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
