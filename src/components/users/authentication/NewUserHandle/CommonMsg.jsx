/* eslint-disable react/prop-types */

import useOperation from "../../../../hooks/useOperation";

/* eslint-disable react/no-unescaped-entities */
const CommonMsg = ({ type, email }) => {
  const { handleChangePassword, loading } = useOperation();
  return (
    <div className="my-3 border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white">
      {type === "signIn" ? (
        <div>
          <p className="text-gray-700 pb-2 font-serif">
            Did you forget your password?
            <button
              onClick={() => handleChangePassword(email)}
              className=" text-red-600 ps-2 rounded hover:text-blue-700"
              disabled={loading}
            >
              Reset Now
            </button>
          </p>
          <p className="text-gray-600 font-sans">
            Don't have an account? Click here to
            <a
              href="/signup"
              className="text-blue-500 font-semibold hover:underline"
            >
              {"  Sign Up"}
            </a>
          </p>
        </div>
      ) : (
        <p className="text-gray-600">
          Have an account already? Click here to
          <a
            href="/signin"
            className="text-blue-500 font-semibold hover:underline"
          >
            {" Sign In"}
          </a>
        </p>
      )}
    </div>
  );
};

export default CommonMsg;
