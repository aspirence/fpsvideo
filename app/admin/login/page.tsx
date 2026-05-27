import { loginAction } from "@/app/admin/actions";

export default function AdminLoginPage({
  searchParams
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <form
        action={loginAction}
        className="w-full max-w-sm border border-white/10 bg-brand-surface p-8"
      >
        <h1 className="font-display text-2xl font-bold">Admin login</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Enter your admin ID and password to manage content.
        </p>
        {searchParams?.error && (
          <p className="mt-3 text-sm text-red-400">
            Wrong ID or password, try again.
          </p>
        )}
        <input
          name="username"
          type="text"
          placeholder="Admin ID"
          autoFocus
          autoComplete="username"
          className="mt-5 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="mt-3 w-full border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-brand-gold focus:outline-none"
        />
        <button type="submit" className="btn-primary mt-4 w-full">
          Log in
        </button>
      </form>
    </div>
  );
}
