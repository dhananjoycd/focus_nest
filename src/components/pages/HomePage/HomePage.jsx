import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import { format } from "date-fns";
const HomePage = () => {
  const fullDateTime = format(new Date(), "dd MMM yyyy , hh:mm:ss a");

  // Output: "Tuesday, February 18th, 2025 at 03:30 PM"

  return (
    <PageTransition>
      <p>Cooking now.... {fullDateTime} </p>
    </PageTransition>
  );
};

export default HomePage;
