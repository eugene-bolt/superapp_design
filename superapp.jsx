import { useState, useEffect, useRef } from "react";
import {
  DollarSign, RefreshCw, Gamepad2, Shield, ShoppingBag,
  TrendingUp, Gift, Package, Plane, Zap, CreditCard, ArrowRight,
  ArrowUpRight, ArrowDownLeft, Plus, Send, ChevronLeft, Check,
  Menu, Settings, MoreHorizontal, Home, Wallet, Grid, User,
  Eye, EyeOff, Repeat2, Landmark, Bitcoin, BadgeDollarSign, Banknote,
  Bell, Navigation, Lock
} from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg:           "#07091A",
  bgCard:       "#0D1225",
  bgInput:      "#0F1528",
  bgBtn:        "#111930",
  border:       "rgba(255,255,255,0.06)",
  borderSelect: "#1DD3F7",
  cyan:         "#1DD3F7",
  cyanGlow:     "rgba(29,211,247,0.18)",
  text:         "#FFFFFF",
  textSub:      "#6B7491",
  textMuted:    "#3D4560",
  blue:         "#4B8EF1",
  purple:       "#7B5CF5",
  pink:         "#E8386D",
  orange:       "#F5822A",
  green:        "#2BB55E",
  indigo:       "#5B6CF5",
  teal:         "#1BB8A0",
  yellow:       "#F0B429",
};

const APPS = [
  { id: "banking",  label: "Banking",      desc: "Accounts and transfers",  color: C.blue,   Icon: Landmark },
  { id: "crypto",   label: "Crypto",       desc: "Buy, sell & hold",        color: C.purple, Icon: Repeat2 },
  { id: "play",     label: "Play & Earn",  desc: "Games and rewards",       color: C.indigo, Icon: Gamepad2 },
  { id: "insurance",label: "Insurance",    desc: "Protect what matters",    color: C.pink,   Icon: Shield },
  { id: "shopping", label: "Shop",         desc: "Deals and cashback",      color: C.orange, Icon: ShoppingBag },
  { id: "invest",   label: "Invest",       desc: "Stocks & ETFs",           color: C.green,  Icon: TrendingUp },
  { id: "rewards",  label: "Rewards",      desc: "Points & cashback",       color: "#E5533C", Icon: Gift },
  { id: "orders",   label: "Track Orders", desc: "All orders in one place", color: C.teal,   Icon: Package },
  { id: "travel",   label: "Travel",       desc: "Flights & hotels",        color: C.blue,   Icon: Plane },
  { id: "bills",    label: "Bills",        desc: "Pay utilities & more",    color: C.yellow, Icon: Zap },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────
const s = {
  screen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
    overflow: "hidden",
  },
  backBtn: {
    width: 40, height: 40,
    borderRadius: "50%",
    background: C.bgCard,
    border: `1px solid ${C.border}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    color: C.text,
    flexShrink: 0,
  },
  title: {
    fontSize: 30, fontWeight: 800,
    color: C.text, letterSpacing: "-0.5px",
    lineHeight: 1.15, marginBottom: 10,
  },
  subtitle: {
    fontSize: 15, color: C.textSub, lineHeight: 1.6,
  },
};

function PillBtn({ label, white = false, disabled = false, onClick, style = {} }) {
  const [down, setDown] = useState(false);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      onMouseLeave={() => setDown(false)}
      style={{
        width: "100%", height: 56,
        borderRadius: 28,
        border: "none",
        background: white ? (disabled ? "#292F44" : "#FFFFFF") : C.bgBtn,
        color: white ? (disabled ? C.textMuted : "#07091A") : (disabled ? C.textMuted : C.text),
        fontSize: 16, fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "inherit",
        transform: down ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.1s, background 0.2s",
        letterSpacing: "0.1px",
        ...style,
      }}
    >
      {label}
    </button>
  );
}

function CircleBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: "50%",
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", color: C.text, flexShrink: 0,
    }}>{children}</button>
  );
}

function OTPInput({ value, onChange, onComplete }) {
  const refs = useRef([]);
  const arr = Array(6).fill("").map((_, i) => value[i] || "");

  useEffect(() => { refs.current[0]?.focus(); }, []);

  const onKey = (i, e) => {
    if (e.key === "Backspace" && !arr[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const onCh = (i, e) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...arr]; next[i] = v;
    const newVal = next.join("");
    onChange(newVal);
    if (v && i < 5) refs.current[i + 1]?.focus();
    if (v && i === 5 && newVal.length === 6) onComplete?.();
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
      {arr.map((d, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          maxLength={1}
          value={d}
          onChange={e => onCh(i, e)}
          onKeyDown={e => onKey(i, e)}
          style={{
            width: 52, height: 60,
            borderRadius: 14,
            background: C.bgInput,
            border: `1.5px solid ${d ? C.cyan : C.border}`,
            color: C.text,
            fontSize: 22, fontWeight: 700,
            textAlign: "center",
            outline: "none",
            fontFamily: "inherit",
            boxShadow: d ? `0 0 0 3px ${C.cyanGlow}` : "none",
            transition: "border 0.2s, box-shadow 0.2s",
          }}
        />
      ))}
    </div>
  );
}

// ─── PhoneFrame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#030508",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        width: 390, height: 844,
        background: C.bg,
        borderRadius: 50,
        boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.9)",
        overflow: "hidden",
        position: "relative",
        display: "flex", flexDirection: "column",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 34, background: "#000",
          borderRadius: 20, zIndex: 100,
        }} />
        {/* Status bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          padding: "16px 28px 0",
          fontSize: 13, fontWeight: 600, color: C.text,
          zIndex: 99,
        }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 12 }}>
            <span>▐▐▐▐</span><span>◈</span><span>▮</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Screen 1: Splash ─────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      flex: 1, display: "flex",
      alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        fontSize: 42, fontWeight: 900,
        color: C.text, letterSpacing: "6px",
        textTransform: "uppercase",
      }}>SuperApp</div>
    </div>
  );
}

// ─── Screen 2: Welcome ────────────────────────────────────────────────────────
function WelcomeScreen({ onCreate, onLogin }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Empty hero space */}
      <div style={{ flex: 1 }} />
      {/* Buttons */}
      <div style={{ padding: "0 24px 52px", display: "flex", flexDirection: "column", gap: 12 }}>
        <PillBtn label="Create account" white onClick={onCreate} />
        <PillBtn label="Login" onClick={onLogin} />
      </div>
    </div>
  );
}

// ─── Screen 3: Email ─────────────────────────────────────────────────────────
function EmailScreen({ onBack, onContinue }) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div style={{ ...s.screen, paddingTop: 20, paddingBottom: 0 }}>
      {/* Back */}
      <div style={{ marginBottom: 32 }}>
        <div style={s.backBtn} onClick={onBack}>
          <ChevronLeft size={20} />
        </div>
      </div>

      {/* Title */}
      <div style={s.title}>What's your email?</div>
      <div style={{ ...s.subtitle, marginBottom: 32 }}>
        We'll use this to create your account and keep you updated.
      </div>

      {/* Input */}
      <div style={{
        background: C.bgInput,
        border: `1.5px solid ${focused ? C.cyan : C.border}`,
        borderRadius: 14,
        padding: "0 18px",
        display: "flex", alignItems: "center",
        transition: "border 0.2s",
        boxShadow: focused ? `0 0 0 3px ${C.cyanGlow}` : "none",
      }}>
        <input
          ref={inputRef}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => { if (e.key === "Enter" && valid) onContinue(email); }}
          style={{
            flex: 1, background: "transparent",
            border: "none", outline: "none",
            color: C.text, fontSize: 16,
            padding: "18px 0", fontFamily: "inherit",
            "::placeholder": { color: C.textSub },
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <div style={{ paddingBottom: 52 }}>
        <PillBtn
          label="Continue"
          white
          disabled={!valid}
          onClick={() => valid && onContinue(email)}
        />
      </div>
    </div>
  );
}

// ─── Screen 4: Verify ─────────────────────────────────────────────────────────
function VerifyScreen({ email, onBack, onContinue }) {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(n => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const resend = () => { setCode(""); setTimer(30); setResent(true); setTimeout(() => setResent(false), 2500); };

  return (
    <div style={{ ...s.screen, paddingTop: 20, paddingBottom: 0 }}>
      {/* Back */}
      <div style={{ marginBottom: 32 }}>
        <div style={s.backBtn} onClick={onBack}>
          <ChevronLeft size={20} />
        </div>
      </div>

      {/* Title */}
      <div style={s.title}>Enter verification{"\n"}code</div>
      <div style={{ ...s.subtitle, marginBottom: 32 }}>
        We sent a 6-digit code to{" "}
        <span style={{ color: C.text, fontWeight: 600 }}>{email}</span>
      </div>

      {/* OTP */}
      <OTPInput value={code} onChange={setCode} onComplete={onContinue} />

      {/* Resend */}
      <div style={{ marginTop: 24, fontSize: 14, color: C.textSub, textAlign: "center" }}>
        {resent
          ? <span style={{ color: C.cyan }}>✓ New code sent!</span>
          : timer > 0
          ? <span>Resend code in <strong style={{ color: C.text }}>{timer}s</strong></span>
          : <span>
              Didn't receive the code?{" "}
              <span onClick={resend} style={{ color: C.cyan, cursor: "pointer", fontWeight: 700 }}>Resend</span>
            </span>
        }
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ paddingBottom: 52 }}>
        <PillBtn
          label="Verify"
          white
          disabled={code.length < 6}
          onClick={() => code.length === 6 && onContinue()}
        />
      </div>
    </div>
  );
}

// ─── Screen 5: Interests ─────────────────────────────────────────────────────
function InterestsScreen({ onContinue, onSkipAll }) {
  const [selected, setSelected] = useState(new Set());

  const toggle = id => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const hasAny = selected.size > 0;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 24px 0",
      }}>
        <CircleBtn><Menu size={17} /></CircleBtn>
        <div style={{ display: "flex", gap: 10 }}>
          <CircleBtn><Settings size={16} /></CircleBtn>
          <CircleBtn><MoreHorizontal size={16} /></CircleBtn>
        </div>
      </div>

      {/* Title */}
      <div style={{ padding: "28px 24px 0" }}>
        <div style={{ ...s.title, fontSize: 32 }}>What are you{"\n"}here for?</div>
        <div style={{ ...s.subtitle, marginTop: 8 }}>
          Pick the apps you're most interested in. You can always change this later in your profile.
        </div>
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "20px 24px 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        alignContent: "start",
      }}>
        {APPS.map(app => {
          const on = selected.has(app.id);
          return (
            <div
              key={app.id}
              onClick={() => toggle(app.id)}
              style={{
                background: C.bgCard,
                border: `1.5px solid ${on ? C.cyan : C.border}`,
                borderRadius: 18,
                padding: "16px 14px",
                cursor: "pointer",
                position: "relative",
                boxShadow: on ? `0 0 0 1px ${C.cyan}22, 0 4px 24px ${C.cyanGlow}` : "none",
                transition: "border 0.15s, box-shadow 0.15s",
              }}
            >
              {/* Checkbox */}
              <div style={{
                position: "absolute", top: 12, right: 12,
                width: 22, height: 22,
                borderRadius: 6,
                background: on ? C.cyan : "transparent",
                border: `2px solid ${on ? C.cyan : C.textMuted}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}>
                {on && <Check size={13} color="#07091A" strokeWidth={3} />}
              </div>

              {/* Icon circle */}
              <div style={{
                width: 44, height: 44,
                borderRadius: "50%",
                background: app.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
              }}>
                <app.Icon size={20} color="#fff" strokeWidth={2} />
              </div>

              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                {app.label}
              </div>
              <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.4 }}>
                {app.desc}
              </div>
            </div>
          );
        })}
        {/* bottom spacer */}
        <div style={{ height: 1, gridColumn: "1/-1" }} />
      </div>

      {/* CTA — sticky so it's always visible above the scrollable grid */}
      <div style={{
        position: "sticky",
        bottom: 0,
        padding: "16px 24px 52px",
        background: C.bg,
        borderTop: `1px solid ${C.border}`,
      }}>
        <PillBtn
          label={hasAny ? "Continue" : "I'll try them all"}
          white
          onClick={() => {
            const apps = hasAny ? [...selected] : APPS.map(a => a.id);
            onContinue(apps);
          }}
        />
      </div>
    </div>
  );
}

// ─── Screen 6: Dashboard (Bolt Design) ───────────────────────────────────────
function DashboardScreen({ selectedApps, onNavigate }) {
  const [tab, setTab] = useState("cash");

  const balanceTabs = [
    { id: "cash",    label: "Cash" },
    { id: "crypto",  label: "Crypto" },
    { id: "rewards", label: "Rewards" },
    { id: "invest",  label: "Invest" },
  ];

  const boltApps = [
    { id: "cards",   label: "Bank/Card",    Icon: CreditCard,      locked: true  },
    { id: "send",    label: "Send/Receive", Icon: ArrowUpRight,    locked: true  },
    { id: "rewards", label: "Rewards",      Icon: DollarSign,      locked: true  },
    { id: "crypto",  label: "Crypto",       Icon: Repeat2,         locked: false },
    { id: "invest",  label: "Invest",       Icon: TrendingUp,      locked: false },
    { id: "orders",  label: "Track Orders", Icon: Navigation,      locked: false },
    { id: "shopai",  label: "Shop AI",      Icon: ShoppingBag,     locked: false },
    { id: "play",    label: "Play & Earn",  Icon: Gamepad2,        locked: false },
    { id: "finance", label: "Finance",      Icon: BadgeDollarSign, locked: false },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 24px 16px",
        }}>
          {/* BOLT wordmark */}
          <div style={{
            fontSize: 26, fontWeight: 900, color: C.text,
            letterSpacing: "2px", textTransform: "uppercase",
            fontStyle: "italic",
          }}>BOLT</div>

          {/* Avatar + Bell */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "#1C2850",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: C.text,
              letterSpacing: "0.5px",
            }}>WW</div>

            <div style={{ position: "relative" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#1C2850",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: C.text,
              }}>
                <Bell size={18} strokeWidth={2} />
              </div>
              <div style={{
                position: "absolute", top: -3, right: -3,
                width: 18, height: 18, borderRadius: "50%",
                background: C.cyan,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: "#07091A",
                lineHeight: 1,
              }}>3</div>
            </div>
          </div>
        </div>

        {/* ── Balance Tabs ── */}
        <div style={{
          display: "flex", gap: 8,
          padding: "0 24px 24px",
        }}>
          {balanceTabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "9px 20px",
                borderRadius: 24,
                border: "none",
                background: tab === t.id ? "#FFFFFF" : "#111930",
                color: tab === t.id ? "#07091A" : C.text,
                fontSize: 15, fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                transition: "background 0.2s, color 0.2s",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* ── Balance Amount ── */}
        <div style={{ padding: "0 24px 48px" }}>
          <div style={{
            fontSize: 46, fontWeight: 800, color: C.text,
            letterSpacing: "-2px",
          }}>
            $25,304.66
          </div>
        </div>

        {/* ── Feature Icons Grid ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            rowGap: 28, columnGap: 8,
          }}>
            {boltApps.map(app => (
              <div key={app.id} onClick={() => onNavigate && onNavigate(app.id)} style={{ textAlign: "center", cursor: "pointer" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                  {/* Circle icon */}
                  <div style={{
                    width: 62, height: 62, borderRadius: "50%",
                    background: "#111930",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.text,
                  }}>
                    <app.Icon size={24} strokeWidth={1.7} />
                  </div>
                  {/* Lock overlay for gated apps */}
                  {app.locked && (
                    <div style={{
                      position: "absolute", bottom: -2, right: -2,
                      width: 20, height: 20, borderRadius: "50%",
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Lock size={10} color={C.textSub} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: 11, color: C.text, fontWeight: 500,
                  lineHeight: 1.35, paddingTop: 2,
                }}>
                  {app.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Card Flow Screens ────────────────────────────────────────────────────────

const LightningIcon = ({ size = 22, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M13 2L4.09 12.25H11L10 22l8.91-10.25H13L13 2z"/>
  </svg>
);

// Screen: Bolt Card Promo
function CardScreen({ onBack, onDeposit }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", padding: "16px 24px 12px",
      }}>
        <div style={{ ...s.backBtn, position: "absolute", left: 24 }} onClick={onBack}>
          <ChevronLeft size={20} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.text }}>Bolt Card</div>
      </div>

      {/* Account balance row */}
      <div style={{
        margin: "10px 16px",
        background: C.bgCard,
        borderRadius: 16,
        padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 14,
        border: `1px solid ${C.border}`,
      }}>
        <div style={{
          width: 44, height: 44,
          background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <LightningIcon />
        </div>
        <div>
          <div style={{ color: C.textSub, fontSize: 13 }}>Bolt Checking Account</div>
          <div style={{ color: C.text, fontSize: 20, fontWeight: 700 }}>$0.00</div>
        </div>
      </div>

      {/* Card promo */}
      <div style={{
        margin: "10px 16px",
        background: C.bgCard,
        borderRadius: 20,
        padding: "28px 24px 32px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        border: `1px solid ${C.border}`,
      }}>
        {/* Card visual */}
        <div style={{ position: "relative", width: 220, height: 130 }}>
          <div style={{
            width: 200, height: 120,
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 70%, #6d28d9 100%)",
            borderRadius: 14,
            position: "relative", overflow: "hidden",
            boxShadow: "0 8px 32px rgba(109,40,217,0.4)",
            display: "flex", alignItems: "flex-end", padding: "12px 14px",
          }}>
            <div style={{ position: "absolute", top: 12, left: 14, color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>BOLT</div>
            <div style={{ position: "absolute", top: 14, left: 58, color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 500, letterSpacing: 1 }}>DEBIT</div>
            <div style={{ position: "absolute", right: 14, bottom: 10 }}>
              <svg width="52" height="60" viewBox="0 0 60 72" fill="none">
                <defs>
                  <linearGradient id="cardLg" x1="0" y1="0" x2="60" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#818cf8"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
                <path d="M38 4L12 40H28L22 68L50 32H34L38 4Z" fill="url(#cardLg)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
              </svg>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, marginBottom: 2 }}>)))</span>
          </div>
          {/* Download badge */}
          <div style={{
            position: "absolute", top: -8, right: -8,
            width: 40, height: 40, background: "#fff", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f2937">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.text, textAlign: "center", lineHeight: 1.3 }}>
          Fund your account to activate your Bolt Card
        </div>
        <div style={{ fontSize: 14, color: C.textSub, textAlign: "center" }}>
          Add $5 or more to enable your virtual card.
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <PillBtn label="Deposit funds" white onClick={onDeposit} />
      </div>

      <div style={{ marginTop: "auto", padding: "20px 24px 52px", color: C.textMuted, fontSize: 11, textAlign: "center", lineHeight: 1.6 }}>
        This card is issued by Midland States Bank, Member FDIC,{"\n"}pursuant to a license from Mastercard International Inc.
      </div>
    </div>
  );
}

// Screen: Deposit Amount
function DepositScreen({ onBack, onSelectPayment }) {
  const [amount, setAmount] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  const appendDigit = d => {
    if (amount.length >= 6) return;
    setAmount(prev => prev + d);
  };
  const deleteDigit = () => setAmount(prev => prev.slice(0, -1));
  const displayVal = "$" + parseInt(amount || "0", 10).toLocaleString();

  const keys = [
    ["1",""], ["2","ABC"], ["3","DEF"],
    ["4","GHI"], ["5","JKL"], ["6","MNO"],
    ["7","PQRS"], ["8","TUV"], ["9","WXYZ"],
    null, ["0",""], "del",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
      </div>

      {/* Amount display */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <div style={{ fontSize: 52, fontWeight: 300, color: C.text, display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 3, height: 52, background: C.text, borderRadius: 2, opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }} />
          <span>{displayVal}</span>
        </div>
        <div style={{ color: C.textSub, fontSize: 14 }}>No fee</div>
      </div>

      {/* Keypad */}
      <div style={{ paddingBottom: 32 }}>
        <div style={{ padding: "0 16px 16px" }}>
          <PillBtn label="Select payment method" white onClick={onSelectPayment} />
        </div>
        <div style={{
          background: "#1c1c2a", borderRadius: "20px 20px 0 0",
          padding: "12px 8px 8px",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4,
        }}>
          {keys.map((k, i) => {
            if (k === null) return <div key={i} />;
            if (k === "del") return (
              <button key={i} onClick={deleteDigit} style={{
                padding: "16px 8px", border: "none", background: "transparent",
                borderRadius: 10, color: C.text, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="22" height="16" viewBox="0 0 24 18" fill={C.text}>
                  <path d="M22 0H8L0 9l8 9h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-3 12.59L17.59 14 14 10.41 10.41 14 9 12.59 12.59 9 9 5.41 10.41 4 14 7.59 17.59 4 19 5.41 15.41 9 19 12.59z"/>
                </svg>
              </button>
            );
            const [digit, sub] = k;
            return (
              <button key={i} onClick={() => appendDigit(digit)} style={{
                padding: "16px 8px", border: "none", background: "#2a2a3d",
                borderRadius: 10, color: C.text, fontSize: 22, fontWeight: 400,
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              }}>
                {digit}
                {sub && <span style={{ fontSize: 8, color: C.textSub, letterSpacing: "1.5px", fontWeight: 500 }}>{sub}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Screen: Wallet
function WalletScreen({ onBack, onBoltAccount, onConnectBank }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px" }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ display: "flex", gap: 8 }}>
          <CircleBtn><Settings size={16} /></CircleBtn>
          <CircleBtn><MoreHorizontal size={16} /></CircleBtn>
        </div>
      </div>

      <div style={{ padding: "4px 20px 16px" }}>
        <div style={{ ...s.title, fontSize: 32 }}>Wallet</div>
      </div>

      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {/* Bolt Checking */}
        <div onClick={onBoltAccount} style={{
          background: C.bgCard, borderRadius: 16, padding: "16px",
          display: "flex", alignItems: "center", gap: 14,
          cursor: "pointer", border: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: 44, height: 44,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <LightningIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#3b82f6", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20, marginBottom: 5, display: "inline-block" }}>Recommended</div>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 600, marginBottom: 3 }}>Bolt Checking Account</div>
            <div style={{ color: C.textSub, fontSize: 12 }}>No fees · Instant transfers</div>
          </div>
          <button onClick={e => { e.stopPropagation(); onBoltAccount(); }} style={{
            padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 500,
            cursor: "pointer", border: `1px solid ${C.border}`,
            background: "transparent", color: C.text, whiteSpace: "nowrap", fontFamily: "inherit",
          }}>Apply</button>
        </div>

        <div style={{ textAlign: "center", color: C.textSub, fontSize: 13, padding: "8px 0" }}>or</div>

        {/* Connect bank */}
        <div onClick={onConnectBank} style={{
          background: C.bgCard, borderRadius: 16, padding: "16px",
          display: "flex", alignItems: "center", gap: 14,
          cursor: "pointer", border: `1px solid ${C.border}`,
        }}>
          <div style={{ width: 44, height: 44, background: "#1e2235", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
              <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 600, marginBottom: 3 }}>Connect your bank</div>
            <div style={{ color: C.textSub, fontSize: 12 }}>Via Plaid · Secure & encrypted</div>
          </div>
          <button onClick={e => { e.stopPropagation(); onConnectBank(); }} style={{
            padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 500,
            cursor: "pointer", border: `1px solid ${C.border}`,
            background: "transparent", color: C.text, whiteSpace: "nowrap", fontFamily: "inherit",
          }}>Connect</button>
        </div>
      </div>

      <div style={{ padding: "16px 16px 52px" }}>
        <PillBtn label="Select" white onClick={onBoltAccount} />
      </div>
    </div>
  );
}

// Screen: Disclosures
function DisclosuresScreen({ onBack }) {
  const disclosures = [
    { title: "Electronic Communication Consent Agreement", desc: "Consent to use electronic signatures, communications, and statements." },
    { title: "Consumer checking account agreement", desc: "Outlines terms and conditions of using banking products and services provided by sponsor bank." },
    { title: "Privacy Notice", desc: "Learn how bank collects, uses, and shares your personal data." },
    { title: "Bolt Account Reward Program Terms", desc: "Learn more about reward." },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px 8px" }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <span style={{ color: C.textSub, fontSize: 14 }}>Disclosures</span>
      </div>

      <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>
        <div style={{ ...s.title, fontSize: 26, marginBottom: 28 }}>Review and accept disclosures</div>
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: C.border, borderRadius: 1 }} />
          {disclosures.map((d, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 28 }}>
              <div style={{
                position: "absolute", left: -24, top: 4,
                width: 12, height: 12, borderRadius: "50%",
                background: C.bgCard, border: `2px solid ${C.border}`,
              }} />
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600, lineHeight: 1.4, flex: 1 }}>{d.title}</div>
                <div style={{ background: "#4c1d95", color: "#a78bfa", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>Required</div>
              </div>
              <div style={{ color: C.textSub, fontSize: 12, lineHeight: 1.5 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px 52px" }}>
        <button style={{
          width: "100%", padding: 18,
          background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)",
          border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600,
          cursor: "default", fontFamily: "inherit",
        }}>Continue</button>
      </div>
    </div>
  );
}

// Screen: Plaid (light theme)
function PlaidScreen({ onBack }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#ffffff" }}>
      <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onBack} style={{
          width: 32, height: 32, borderRadius: "50%", background: "transparent",
          border: "none", color: "#1f2937", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit",
        }}>✕</button>
      </div>

      <div style={{ flex: 1, padding: "24px 24px 0", display: "flex", flexDirection: "column" }}>
        {/* Logos */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #3b82f6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LightningIcon size={22} />
          </div>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #818cf8, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
            </svg>
          </div>
        </div>

        <div style={{ color: "#111827", fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 24, lineHeight: 1.3 }}>
          Bolt SuperApp uses Plaid to connect your account
        </div>

        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 12, padding: "16px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 18 }}>🇺🇸</span>
          <span style={{ color: "#374151", fontSize: 15, fontWeight: 500 }}>+1</span>
          <span style={{ color: "#d1d5db", margin: "0 4px" }}>|</span>
          <span style={{ color: "#374151", fontSize: 15, letterSpacing: 1 }}>(•••) ••• 5555</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #3b82f6, #06b6d4)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <LightningIcon size={14} />
          </div>
          <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}>
            Use your phone number to log in or sign up with Plaid to go faster next time.{" "}
            <span style={{ color: "#374151", textDecoration: "underline", cursor: "pointer" }}>Learn more</span>
          </p>
        </div>
      </div>

      <div style={{ padding: "0 24px 52px", marginTop: "auto" }}>
        <p style={{ color: "#9ca3af", fontSize: 11, textAlign: "center", lineHeight: 1.6, marginBottom: 16 }}>
          <span style={{ color: "#374151", textDecoration: "underline", cursor: "pointer" }}>Terms</span> apply. By continuing, you agree to Plaid's{" "}
          <span style={{ color: "#374151", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span> and to receive updates on plaid.com
        </p>
        <button style={{
          width: "100%", padding: 18, background: "#111827", color: "#fff",
          border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600,
          cursor: "pointer", marginBottom: 12, fontFamily: "inherit",
        }}>Continue</button>
        <button style={{
          width: "100%", padding: 14, background: "transparent", color: "#374151",
          border: "none", fontSize: 14, cursor: "pointer", fontFamily: "inherit",
        }}>Continue without phone number</button>
      </div>
    </div>
  );
}

// ─── KYC Step 1: Date of Birth ────────────────────────────────────────────────
function KYCDOBScreen({ onBack, onContinue }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  const valid = month.length === 2 && day.length === 2 && year.length === 4;

  const handleMonth = v => {
    const clean = v.replace(/\D/g, "").slice(0, 2);
    setMonth(clean);
    if (clean.length === 2) dayRef.current?.focus();
  };
  const handleDay = v => {
    const clean = v.replace(/\D/g, "").slice(0, 2);
    setDay(clean);
    if (clean.length === 2) yearRef.current?.focus();
  };
  const handleYear = v => setYear(v.replace(/\D/g, "").slice(0, 4));

  const inputStyle = filled => ({
    width: "100%", boxSizing: "border-box",
    background: C.bgInput,
    border: `1.5px solid ${filled ? C.cyan : C.border}`,
    borderRadius: 14, color: C.text,
    fontSize: 26, fontWeight: 600, textAlign: "center",
    outline: "none", fontFamily: "inherit",
    boxShadow: filled ? `0 0 0 3px ${C.cyanGlow}` : "none",
    transition: "border 0.2s, box-shadow 0.2s",
    padding: "14px 8px",
  });

  return (
    <div style={{ ...s.screen, paddingTop: 0 }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 0 24px", gap: 12 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i === 1 ? C.cyan : C.border }} />)}
        </div>
      </div>

      <div style={{ background: "rgba(29,211,247,0.12)", color: C.cyan, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 16, letterSpacing: "0.5px" }}>
        VERIFY IDENTITY · 1 OF 4
      </div>

      <div style={{ ...s.title }}>Date of birth</div>
      <div style={{ ...s.subtitle, marginBottom: 36 }}>
        Required by federal law to verify your identity before opening an account.
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <input type="text" inputMode="numeric" placeholder="MM" value={month} onChange={e => handleMonth(e.target.value)} style={inputStyle(month.length > 0)} />
          <span style={{ color: C.textSub, fontSize: 12, textAlign: "center" }}>Month</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <input ref={dayRef} type="text" inputMode="numeric" placeholder="DD" value={day} onChange={e => handleDay(e.target.value)} style={inputStyle(day.length > 0)} />
          <span style={{ color: C.textSub, fontSize: 12, textAlign: "center" }}>Day</span>
        </div>
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 6 }}>
          <input ref={yearRef} type="text" inputMode="numeric" placeholder="YYYY" value={year} onChange={e => handleYear(e.target.value)} style={inputStyle(year.length > 0)} />
          <span style={{ color: C.textSub, fontSize: 12, textAlign: "center" }}>Year</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ paddingBottom: 52 }}>
        <PillBtn label="Continue" white disabled={!valid} onClick={valid ? onContinue : undefined} />
      </div>
    </div>
  );
}

// ─── KYC Step 2: Social Security Number ──────────────────────────────────────
function KYCSSNScreen({ onBack, onContinue }) {
  const [ssn, setSSN] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  const clean = ssn.replace(/\D/g, "");
  const formatted = clean.length <= 3
    ? clean
    : clean.length <= 5
      ? `${clean.slice(0,3)}-${clean.slice(3)}`
      : `${clean.slice(0,3)}-${clean.slice(3,5)}-${clean.slice(5,9)}`;
  const valid = clean.length === 9;

  const handleChange = e => setSSN(e.target.value.replace(/\D/g, "").slice(0, 9));

  return (
    <div style={{ ...s.screen, paddingTop: 0 }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 0 24px", gap: 12 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 2 ? C.cyan : C.border }} />)}
        </div>
      </div>

      <div style={{ background: "rgba(29,211,247,0.12)", color: C.cyan, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 16, letterSpacing: "0.5px" }}>
        VERIFY IDENTITY · 2 OF 4
      </div>

      <div style={{ ...s.title }}>Social Security Number</div>
      <div style={{ ...s.subtitle, marginBottom: 36 }}>
        Your SSN is encrypted and never stored in plain text. Used only to verify your identity.
      </div>

      <div style={{
        background: C.bgInput,
        border: `1.5px solid ${focused || valid ? C.cyan : C.border}`,
        borderRadius: 16, padding: "18px 16px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: focused || valid ? `0 0 0 3px ${C.cyanGlow}` : "none",
        transition: "border 0.2s, box-shadow 0.2s",
      }}>
        <input
          type="text"
          inputMode="numeric"
          placeholder="XXX-XX-XXXX"
          value={show ? formatted : (formatted ? formatted.replace(/\d/g, "•") : "")}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: C.text, fontSize: 22, fontWeight: 600,
            letterSpacing: show ? "3px" : "5px", fontFamily: "inherit",
          }}
        />
        <button onClick={() => setShow(v => !v)} style={{ background: "transparent", border: "none", cursor: "pointer", color: C.textSub, padding: 4, display: "flex" }}>
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(43,181,94,0.1)", border: "1px solid rgba(43,181,94,0.25)", borderRadius: 12, padding: "12px 14px", marginTop: 14 }}>
        <Shield size={16} color={C.green} strokeWidth={2} />
        <span style={{ color: C.green, fontSize: 12, lineHeight: 1.4 }}>256-bit encrypted · Never shared with third parties</span>
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ paddingBottom: 52 }}>
        <PillBtn label="Continue" white disabled={!valid} onClick={valid ? onContinue : undefined} />
      </div>
    </div>
  );
}

// ─── KYC Step 3: Citizenship ──────────────────────────────────────────────────
function KYCCitizenshipScreen({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: "us_citizen",          label: "U.S. Citizen",           desc: "Born or naturalized citizen of the United States", icon: "🇺🇸" },
    { id: "permanent_resident",  label: "Permanent Resident",     desc: "Green card holder (Legal Permanent Resident)",     icon: "📋" },
    { id: "other",               label: "Other",                  desc: "Visa holder or non-resident alien",                icon: "🌐" },
  ];

  return (
    <div style={{ ...s.screen, paddingTop: 0 }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 0 24px", gap: 12 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= 3 ? C.cyan : C.border }} />)}
        </div>
      </div>

      <div style={{ background: "rgba(29,211,247,0.12)", color: C.cyan, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 16, letterSpacing: "0.5px" }}>
        VERIFY IDENTITY · 3 OF 4
      </div>

      <div style={{ ...s.title }}>Citizenship status</div>
      <div style={{ ...s.subtitle, marginBottom: 28 }}>
        Required for federal compliance and FDIC-insured account opening.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map(opt => {
          const on = selected === opt.id;
          return (
            <div key={opt.id} onClick={() => setSelected(opt.id)} style={{
              background: C.bgCard,
              border: `1.5px solid ${on ? C.cyan : C.border}`,
              borderRadius: 16, padding: "16px",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
              boxShadow: on ? `0 0 0 1px ${C.cyan}22, 0 4px 16px ${C.cyanGlow}` : "none",
              transition: "border 0.15s, box-shadow 0.15s",
            }}>
              <span style={{ fontSize: 28 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{opt.label}</div>
                <div style={{ color: C.textSub, fontSize: 12, lineHeight: 1.4 }}>{opt.desc}</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${on ? C.cyan : C.textMuted}`, background: on ? C.cyan : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {on && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#07091A" }} />}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ paddingBottom: 52 }}>
        <PillBtn label="Continue" white disabled={!selected} onClick={selected ? onContinue : undefined} />
      </div>
    </div>
  );
}

// ─── KYC Step 4: Address ──────────────────────────────────────────────────────
function KYCAddressScreen({ onBack, onContinue }) {
  const [form, setForm] = useState({ street: "", apt: "", city: "", state: "", zip: "" });
  const [focused, setFocused] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.street && form.city && form.state && form.zip.length >= 5;

  const fieldStyle = (key) => ({
    width: "100%", boxSizing: "border-box",
    background: C.bgInput,
    border: `1.5px solid ${focused === key ? C.cyan : (form[key] ? "rgba(255,255,255,0.12)" : C.border)}`,
    borderRadius: 12, color: C.text, fontSize: 15,
    padding: "13px 14px", outline: "none", fontFamily: "inherit",
    boxShadow: focused === key ? `0 0 0 3px ${C.cyanGlow}` : "none",
    transition: "border 0.2s, box-shadow 0.2s",
  });

  const Field = ({ label, k, placeholder, half }) => (
    <div style={{ flex: half ? "0 0 calc(50% - 6px)" : "1 1 100%" }}>
      <div style={{ color: C.textSub, fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <input type="text" placeholder={placeholder} value={form[k]} onChange={e => set(k, e.target.value)} onFocus={() => setFocused(k)} onBlur={() => setFocused(null)} style={fieldStyle(k)} />
    </div>
  );

  return (
    <div style={{ ...s.screen, paddingTop: 0, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "16px 0 24px", gap: 12 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ flex: 1, display: "flex", gap: 5 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: C.cyan }} />)}
        </div>
      </div>

      <div style={{ background: "rgba(29,211,247,0.12)", color: C.cyan, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, display: "inline-block", marginBottom: 16, letterSpacing: "0.5px" }}>
        VERIFY IDENTITY · 4 OF 4
      </div>

      <div style={{ ...s.title }}>Home address</div>
      <div style={{ ...s.subtitle, marginBottom: 28 }}>
        Must be a valid U.S. residential address. P.O. boxes are not accepted.
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
        <Field label="Street address" k="street" placeholder="123 Main St" />
        <Field label="Apt / Suite (optional)" k="apt" placeholder="Apt 4B" />
        <Field label="City" k="city" placeholder="New York" half />
        <Field label="State" k="state" placeholder="NY" half />
        <Field label="ZIP code" k="zip" placeholder="10001" half />
      </div>

      <div style={{ flex: 1, minHeight: 16 }} />
      <div style={{ paddingBottom: 52, paddingTop: 16 }}>
        <PillBtn label="Continue to account setup" white disabled={!valid} onClick={valid ? onContinue : undefined} />
      </div>
    </div>
  );
}

// ─── Bolt Account Agreements ──────────────────────────────────────────────────
function BoltAccountAgreementsScreen({ onBack, onContinue }) {
  const agreements = [
    { id: "econsent",  title: "Electronic Communications Consent",    desc: "Agree to receive documents and statements electronically." },
    { id: "checking",  title: "Consumer Checking Account Agreement",  desc: "Terms and conditions for your Bolt Checking Account powered by Midland State Bank." },
    { id: "privacy",   title: "Privacy Notice",                       desc: "How Midland State Bank collects, uses, and protects your personal information." },
    { id: "rewards",   title: "Bolt Account Reward Program Terms",    desc: "Earn rewards on eligible purchases made with your Bolt account." },
    { id: "patriot",   title: "USA PATRIOT Act Notice",               desc: "Federal law requires we verify your identity when opening an account." },
  ];

  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(v => ({ ...v, [id]: !v[id] }));
  const numChecked = agreements.filter(a => checked[a.id]).length;
  const allChecked = numChecked === agreements.length;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px 0", flexShrink: 0 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <span style={{ color: C.textSub, fontSize: 14 }}>Account Setup</span>
      </div>

      {/* Branding */}
      <div style={{ padding: "16px 24px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #3b82f6, #06b6d4)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <LightningIcon size={24} />
          </div>
          <div>
            <div style={{ color: C.text, fontSize: 17, fontWeight: 700 }}>Bolt Checking Account</div>
            <div style={{ color: C.textSub, fontSize: 12, marginTop: 2 }}>Powered by Midland State Bank · Member FDIC</div>
          </div>
        </div>
        <div style={{ ...s.title, fontSize: 22, marginBottom: 4 }}>Review & accept agreements</div>
        <div style={{ ...s.subtitle, fontSize: 13 }}>Please read and accept all agreements to open your account.</div>
      </div>

      {/* Scrollable list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {agreements.map(a => (
            <div key={a.id} onClick={() => toggle(a.id)} style={{
              background: C.bgCard,
              border: `1.5px solid ${checked[a.id] ? C.cyan : C.border}`,
              borderRadius: 14, padding: "14px 16px",
              cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12,
              boxShadow: checked[a.id] ? `0 0 0 1px ${C.cyan}22` : "none",
              transition: "border 0.15s",
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, background: checked[a.id] ? C.cyan : "transparent", border: `2px solid ${checked[a.id] ? C.cyan : C.textMuted}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                {checked[a.id] && <Check size={13} color="#07091A" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.35 }}>{a.title}</div>
                <div style={{ color: C.textSub, fontSize: 11, lineHeight: 1.5, marginBottom: 4 }}>{a.desc}</div>
                <div style={{ color: C.cyan, fontSize: 11 }}>Read full agreement →</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ color: C.textMuted, fontSize: 10, textAlign: "center", lineHeight: 1.6, padding: "16px 0 8px" }}>
          This account is issued by Midland States Bank, Member FDIC,{"\n"}pursuant to a license from Mastercard International Inc.
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "16px 24px 52px", flexShrink: 0 }}>
        <PillBtn
          label={allChecked ? "Accept & Continue" : `Accept all agreements (${numChecked}/${agreements.length})`}
          white disabled={!allChecked}
          onClick={allChecked ? onContinue : undefined}
        />
      </div>
    </div>
  );
}

// ─── Send / Receive Screen ────────────────────────────────────────────────────
function SendReceiveScreen({ onBack, onDeposit }) {
  const [tab, setTab] = useState("send");
  const [amount, setAmount] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  const displayVal = "$" + parseInt(amount || "0", 10).toLocaleString();

  const recent = [
    { name: "Alex K.",  avatar: "AK", color: "#7B5CF5" },
    { name: "Sarah M.", avatar: "SM", color: "#E8386D" },
    { name: "James L.", avatar: "JL", color: "#2BB55E" },
  ];

  const keys = [
    ["1",""], ["2","ABC"], ["3","DEF"],
    ["4","GHI"], ["5","JKL"], ["6","MNO"],
    ["7","PQRS"], ["8","TUV"], ["9","WXYZ"],
    null, ["0",""], "del",
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px 8px", flexShrink: 0 }}>
        <div style={s.backBtn} onClick={onBack}><ChevronLeft size={20} /></div>
        <div style={{ display: "flex", background: C.bgCard, borderRadius: 20, padding: 4, border: `1px solid ${C.border}` }}>
          {["send", "receive"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "7px 18px", borderRadius: 16, border: "none",
              background: tab === t ? "#FFFFFF" : "transparent",
              color: tab === t ? "#07091A" : C.textSub,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", transition: "background 0.2s, color 0.2s",
            }}>
              {t === "send" ? "↑ Send" : "↓ Receive"}
            </button>
          ))}
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Balance */}
      <div style={{ textAlign: "center", padding: "0 0 4px", flexShrink: 0 }}>
        <span style={{ color: C.textSub, fontSize: 12 }}>Bolt Checking  ·  </span>
        <span style={{ color: C.text, fontSize: 12, fontWeight: 600 }}>$25,304.66 available</span>
      </div>

      {/* Amount display */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 24px 8px", flexShrink: 0 }}>
        <div style={{ fontSize: 52, fontWeight: 300, color: C.text, display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 3, height: 52, background: C.text, borderRadius: 2, opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }} />
          <span>{displayVal}</span>
        </div>
        <div style={{ color: C.textSub, fontSize: 13 }}>No fee · Instant</div>
      </div>

      {/* Quick contacts */}
      <div style={{ padding: "4px 24px 8px", flexShrink: 0 }}>
        <div style={{ color: C.textSub, fontSize: 12, fontWeight: 500, marginBottom: 10 }}>
          {tab === "send" ? "Send to" : "Receive from"}
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {recent.map(r => (
            <div key={r.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700 }}>{r.avatar}</div>
              <span style={{ color: C.textSub, fontSize: 10 }}>{r.name.split(" ")[0]}</span>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub }}>
              <Plus size={18} />
            </div>
            <span style={{ color: C.textSub, fontSize: 10 }}>Add</span>
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div style={{ marginTop: "auto" }}>
        <div style={{ padding: "0 16px 10px" }}>
          <PillBtn label="Choose payment method" white onClick={onDeposit} />
        </div>
        <div style={{ background: "#1c1c2a", borderRadius: "20px 20px 0 0", padding: "12px 8px 8px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {keys.map((k, i) => {
            if (k === null) return <div key={i} />;
            if (k === "del") return (
              <button key={i} onClick={() => setAmount(a => a.slice(0, -1))} style={{ padding: "16px 8px", border: "none", background: "transparent", borderRadius: 10, color: C.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="16" viewBox="0 0 24 18" fill={C.text}><path d="M22 0H8L0 9l8 9h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-3 12.59L17.59 14 14 10.41 10.41 14 9 12.59 12.59 9 9 5.41 10.41 4 14 7.59 17.59 4 19 5.41 15.41 9 19 12.59z"/></svg>
              </button>
            );
            const [digit, sub] = k;
            return (
              <button key={i} onClick={() => { if (amount.length < 6) setAmount(a => a + digit); }} style={{ padding: "16px 8px", border: "none", background: "#2a2a3d", borderRadius: 10, color: C.text, fontSize: 22, fontWeight: 400, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {digit}
                {sub && <span style={{ fontSize: 8, color: C.textSub, letterSpacing: "1.5px", fontWeight: 500 }}>{sub}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Rewards Screen ───────────────────────────────────────────────────────────
function RewardsScreen({ onBack }) {
  const rewards = [
    { name: "Bolt Card Purchase",  points: "+150 pts", date: "Today",     color: C.green  },
    { name: "Referral Bonus",      points: "+500 pts", date: "Yesterday", color: C.cyan   },
    { name: "Monthly Streak",      points: "+100 pts", date: "Mar 31",    color: C.purple },
    { name: "Shop AI Cashback",    points: "+75 pts",  date: "Mar 29",    color: C.orange },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "16px 24px 12px" }}>
        <div style={{ ...s.backBtn, position: "absolute", left: 24 }} onClick={onBack}>
          <ChevronLeft size={20} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.text }}>Rewards</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
        {/* Points balance */}
        <div style={{ textAlign: "center", padding: "28px 0 32px" }}>
          <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Total Points</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: C.text, letterSpacing: "-2px" }}>2,750</div>
          <div style={{ fontSize: 13, color: C.textSub, marginTop: 6 }}>≈ $27.50 value</div>
        </div>

        {/* Redeem button */}
        <PillBtn label="Redeem Points" white onClick={() => {}} />

        {/* Recent activity */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rewards.map((r, i) => (
              <div key={i} style={{
                background: C.bgCard, borderRadius: 14, padding: "14px 16px",
                border: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ color: C.textSub, fontSize: 12, marginTop: 3 }}>{r.date}</div>
                </div>
                <div style={{ color: r.color, fontSize: 14, fontWeight: 700 }}>{r.points}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

// ─── Crypto Screen ────────────────────────────────────────────────────────────
function CryptoScreen({ onBack }) {
  const coins = [
    { symbol: "BTC", name: "Bitcoin",  price: "$68,420", change: "+2.4%", bal: "0.124 BTC", value: "$8,484.08", color: "#F7931A" },
    { symbol: "ETH", name: "Ethereum", price: "$3,280",  change: "-0.8%", bal: "1.85 ETH",  value: "$6,068.00", color: "#627EEA" },
    { symbol: "SOL", name: "Solana",   price: "$148",    change: "+5.1%", bal: "24 SOL",    value: "$3,552.00", color: "#9945FF" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "16px 24px 12px" }}>
        <div style={{ ...s.backBtn, position: "absolute", left: 24 }} onClick={onBack}>
          <ChevronLeft size={20} />
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: C.text }}>Crypto</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px" }}>
        {/* Portfolio balance */}
        <div style={{ textAlign: "center", padding: "24px 0 28px" }}>
          <div style={{ fontSize: 13, color: C.textSub, marginBottom: 8 }}>Portfolio Value</div>
          <div style={{ fontSize: 46, fontWeight: 800, color: C.text, letterSpacing: "-2px" }}>$18,104.08</div>
          <div style={{ fontSize: 13, color: C.green, marginTop: 6 }}>↑ +$432.10 today</div>
        </div>

        {/* Buy / Sell */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          <PillBtn label="Buy"  white onClick={() => {}} style={{ flex: 1 }} />
          <PillBtn label="Sell" onClick={() => {}} style={{ flex: 1 }} />
        </div>

        {/* Holdings */}
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>Your Holdings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {coins.map((c, i) => (
            <div key={i} style={{
              background: C.bgCard, borderRadius: 14, padding: "14px 16px",
              border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: c.color + "22",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ color: c.color, fontSize: 10, fontWeight: 800 }}>{c.symbol}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                <div style={{ color: C.textSub, fontSize: 12, marginTop: 2 }}>
                  {c.price} · <span style={{ color: c.change.startsWith("+") ? C.green : C.pink }}>{c.change}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>{c.value}</div>
                <div style={{ color: C.textSub, fontSize: 12, marginTop: 2 }}>{c.bal}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function SuperApp() {
  const [screen, setScreen] = useState("splash");
  const [email, setEmail] = useState("");
  const [apps, setApps] = useState([]);
  const [kycComplete, setKycComplete] = useState(false);
  const [msbAgreementsComplete, setMsbAgreementsComplete] = useState(false);
  const [pendingDestination, setPendingDestination] = useState(null);

  // Apps that require KYC + MSB Agreements
  const MSB_GATED = ["cards", "send", "rewards"];
  // Apps that require KYC only
  const KYC_ONLY_GATED = ["crypto"];

  // Navigate to the actual app screen after all gates are cleared
  const navigateToApp = (appId) => {
    if (appId === "cards")   setScreen("cards");
    else if (appId === "send")    setScreen("send_receive");
    else if (appId === "rewards") setScreen("rewards");
    else if (appId === "crypto")  setScreen("crypto_app");
  };

  const handleNavigate = (appId) => {
    if (MSB_GATED.includes(appId)) {
      if (!kycComplete) {
        setPendingDestination(appId);
        setScreen("kyc_dob");
      } else if (!msbAgreementsComplete) {
        setPendingDestination(appId);
        setScreen("bank_agreements");
      } else {
        navigateToApp(appId);
      }
    } else if (KYC_ONLY_GATED.includes(appId)) {
      if (!kycComplete) {
        setPendingDestination(appId);
        setScreen("kyc_dob");
      } else {
        setScreen("crypto_app");
      }
    }
    // Other apps — no dedicated screen yet, no-op
  };

  return (
    <PhoneFrame>
      {/* ── Onboarding ── */}
      {screen === "splash"              && <SplashScreen             onDone={() => setScreen("welcome")} />}
      {screen === "welcome"             && <WelcomeScreen            onCreate={() => setScreen("email")} onLogin={() => setScreen("email")} />}
      {screen === "email"               && <EmailScreen              onBack={() => setScreen("welcome")} onContinue={e => { setEmail(e); setScreen("verify"); }} />}
      {screen === "verify"              && <VerifyScreen             email={email} onBack={() => setScreen("email")} onContinue={() => setScreen("interests")} />}
      {screen === "interests"           && <InterestsScreen          onContinue={a => { setApps(a); setScreen("dashboard"); }} onSkipAll={() => { setApps(APPS.map(a => a.id)); setScreen("dashboard"); }} />}
      {screen === "dashboard"           && <DashboardScreen          selectedApps={apps} onNavigate={handleNavigate} />}

      {/* ── KYC Flow (shared gate for Bank/Card, Send/Receive, Rewards, Crypto) ── */}
      {screen === "kyc_dob"             && <KYCDOBScreen             onBack={() => setScreen("dashboard")} onContinue={() => setScreen("kyc_ssn")} />}
      {screen === "kyc_ssn"             && <KYCSSNScreen             onBack={() => setScreen("kyc_dob")} onContinue={() => setScreen("kyc_citizenship")} />}
      {screen === "kyc_citizenship"     && <KYCCitizenshipScreen     onBack={() => setScreen("kyc_ssn")} onContinue={() => setScreen("kyc_address")} />}
      {screen === "kyc_address"         && <KYCAddressScreen         onBack={() => setScreen("kyc_citizenship")} onContinue={() => {
        setKycComplete(true);
        if (pendingDestination === "crypto") setScreen("crypto_app");
        else setScreen("bank_agreements");
      }} />}

      {/* ── Midland States Bank Agreements (shared gate for Bank/Card, Send/Receive, Rewards) ── */}
      {screen === "bank_agreements"     && <BoltAccountAgreementsScreen
        onBack={() => setScreen("dashboard")}
        onContinue={() => { setMsbAgreementsComplete(true); navigateToApp(pendingDestination || "cards"); }}
      />}

      {/* ── Bank/Card Flow ── */}
      {screen === "cards"               && <CardScreen               onBack={() => setScreen("dashboard")} onDeposit={() => setScreen("deposit")} />}
      {screen === "deposit"             && <DepositScreen            onBack={() => setScreen("cards")} onSelectPayment={() => setScreen("wallet")} />}
      {screen === "wallet"              && <WalletScreen             onBack={() => setScreen("deposit")} onBoltAccount={() => setScreen("disclosures")} onConnectBank={() => setScreen("plaid")} />}
      {screen === "disclosures"         && <DisclosuresScreen        onBack={() => setScreen("wallet")} />}

      {/* ── Plaid Flow ── */}
      {screen === "plaid"               && <PlaidScreen              onBack={() => setScreen("wallet")} />}

      {/* ── Send / Receive (unlocked after KYC + MSB Agreements) ── */}
      {screen === "send_receive"        && <SendReceiveScreen        onBack={() => setScreen("dashboard")} onDeposit={() => setScreen("wallet")} />}

      {/* ── Rewards (unlocked after KYC + MSB Agreements) ── */}
      {screen === "rewards"             && <RewardsScreen            onBack={() => setScreen("dashboard")} />}

      {/* ── Crypto (unlocked after KYC) ── */}
      {screen === "crypto_app"          && <CryptoScreen             onBack={() => setScreen("dashboard")} />}
    </PhoneFrame>
  );
}
