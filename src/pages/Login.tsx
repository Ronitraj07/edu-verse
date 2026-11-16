import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldX, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { status, signOut } = useAuth();

  const isRestricted = params.get("restricted") === "true";

  useEffect(() => {
    if (status === "allowed") navigate("/dashboard", { replace: true });
  }, [status, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const glowBorder = (color: string) => ({
    background: color,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude" as const,
    WebkitMaskComposite: "xor" as const,
    padding: "1px",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      style={{ padding: "clamp(16px, 4vw, 32px)" }}
    >
      {/* Ambient glows — clamped to viewport */}
      <div
        className="hero-glow animate-pulse-glow"
        style={{
          width: "min(480px, 80vw)",
          height: "min(480px, 80vw)",
          background: "hsl(var(--primary))",
          opacity: 0.18,
          top: "15%",
          left: "10%",
        }}
        aria-hidden="true"
      />
      <div
        className="hero-glow animate-pulse-glow"
        style={{
          width: "min(400px, 70vw)",
          height: "min(400px, 70vw)",
          background: "hsl(var(--accent))",
          opacity: 0.13,
          bottom: "15%",
          right: "8%",
          animationDelay: "2s",
        }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div aria-live="polite" aria-atomic="true" className="relative z-10 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {isRestricted ? (
            <motion.div
              key="restricted"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl w-full max-w-md text-center"
              style={{ padding: "clamp(20px,5vw,32px)" }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-40 pointer-events-none"
                style={glowBorder("linear-gradient(135deg, hsl(0,70%,55%), hsl(30,80%,55%))")}
              />

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-destructive/10 border border-destructive/20">
                <ShieldX className="w-8 h-8 text-destructive" aria-hidden="true" />
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                Access Restricted
              </h1>
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                This platform is invite-only. Your account is not on the authorised list.
              </p>
              <p className="text-xs text-muted-foreground/60 mb-8">
                Contact the admin if you believe this is a mistake.
              </p>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full px-6 py-3 rounded-xl font-display font-medium text-sm bg-secondary border border-border text-foreground hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300"
                style={{ minHeight: 44 }}
              >
                Sign out &amp; try another account
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl w-full max-w-md"
              style={{ padding: "clamp(20px,5vw,32px)" }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-50 pointer-events-none"
                style={glowBorder("var(--gradient-primary)")}
              />

              {/* Logo mark */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="font-display text-2xl font-bold gradient-text mb-2">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">Click below to continue</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-3 px-4 rounded-xl bg-secondary border border-border text-foreground text-sm font-medium hover:bg-secondary/80 hover:border-primary/30 transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ minHeight: 52, fontSize: "var(--text-sm)" }}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" aria-hidden="true" />
              </button>

              <p className="text-xs text-muted-foreground/60 text-center mt-6 leading-relaxed">
                Demo access only. Your account is not signed in.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
