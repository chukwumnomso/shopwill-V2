import { useNavigate } from "react-router-dom";
import supabase from "../components/supabaseClient";

async function signUp(email, password, firstName, lastName) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

  if (error) {
    console.error("Sign up failed:", error.message);
    return { success: false, error };
  }

  // Supabase automatically sends a confirmation email
  console.log("Check your email for confirmation!", data);
  return { success: true, user: data.user };
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Login failed:", error.message);
    return { success: false, error };
  }

  // Supabase automatically stores the session in localStorage
  console.log("Logged in!", data.user);
  return { success: true, user: data.user, session: data.session };
}

async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return user;
  } else {
    return null;
  }
}

function authchange() {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth event:", event);

    if (event === "SIGNED_IN") {
      console.log("User just logged in", session.user);
    }

    if (event === "SIGNED_OUT") {
      console.log("User logged out");
      // Redirect to login page, clear UI state
    }
  });
}

async function signOut(navigate) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error);
  } else {
    console.log("Logged out successfully");
    // Supabase automatically removes the session from localStorage
    navigate("/signIn");
    console.log("signedout");
  }
}

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://your-app.com/callback",
    },
  });

  if (error) console.error("Google login failed:", error);
  // Supabase redirects to Google, then back to your callback
}
export {
  signUp,
  signIn,
  getCurrentUser,
  authchange,
  signInWithGoogle,
  signOut,
};
