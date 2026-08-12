"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldAlert, Lock, Mail, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { FormField } from "@/components/admin/FormField";

function DetailedSpiderWeb() {
  const spokesCount = 16;
  const ringCount = 7;
  const radiusStep = 55;

  const spokes = Array.from({ length: spokesCount }).map((_, i) => {
    const angle = (i * (2 * Math.PI)) / spokesCount;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  });

  const rings = Array.from({ length: ringCount }).map((_, rIdx) => {
    const r = (rIdx + 1) * radiusStep;
    const pathSegments: string[] = [];

    for (let i = 0; i < spokesCount; i++) {
      const currentSpoke = spokes[i];
      const nextSpoke = spokes[(i + 1) % spokesCount];

      const x1 = currentSpoke.x * r;
      const y1 = currentSpoke.y * r;
      const x2 = nextSpoke.x * r;
      const y2 = nextSpoke.y * r;

      const midAngle = ((i + 0.5) * (2 * Math.PI)) / spokesCount;
      const curvePull = r * 0.86;
      const cx = Math.cos(midAngle) * curvePull;
      const cy = Math.sin(midAngle) * curvePull;

      if (i === 0) {
        pathSegments.push(`M ${x1.toFixed(1)} ${y1.toFixed(1)}`);
      }
      pathSegments.push(`Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }

    return pathSegments.join(" ");
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dark Ambient Background Gradient matching site ink theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#262220] to-[#0F0D0C]" />

      {/* Brand Red Glow behind the login card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#BE2320]/20 rounded-full blur-3xl" />

      {/* Main Centered Intricate Spider Web */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] text-stone-500/25"
        viewBox="-420 -420 840 840"
        fill="none"
        stroke="currentColor"
      >
        {/* Radial Spokes */}
        {spokes.map((spoke, idx) => (
          <line
            key={`spoke-${idx}`}
            x1="0"
            y1="0"
            x2={spoke.x * 440}
            y2={spoke.y * 440}
            stroke={idx % 4 === 0 ? "rgba(190, 35, 32, 0.45)" : "rgba(255, 255, 255, 0.15)"}
            strokeWidth={idx % 4 === 0 ? "1.5" : "0.75"}
          />
        ))}

        {/* Inward Curved Web Rings */}
        {rings.map((ringPath, idx) => (
          <path
            key={`ring-${idx}`}
            d={ringPath}
            stroke={idx % 2 === 0 ? "rgba(255, 255, 255, 0.18)" : "rgba(190, 35, 32, 0.35)"}
            strokeWidth={idx % 2 === 0 ? "1" : "0.75"}
          />
        ))}

        {/* Center Web Hub */}
        <circle cx="0" cy="0" r="14" fill="rgba(190, 35, 32, 0.4)" stroke="#BE2320" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (attempts >= 5) {
      setError("Too many failed attempts. Please wait a few minutes before trying again.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setAttempts((prev) => prev + 1);
        setError("Incorrect email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Spider Web Background Component */}
      <DetailedSpiderWeb />

      {/* Top Left Navigation Link to Main Website */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white rounded-xl text-xs font-semibold backdrop-blur-md border border-white/15 transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Website</span>
      </Link>

      {/* Admin Login Card with Glassmorphic Card Surface */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-stone-200/80 p-8 space-y-6">
        {/* Brand logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#BE2320] text-white shadow-lg shadow-[#BE2320]/30 mb-2">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">K2 Pest Control Admin Portal</h1>
          <p className="text-sm text-stone-500">Sign in to manage your pest control business</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#BE2320]" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Email Address" required>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hannan.com"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>
          </FormField>

          <FormField label="Password" required>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>
          </FormField>

          <div className="flex items-center justify-between text-xs text-stone-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-stone-300 text-[#BE2320] focus:ring-[#BE2320]"
              />
              <span>Remember me</span>
            </label>

            <span className="text-stone-400 cursor-not-allowed" title="Contact administrator for password reset">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#BE2320] hover:bg-[#8E1A18] text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-[#BE2320]/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Admin"}
          </button>
        </form>

        {/* Footer Link Back to Website */}
        <div className="pt-2 border-t border-stone-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#BE2320] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
