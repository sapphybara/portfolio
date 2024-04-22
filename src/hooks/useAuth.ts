import {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  type AuthUser,
} from "aws-amplify/auth";
import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentUserAndUpdateState = useCallback(async () => {
    setIsLoading(true);
    try {
      const { username, userId } = await getCurrentUser();
      setUser({ username, userId });
      setError(null);
    } catch (error) {
      if (
        !(
          error instanceof Error &&
          error.name === "UserUnAuthenticatedException"
        )
      ) {
        console.error("Error checking auth state", error);
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUserAndUpdateState();
  }, [getCurrentUserAndUpdateState]);

  const appSignIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await signIn({ username, password });
      await getCurrentUserAndUpdateState();
      setError(null);
    } catch (error) {
      console.error("Error signing in", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const appSignUp = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const { isSignUpComplete, nextStep } = await signUp({
        username,
        password,
        options: {
          autoSignIn: true,
          userAttributes: {},
        },
      });
      if (!isSignUpComplete) {
        console.log("Sign up not complete", nextStep);
      } else {
        await getCurrentUserAndUpdateState();
      }
      setError(null);
    } catch (error) {
      console.error("Error signing up", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const appSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Error signing out", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    user,
    isLoading,
    signIn: appSignIn,
    signUp: appSignUp,
    signOut: appSignOut,
  };
};
