import { useState} from "react";
import { FirebaseService } from "../lib/firebase";

const firebaseSerive = new FirebaseService();

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await firebaseSerive.registerWithEmailAndPassword(
      email,
      password
    );
  }

  return (
    <div className="flex justify-center min-h-screen items-center m-auto p-3">
      <form
        onSubmit={handleSubmit}
        className="border-y-2 border-green-400 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-400  hover:bg-green-700 text-black font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
