"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Vi har sendt et login-link til din e-mail. Tjek din indbakke."
      );
    }
  }

  return (
    <main
      style={{
        maxWidth: "420px",
        margin: "80px auto",
        padding: "2rem",
      }}
    >
      <h1>Log ind</h1>

      <p>
        Indtast din e-mailadresse, så sender vi et login-link.
      </p>

      <input
        type="email"
        placeholder="din@email.dk"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      />

      <button
        onClick={signIn}
        style={{
          width: "100%",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        Send login-link
      </button>

      {message && (
        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>
      )}
    </main>
  );
}