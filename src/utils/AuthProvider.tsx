import {
  getCurrentUser,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  signUp as amplifySignUp,
} from "aws-amplify/auth";

export const isAuthenticated = async () => {
  const user = await username();
  return !!user;
};

export const username = async () => {
  try {
    const { username } = await getCurrentUser();
    return username;
  } catch {
    return null;
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    await amplifySignIn({ username, password });
  } catch (error) {
    console.error("Error signing in", error);
  }
};

export const signOut = async () => {
  try {
    await amplifySignOut();
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export const signUp = async (
  username: string,
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }

  try {
    await amplifySignUp({ username, password });
  } catch (error) {
    console.error("Error signing up", error);
  }
};
