import { useContext } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import AuthContext from "../../../Providers/AuthContext/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <PageTransition>
      <div>
        <h2>Hi! {user.displayName?.split(" ")[0] || "Include a Name"}</h2>
      </div>
    </PageTransition>
  );
};
export default UserProfile;
