import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, X, Minus, RotateCcw, Send, ArrowLeft } from "lucide-react";
import { ChatbotLogo } from "@/components/ChatbotLogo";

/* ---------- palette (per spec) ---------- */
const C = {
  sky: "#5DADE2",
  bright: "#4DB3FF",
  navy: "#003D7A",
  medium: "#1E5BA8",
  white: "#FFFFFF",
  light: "#F5F5F5",
  text: "#1A1A1A",
};

/* ---------- flow definitions ---------- */
type StepId =
  | "welcome"
  | "audit_service"
  | "offshoring_service"
  | "need"
  | "urgency"
  | "unsure_branch"
  | "discovery_datetime"
  | "contact"
  | "submitting"
  | "success"
  | "error";

const AUDIT_SERVICES = [
  "IT Governance & Compliance Audit",
  "Cybersecurity Risk Assessment",
  "Digital Transformation Consulting",
  "ERP & Enterprise Software Advisory",
  "IT Infrastructure Review",
  "DORA Compliance Assessment",
  "IT Due Diligence for M&A",
  "Not sure",
];

const OFFSHORING_SERVICES = [
  "Offshore Software Development Teams",
  "Managed IT Support & Helpdesk",
  "QA & Software Testing Outsourcing",
  "Data Engineering & Analytics Offshoring",
  "Project Management as a Service",
  "IT Offshoring Audit & Resource Review",
  "Not sure",
];

const URGENCY = ["As soon as possible", "This week", "This month", "Just exploring"];
const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Video call"];

type Msg = { role: "bot" | "user"; text: string; id: string };

type Data = {
  lead_type: string;
  service_pillar: string | null;
  selected_service: string | null;
  need_description: string | null;
  urgency: string | null;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  preferred_date_time: string;
  preferred_contact_method: string;
};

const emptyData: Data = {
  lead_type: "",
  service_pillar: null,
  selected_service: null,
  need_description: null,
  urgency: null,
  full_name: "",
  company_name: "",
  email: "",
  phone: "",
  preferred_date_time: "",
  preferred_contact_method: "",
};

const LS_KEY = "btech_chatbot_state_v1";
const LS_COOLDOWN = "btech_chatbot_last_submit";

function uid() {
  return Math.random().toString(36).slice(2);
}
function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isPhone(v: string) {
  return v.replace(/\D/g, "").length >= 7;
}

export function BTechChatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<StepId>("welcome");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [data, setData] = useState<Data>(emptyData);
  const [freeInput, setFreeInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------- persistence ---------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.step) setStep(s.step);
        if (s.messages) setMessages(s.messages);
        if (s.data) setData(s.data);
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ step, messages, data }));
    } catch {}
  }, [step, messages, data]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uid(),
          role: "bot",
          text: "Hi 👋 Welcome to BTech Consulting. How can we help you today?",
        },
      ]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, step, open]);

  /* ---------- helpers ---------- */
  const pushBot = (text: string) => setMessages((m) => [...m, { id: uid(), role: "bot", text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { id: uid(), role: "user", text }]);

  const resetAll = () => {
    setMessages([
      {
        id: uid(),
        role: "bot",
        text: "Hi 👋 Welcome to BTech Consulting. How can we help you today?",
      },
    ]);
    setData(emptyData);
    setStep("welcome");
    setFreeInput("");
    setError(null);
  };

  /* ---------- step transitions ---------- */
  const chooseWelcome = (opt: string) => {
    pushUser(opt);
    if (opt === "IT Audit & Consulting") {
      setData((d) => ({ ...d, lead_type: "Service Lead", service_pillar: "IT Audit & Consulting" }));
      pushBot("Great choice. Which service are you interested in?");
      setStep("audit_service");
    } else if (opt === "IT Offshoring") {
      setData((d) => ({ ...d, lead_type: "Service Lead", service_pillar: "IT Offshoring" }));
      pushBot("Excellent. What type of offshoring support are you looking for?");
      setStep("offshoring_service");
    } else {
      setData((d) => ({
        ...d,
        lead_type: "Discovery Call Request",
        service_pillar: "Not sure yet",
        selected_service: null,
      }));
      pushBot(
        "No problem 👋 We can help you identify the right service based on your current situation. Would you like to schedule a short discovery call with a BTech Consulting sales agent?",
      );
      setStep("unsure_branch");
    }
  };

  const chooseService = (opt: string) => {
    pushUser(opt);
    setData((d) => ({ ...d, selected_service: opt }));
    pushBot("Can you briefly describe your current need or challenge?");
    setStep("need");
  };

  const submitNeed = () => {
    const v = freeInput.trim();
    if (!v) return;
    pushUser(v);
    setData((d) => ({ ...d, need_description: v }));
    setFreeInput("");
    pushBot("How urgent is your request?");
    setStep("urgency");
  };

  const chooseUrgency = (opt: string) => {
    pushUser(opt);
    setData((d) => ({ ...d, urgency: opt }));
    pushBot("Almost done. Please share a few details so the right person can reach out.");
    setStep("contact");
  };

  const chooseUnsure = (opt: string) => {
    pushUser(opt);
    if (opt === "Yes, schedule a call") {
      setData((d) => ({
        ...d,
        lead_type: "Discovery Call Request",
        need_description:
          "Visitor requested help identifying the right BTech Consulting service.",
        urgency: null,
      }));
      pushBot("Great! When would you like the discovery call?");
      setStep("discovery_datetime");
    } else {
      pushBot(
        "No problem. Can you briefly describe your current challenge or what you are trying to improve?",
      );
      setStep("need");
      // switch to Service Lead with pillar unknown but description flow
      setData((d) => ({ ...d, lead_type: "Service Lead" }));
    }
  };

  const submitDateTime = () => {
    const v = freeInput.trim();
    if (!v) return;
    pushUser(v);
    setData((d) => ({ ...d, preferred_date_time: v }));
    setFreeInput("");
    pushBot("Perfect. Share your contact details and we'll confirm the call.");
    setStep("contact");
  };

  /* ---------- final submission ---------- */
  const submitLead = async () => {
    setError(null);
    if (honeypot) {
      // silently drop
      setStep("success");
      return;
    }
    const last = Number(localStorage.getItem(LS_COOLDOWN) || 0);
    if (Date.now() - last < 15_000) {
      setError("Please wait a few seconds before submitting again.");
      return;
    }
    if (!data.email && !data.phone) {
      setError("Please provide either an email or a phone number.");
      return;
    }
    if (data.email && !isEmail(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (data.phone && !isPhone(data.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setStep("submitting");
    const payload = {
      lead_type: data.lead_type || "Service Lead",
      service_pillar: data.service_pillar,
      selected_service: data.selected_service,
      need_description: data.need_description,
      urgency: data.urgency,
      full_name: data.full_name || null,
      company_name: data.company_name || null,
      email: data.email || null,
      phone: data.phone || null,
      preferred_date_time: data.preferred_date_time || null,
      preferred_contact_method: data.preferred_contact_method || null,
      status: "New",
      source: "chatbot",
      page_url: typeof window !== "undefined" ? window.location.href : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    };

    const { error: insErr } = await supabase.from("leads").insert(payload);
    if (insErr) {
      console.error(insErr);
      setError("Sorry, we couldn't send your request. Please try again.");
      setStep("contact");
      return;
    }
    localStorage.setItem(LS_COOLDOWN, String(Date.now()));
    setStep("success");
  };

  /* ---------- render option pills ---------- */
  const Pills = ({ options, onPick }: { options: string[]; onPick: (v: string) => void }) => (
    <div className="flex flex-col gap-2 mt-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onPick(o)}
          className="text-left w-full rounded-xl border px-3 py-2.5 text-sm bg-white hover:bg-[#F5F5F5] transition"
          style={{ borderColor: "#E1EAF3", color: C.navy }}
        >
          {o}
        </button>
      ))}
    </div>
  );

  const Back = ({ to }: { to: StepId }) => (
    <button
      onClick={() => setStep(to)}
      className="text-xs inline-flex items-center gap-1 mt-2"
      style={{ color: C.medium }}
    >
      <ArrowLeft size={12} /> Back
    </button>
  );

  const successText = useMemo(() => {
    if (data.lead_type === "Discovery Call Request")
      return "Thank you. Your request has been received. A BTech Consulting sales agent will contact you to confirm the discovery call.";
    return "Thank you. Your request has been received. A BTech Consulting sales agent will contact you shortly.";
  }, [data.lead_type]);

  /* ---------- current step UI ---------- */
  const StepUI = () => {
    switch (step) {
      case "welcome":
        return (
          <Pills
            options={["IT Audit & Consulting", "IT Offshoring", "I'm not sure yet"]}
            onPick={chooseWelcome}
          />
        );
      case "audit_service":
        return (
          <>
            <Pills options={AUDIT_SERVICES} onPick={chooseService} />
            <Back to="welcome" />
          </>
        );
      case "offshoring_service":
        return (
          <>
            <Pills options={OFFSHORING_SERVICES} onPick={chooseService} />
            <Back to="welcome" />
          </>
        );
      case "unsure_branch":
        return (
          <>
            <Pills
              options={["Yes, schedule a call", "I prefer to describe my need first"]}
              onPick={chooseUnsure}
            />
            <Back to="welcome" />
          </>
        );
      case "need":
        return (
          <FreeText
            value={freeInput}
            onChange={setFreeInput}
            onSubmit={submitNeed}
            placeholder="Describe your need or challenge…"
            multiline
          />
        );
      case "urgency":
        return <Pills options={URGENCY} onPick={chooseUrgency} />;
      case "discovery_datetime":
        return (
          <FreeText
            value={freeInput}
            onChange={setFreeInput}
            onSubmit={submitDateTime}
            placeholder="e.g. Tue 3pm CET, or next Monday morning"
          />
        );
      case "contact":
        return (
          <ContactForm
            data={data}
            setData={setData}
            honeypot={honeypot}
            setHoneypot={setHoneypot}
            onSubmit={submitLead}
            error={error}
            isDiscovery={data.lead_type === "Discovery Call Request"}
          />
        );
      case "submitting":
        return (
          <div className="text-sm text-neutral-500 py-3 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: C.medium }} />
            Sending your request…
          </div>
        );
      case "success":
        return (
          <div className="mt-2">
            <div className="rounded-xl p-4" style={{ background: "#EAF6EE", color: "#0F5132" }}>
              ✅ {successText}
            </div>
            <button
              onClick={resetAll}
              className="mt-3 w-full rounded-xl py-2.5 text-sm font-medium text-white"
              style={{ background: C.medium }}
            >
              Start new request
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  /* ---------- launcher button ---------- */
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed z-[60] bottom-5 right-5 shadow-lg rounded-full pl-2 pr-4 py-2 flex items-center gap-2 text-white transition hover:scale-105"
        style={{ background: C.medium }}
        aria-label="Open BTech Consulting chat"
      >
        <ChatbotLogo size={32} bg="white" padding={3} />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-sm font-semibold">Talk to us</span>
          <span className="text-[10px] flex items-center gap-1 opacity-90">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
          </span>
        </span>
      </button>
    );
  }

  /* ---------- open window ---------- */
  return (
    <div className="fixed z-[60] bottom-5 right-5 w-[calc(100vw-2.5rem)] sm:w-[380px] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      style={{ background: C.white, border: "1px solid #E1EAF3" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: C.navy, color: C.white }}>
        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <ChatbotLogo size={28} variant="onDark" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">BTech Consulting</div>
          <div className="text-[11px] opacity-80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Usually replies within 24h
          </div>
        </div>
        <button onClick={resetAll} title="Reset conversation" className="opacity-80 hover:opacity-100">
          <RotateCcw size={16} />
        </button>
        <button onClick={() => setOpen(false)} title="Minimize" className="opacity-80 hover:opacity-100">
          <Minus size={18} />
        </button>
        <button onClick={() => setOpen(false)} title="Close" className="opacity-80 hover:opacity-100">
          <X size={18} />
        </button>
      </div>

      {/* Scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: C.light }}>
        {messages.map((m) => (
          <div key={m.id} className={m.role === "bot" ? "flex gap-2 items-end" : "flex justify-end"}>
            {m.role === "bot" && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: C.white, border: "1px solid #E1EAF3" }}>
                <ChatbotLogo size={22} variant="onLight" />
              </div>
            )}
            <div
              className={"rounded-2xl px-3 py-2 text-sm max-w-[80%] whitespace-pre-wrap " + (m.role === "bot" ? "" : "text-white")}
              style={
                m.role === "bot"
                  ? { background: C.white, color: C.text, border: "1px solid #E1EAF3" }
                  : { background: C.medium }
              }
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* Active step controls, rendered under last bot message */}
        <div>
          <StepUI />
        </div>
      </div>

      {/* Footer */}
      <div className="text-[10px] text-center py-1.5" style={{ background: C.white, color: "#94A3B8" }}>
        Powered by BTech Consulting
      </div>
    </div>
  );
}

/* ---------- sub-components ---------- */

function FreeText({
  value,
  onChange,
  onSubmit,
  placeholder,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <div className="mt-2 flex gap-2 items-end">
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="flex-1 rounded-xl border px-3 py-2 text-sm bg-white outline-none focus:ring-2"
          style={{ borderColor: "#E1EAF3", color: C.text }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder={placeholder}
          className="flex-1 rounded-xl border px-3 py-2 text-sm bg-white outline-none focus:ring-2"
          style={{ borderColor: "#E1EAF3", color: C.text }}
        />
      )}
      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="rounded-xl px-3 py-2 text-white disabled:opacity-50"
        style={{ background: C.medium }}
        aria-label="Send"
      >
        <Send size={16} />
      </button>
    </div>
  );
}

function ContactForm({
  data,
  setData,
  honeypot,
  setHoneypot,
  onSubmit,
  error,
  isDiscovery,
}: {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  honeypot: string;
  setHoneypot: (v: string) => void;
  onSubmit: () => void;
  error: string | null;
  isDiscovery: boolean;
}) {
  const F = "w-full rounded-xl border px-3 py-2 text-sm bg-white outline-none focus:ring-2";
  const style = { borderColor: "#E1EAF3", color: C.text } as React.CSSProperties;
  return (
    <div className="mt-2 space-y-2">
      <input className={F} style={style} placeholder="Full name" value={data.full_name}
        onChange={(e) => setData({ ...data, full_name: e.target.value })} />
      <input className={F} style={style} placeholder="Company name" value={data.company_name}
        onChange={(e) => setData({ ...data, company_name: e.target.value })} />
      <input className={F} style={style} placeholder="Email" type="email" value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })} />
      <input className={F} style={style} placeholder="Phone number" value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })} />
      {isDiscovery && (
        <input className={F} style={style} placeholder="Preferred date/time" value={data.preferred_date_time}
          onChange={(e) => setData({ ...data, preferred_date_time: e.target.value })} />
      )}
      <select className={F} style={style} value={data.preferred_contact_method}
        onChange={(e) => setData({ ...data, preferred_contact_method: e.target.value })}>
        <option value="">Preferred contact method</option>
        {CONTACT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>

      {/* Honeypot (hidden from users) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      {error && <div className="text-xs text-red-600">{error}</div>}

      <button
        onClick={onSubmit}
        className="w-full rounded-xl py-2.5 text-sm font-semibold text-white mt-1"
        style={{ background: C.medium }}
      >
        Send request
      </button>
    </div>
  );
}
