import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import { format } from "date-fns";
const HomePage = () => {
  // Output: "Tuesday, February 18th, 2025 at 03:30 PM"

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
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
      </div>
    </PageTransition>
  );
};

export default HomePage;
