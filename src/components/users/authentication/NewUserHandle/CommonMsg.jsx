/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
const CommonMsg = ({ type }) => {
  return (
    <div className="my-3 border border-gray-300 rounded-lg p-4 text-center shadow-md bg-white">
      {type === "signIn" ? (
        <p className="text-gray-600">
          Don't have an account? Click here to
          <a
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            {"  Sign Up"}
          </a>
        </p>
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
