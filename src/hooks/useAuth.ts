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
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const catchAuthError = (error: unknown) => {
    if (error instanceof Error) {
      if (error.name === "UserUnAuthenticatedException") {
        setUser(null);
      } else if (error.name === "UsernameExistsException") {
        setError(new Error("Username already exists"));
        setUser(null);
      } else if (error.name === "NotAuthorizedException") {
        setError(new Error("Incorrect username or password"));
        setUser(null);
      }
    } else {
      console.error("Unrecognized error", error);
      setError(
        new Error("An unknown error occurred while getting the current user")
      );
    }
  };

  const getCurrentUserAndUpdateState = useCallback(async () => {
    setIsLoading(true);
    try {
      const { username, userId } = await getCurrentUser();
      setUser({ username, userId });
      setError(null);
    } catch (error) {
      catchAuthError(error);
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
      catchAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const appSignUp = async (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError(new Error("Passwords do not match"));
      setIsLoading(false);
      return;
    }

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
      catchAuthError(error);
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
      setError(error as Error);
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
