import { useContext, useState } from "react";
import {
  sendEmailVerification,
  deleteUser,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Providers/AuthContext/AuthContext";
import auth from "../components/users/authentication/firebase/firebase.init";
const useOperation = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const userID = user?._id;
  const firebaseUser = auth.currentUser;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Password Change
  const handleChangePassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // ✅ Handle Email Verification

  const handleVerifyEmail = async () => {
    setLoading(true);
    try {
      if (!firebaseUser?.emailVerified) {
        await sendEmailVerification(firebaseUser).then(() => {
          toast.success("Verification email sent. Check your inbox.");
        });
      }

      if (firebaseUser?.emailVerified) {
        toast.warn("Your Email have been verified");
        axios.put(`https://focus-nest-server.vercel.app/api/users/${userID}`, {
          emailVerified: true,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // ✅ Handle Account Deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete your account!"
    );

    if (!confirmDelete) return;

    if (!password) {
      return toast.error("Please enter your password to confirm.");
    }

    setLoading(true);
    try {
      const credentials = EmailAuthProvider.credential(
        firebaseUser?.email,
        password
      );
      await reauthenticateWithCredential(firebaseUser, credentials);
      await deleteUser(firebaseUser);
      const response = await axios.delete(
        `https://focus-nest-server.vercel.app/api/users/${userID}`
      );
      if (response.status === 200) {
        toast.success("Your account have been deleted successfully.");
      } else {
        toast.error("Failed to delete account from MongoDB.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to delete , Password not matched!");
    }
    setLoading(false);
  };

  return {
    handleChangePassword,
    handleVerifyEmail,
    handleDeleteAccount,
    loading,
    user,
    password,
    setPassword,
    signOutUser,
  };
};

export default useOperation;
