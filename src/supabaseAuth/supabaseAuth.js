import supabase from "../components/supabaseClient";
async function signUp(email, password, firstName, lastName, navigate) {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    navigate("/");
    return { success: false, error };
  }

  return { success: true }; // Profile will be created automatically by the trigger
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Login failed:", error.message, data);
    return { success: false, error };
  }

  // Supabase automatically stores the session in localStorage

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

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error);
  } else {
    // Supabase automatically removes the session from localStorage
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
