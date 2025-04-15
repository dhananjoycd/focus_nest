/* eslint-disable react/no-unescaped-entities */
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";

const TimeManagement = () => {
  return (
    <PageTransition>
      <div className="flex flex-col m-5 p-4 items-center justify-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold mb-4">🔔Upcoming...</h2>
        <p className="text-lg mb-6">
          We're working on new features and improvements to help you stay on top
          of your productivity and goals. Get ready for an enhanced experience
          that will take your focus and achievements to the next level.
        </p>
        <p className="font-bold text-xl">
          Stay tuned, and keep your eyes on the horizon! 🌟🚀
        </p>
        <div className="mt-6">
          <button className="px-6 py-2 bg-purple-800 rounded-full text-white hover:bg-purple-700 transition duration-300">
            #Focus Nest #ComingSoon #ProductivityUpgrade #TimeAnalytics
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default TimeManagement;
