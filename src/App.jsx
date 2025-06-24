import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) {
      str += "0123456789";
    }
    if (includeCharacters) {
      str += "!@#$%^&*()_+-=[]{}|;:,.<>/?";
    }

    for (let i = 0; i < length; i++) {
      password += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(password);
  }, [length, includeNumbers, includeCharacters, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, includeNumbers, includeCharacters]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600">
      <h1 className="text-4xl font-bold text-center text-white m-4">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="Password"
          value={password}
          className="outline-none w-full py-1 px-3 text-red-700 bg-amber-100 rounded-l-lg font-bold"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipBoard}
          className="bg-blue-500 rounded-r-lg px-3 py-1 text-white font-bold cursor-pointer hover:opacity-80"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white">{length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={includeNumbers}
            id="includeNumbers"
            onChange={() => setIncludeNumbers((prev) => !prev)}
          />
          <label className="text-white">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={includeCharacters}
            id="includeCharacters"
            onChange={() => setIncludeCharacters((prev) => !prev)}
          />
          <label className="text-white">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
