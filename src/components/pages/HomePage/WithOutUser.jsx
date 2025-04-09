import SignIn from "../../users/authentication/NewUserHandle/SignIn";

const WithOutUser = () => {
  return (
    <section>
      <div className="text-center flex flex-col items-center mt-10">
        <div className="dark:bg-gray-900 bg-gray-100 p-6 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            🚀 Welcome to <span className="text-blue-500">Focus Nest</span>!
          </h1>
          <p className="mt-4 text-lg dark:text-gray-300 text-gray-700">
            We are building something{" "}
            <span className="font-semibold">amazing</span> for you! Stay tuned
            as we craft an innovative platform filled with technology, insights,
            and creativity.
          </p>
          <div className="mt-6">
            <p className="text-sm dark:text-gray-400 text-gray-600">
              💡 Follow our journey and stay updated:
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="https://www.facebook.com/Official.DhananjoyCD"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/dhananjoycd

"
                className="text-blue-500 hover:underline"
              >
                Linkdin
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm dark:text-gray-500 text-gray-600">
            🔧 Currently under development. Stay tuned for updates!
          </p>
        </div>
        <div className="max-w-md mx-auto mt-10 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow-md flex items-start gap-3">
          <svg
            className="w-6 h-6 mt-1 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 20h.01M12 12h.01M12 4h.01"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold">Login Required</h3>
            <p className="text-sm mt-1">
              You need to be a valid user to access this website. Please log in
              to continue.
            </p>
            <div className="mt-3">
              <a
                href="/login"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
              >
                Go to Sign In
              </a>
              <span>{` Or, `}</span>
              <a
                href="/signup"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 transition"
              >
                Go to Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      <SignIn />
    </section>
  );
};

export default WithOutUser;
