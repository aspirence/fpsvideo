"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative mt-3">
      <input
        name="password"
        type={show ? "text" : "password"}
        placeholder="Password"
        autoComplete="current-password"
        className="w-full border border-white/10 bg-black/40 px-4 py-3 pr-11 text-sm focus:border-brand-gold focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 transition hover:text-white"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
