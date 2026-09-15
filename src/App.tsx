import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { SocialProof1 } from "@/components/social-proof-1";

/* ─── Inline SVGs ─── */
const Arrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ─── Data ─── */
const coreOverview = [
  {
    tag: "Vector Search & RAG",
    title: "Enterprise RAG Pipelines",
    desc: "Architecting low-latency business Q&A systems by preparing internal data, chunking, and indexing into vector stores (ChromaDB, FAISS) for zero-hallucination retrieval.",
    metric: "Sub-200ms with Intel OpenVINO",
  },
  {
    tag: "Multi-Agent Systems",
    title: "Autonomous Agent Workflows",
    desc: "Engineering production AI agents in n8n, Langflow, and LangChain with custom tool execution and function calling to automate enterprise reporting and operational alerts.",
    metric: "n8n · LangChain · Function Calling",
  },
  {
    tag: "Data Quality & Validation",
    title: "Python Data & Model Governance",
    desc: "Transforming enterprise sources with pandas, NumPy, and SQL. Benchmarking production LLM accuracy, mitigating hallucination drift, and reducing token costs.",
    metric: "pandas · numpy · scikit-learn",
  },
  {
    tag: "Cross-Silicon Optimization",
    title: "Hardware Tuning & Delivery",
    desc: "Optimizing AI models across Intel, Dell, Lenovo, Huawei, and Honor hardware (GPU/CPU/NPU) while serving as Certified Scrum Master across 4 client engagements.",
    metric: "Scrum Master · 4 Engagements",
  },
];

const skills = [
  {
    num: "01",
    area: "GenAI, RAG & LLMs",
    desc: "Production retrieval architectures, fine-tuning, and model compression.",
    items: ["RAG Pipelines", "ChromaDB", "FAISS", "LoRA / PEFT", "QAT", "Prompt Engineering", "LLaMA 2", "Hugging Face"],
  },
  {
    num: "02",
    area: "AI Agents & Automation",
    desc: "Multi-agent workflows with tool use and autonomous function calling.",
    items: ["n8n", "Langflow", "LangChain", "ComfyUI", "Function Calling", "Flux", "Hunyuan Diffusion"],
  },
  {
    num: "03",
    area: "Data Intelligence & Analytics",
    desc: "End-to-end data processing, statistical validation, and EDA pipelines.",
    items: ["Python", "pandas", "numpy", "scikit-learn", "SQL", "EDA & Jupyter", "Model Benchmarking"],
  },
  {
    num: "04",
    area: "Dev, Delivery & Hardware",
    desc: "Cross-hardware deployment and agile engineering management.",
    items: ["FastAPI", "Docker", "Git", "OpenVINO", "Wav2Lip", "Scrum Master", "Cursor / Copilot"],
  },
];

const projects = [
  {
    id: "01",
    title: "Live Avatar Interactive Chatbot",
    partner: "Intel Collaboration",
    year: "2025",
    description: "On-premise digital avatar backend utilizing Intel fastRAG and OpenVINO hardware acceleration for real-time speech synthesis and lip-syncing with sub-200 ms latency.",
    tech: ["fastRAG", "OpenVINO", "Wav2Lip", "FastAPI", "Python"],
    highlight: "Sub-200ms latency on Intel hardware",
  },
  {
    id: "02",
    title: "Automated Text-to-Video Pipelines",
    partner: "Bitsmedia Production",
    year: "2025",
    description: "Architected automated commercial video workflows in ComfyUI integrating Flux and Hunyuan diffusion models, cutting production rendering cycles by 40%.",
    tech: ["Flux", "Hunyuan", "ComfyUI", "LoRA", "PyTorch"],
    highlight: "Enterprise generative video pipeline",
  },
  {
    id: "03",
    title: "Domain Persona Clones — LLaMA 2",
    partner: "Research Project",
    year: "2024",
    description: "Fine-tuned LLaMA 2 on domain-specific dialogue corpora with Parameter-Efficient Fine-Tuning (PEFT/LoRA) and Quantization-Aware Training (QAT). Validated with BLEU and ROUGE.",
    tech: ["LLaMA 2", "Hugging Face", "LoRA", "QAT", "Python"],
    highlight: "Parameter-efficient model alignment",
  },
  {
    id: "04",
    title: "Industrial Vision & Coin Counter",
    partner: "TSH Company",
    year: "2024",
    description: "Automated defect detection system for high-speed manufacturing lines and real-time Malaysian currency counter delivering 99.2% accuracy in testing.",
    tech: ["YOLOv8", "OpenCV", "Custom CNNs", "NumPy"],
    highlight: "99.2% verification accuracy",
  },
];

const experience = [
  {
    role: "AI Engineer / Data Solutions Consultant",
    type: "Advisory · Part-time",
    company: "Imagine AI Sdn Bhd",
    period: "Feb 2026 – Present",
    isCurrent: true,
    points: [
      "Providing strategic technical advisory on enterprise data infrastructure, RAG governance, and LLM benchmarking.",
      "Developing institutional knowledge transfer frameworks and onboarding documentation for incoming engineering cohorts.",
    ],
  },
  {
    role: "AI Engineer / AI Data Analyst",
    type: "Full-time",
    company: "Imagine AI Sdn Bhd",
    period: "Jan 2025 – Feb 2026",
    isCurrent: false,
    points: [
      "Architected commercial RAG pipelines with vector database indexing for low-latency business knowledge retrieval.",
      "Engineered autonomous AI agents using n8n, Langflow, and LangChain with tool execution and automated business alerts.",
      "Constructed Python analytics pipelines (pandas, numpy, SQL) for rigorous production model benchmarking.",
      "Optimized AI solutions for Dell, Lenovo, Huawei, Honor, and Intel across diverse GPU / CPU / NPU silicon architectures.",
      "Served as Scrum Master across 4 enterprise client engagements — overseeing sprint backlogs, roadmaps, and reliable delivery.",
    ],
  },
  {
    role: "AI Developer Intern",
    type: "Internship",
    company: "Imagine AI Sdn Bhd",
    period: "Sep – Dec 2024",
    isCurrent: false,
    points: [
      "Prototyped natural language processing and computer vision modules for enterprise client proof-of-concepts.",
      "Benchmarked PEFT / LoRA fine-tuning techniques to optimize parameter efficiency on low-resource environments.",
    ],
  },
];

export default function App() {
  const [state, handleSubmit] = useForm("moeqgrdj");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: "var(--surface)" }}>

      {/* ══════════════ HERO — Integrated Sky + Top Navigation ══════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
        {/* Animated Sky Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <CloudShader
            speed={0.7}
            count={5}
            cloudColor="#ffffff"
            skyTopColor="#3a7ec2"
            skyBottomColor="#a8d3f2"
            className="h-full w-full"
          />
          {/* Subtle contrast scrim for crystal-clear readability */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(15, 30, 55, 0.08)" }}
          />
          {/* Smooth ethereal fade from the sky into the soft white surface */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[38%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(250,250,248,0) 0%, rgba(250,250,248,0.35) 45%, rgba(250,250,248,0.85) 80%, var(--surface) 100%)",
            }}
          />
        </div>

        {/* ── Top Navigation Bar (Integrated inside hero) ── */}
        <header className="relative z-20 w-full pt-6 sm:pt-8 pb-4">
          <div className="site-container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-light tracking-[0.2em] uppercase text-white/95 drop-shadow-sm">
                Portfolio
              </span>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[13px] font-light text-white/90">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#education" className="hover:text-white transition-colors">Education</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a
                href="/resume.pdf"
                download="Nisha_Maheasvaran_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium text-white bg-sky-600 hover:bg-sky-500 border border-sky-400/40 backdrop-blur-md transition-all shadow-sm"
              >
                <DownloadIcon /> Resume
              </a>
            </nav>

            {/* Mobile Nav Right (Resume Button + Hamburger Menu) */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="/resume.pdf"
                download="Nisha_Maheasvaran_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium text-white bg-sky-600 hover:bg-sky-500 border border-sky-400/40 backdrop-blur-md transition-all shadow-sm"
              >
                <DownloadIcon /> Resume
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-white/20 border border-white/25 backdrop-blur-md transition-all"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Panel */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 px-4">
              <div
                className="rounded-2xl p-4 flex flex-col gap-2.5 text-[14px] font-medium text-white shadow-2xl"
                style={{
                  background: "rgba(12, 28, 52, 0.88)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  About Overview
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Technical Skills
                </a>
                <a
                  href="#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Featured Projects
                </a>
                <a
                  href="#experience"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Work Experience
                </a>
                <a
                  href="#education"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  Education & Certifications
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 hover:bg-white/10 rounded-xl transition-colors text-sky-300 font-semibold"
                >
                  Initiate Contact →
                </a>
              </div>
            </div>
          )}
        </header>

        {/* ── Hero Centerpiece ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-12">
          <div className="site-container text-center">

            {/* Main Name Heading — thin, elegant, subtle atmospheric shadow */}
            <h1
              className="fade-up text-[clamp(2.5rem,6vw,4.5rem)] font-extralight leading-[1.08] tracking-tight text-white"
              style={{
                textShadow:
                  "0 2px 16px rgba(10, 30, 60, 0.3), 0 1px 4px rgba(10, 30, 60, 0.18)",
              }}
            >
              Nisha Maheasvaran
            </h1>

            {/* Subtitle & Role — subtle soft shadow */}
            <p
              className="fade-up fade-up-delay-1 mt-4 text-[17px] sm:text-[19px] font-light text-white/95 max-w-xl mx-auto tracking-wide"
              style={{
                textShadow: "0 1px 8px rgba(10, 30, 60, 0.25)",
              }}
            >
              AI Engineer & Data Analyst
            </p>

            <p
              className="fade-up fade-up-delay-2 mt-3 text-[14px] sm:text-[15.5px] font-light max-w-xl mx-auto leading-relaxed text-white/95"
              style={{
                textShadow: "0 1px 8px rgba(10, 30, 60, 0.3)",
              }}
            >
              Architecting production RAG pipelines, autonomous agent systems, and enterprise data intelligence for global tech leaders.
            </p>

            {/* Action Buttons — light blue styling with crisp contrast */}
            <div className="fade-up fade-up-delay-3 mt-8 flex items-center justify-center gap-3.5 flex-wrap">
              <a
                href="#contact"
                className="btn"
                style={{
                  background: "#0284c7",
                  color: "#ffffff",
                  border: "1px solid #0284c7",
                  padding: "12px 28px",
                  borderRadius: "14px",
                  fontWeight: 500,
                  boxShadow: "0 4px 16px rgba(2, 132, 199, 0.28)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0369a1";
                  e.currentTarget.style.borderColor = "#0369a1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0284c7";
                  e.currentTarget.style.borderColor = "#0284c7";
                }}
              >
                <MailIcon /> Get in touch
              </a>
              <a
                href="https://www.linkedin.com/in/nisha-maheasvaran"
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  background: "#e0f2fe",
                  color: "#0369a1",
                  border: "1px solid #7dd3fc",
                  padding: "12px 24px",
                  borderRadius: "14px",
                  fontWeight: 500,
                  boxShadow: "0 2px 12px rgba(56, 189, 248, 0.16)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#bae6fd";
                  e.currentTarget.style.borderColor = "#38bdf8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e0f2fe";
                  e.currentTarget.style.borderColor = "#7dd3fc";
                }}
              >
                LinkedIn <Arrow />
              </a>
              <a
                href="https://github.com/Snowwolf0109"
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  background: "#e0f2fe",
                  color: "#0369a1",
                  border: "1px solid #7dd3fc",
                  padding: "12px 24px",
                  borderRadius: "14px",
                  fontWeight: 500,
                  boxShadow: "0 2px 12px rgba(56, 189, 248, 0.16)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#bae6fd";
                  e.currentTarget.style.borderColor = "#38bdf8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#e0f2fe";
                  e.currentTarget.style.borderColor = "#7dd3fc";
                }}
              >
                GitHub <Arrow />
              </a>
            </div>

            {/* Enterprise Collaborations Ribbon — Social Proof 1 Block */}
            <div
              className="fade-up fade-up-delay-4 mt-12 pt-6 max-w-3xl sm:max-w-4xl mx-auto px-3"
              style={{ borderTop: "1px solid rgba(255, 255, 255, 0.35)" }}
            >
              <SocialProof1 />
            </div>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="relative z-10 pb-6 text-center">
          <span className="text-[11px] font-light tracking-[0.24em] uppercase text-stone-500">
            Scroll down
          </span>
        </div>
      </section>


      {/* ══════════════ CORE COMPETENCIES & EXPLANATIONS ══════════════ */}
      <section id="about" className="relative z-10 -mt-6">
        <div className="site-container">
          <div
            className="rounded-2xl border overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{
              background: "var(--surface-raised)",
              borderColor: "var(--rule)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.03)",
            }}
          >
            {coreOverview.map((item) => (
              <div key={item.title} className="stat-item flex flex-col justify-between" style={{ padding: "1.75rem 1.5rem" }}>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--accent)" }}>
                    {item.tag}
                  </span>
                  <h3 className="text-[16px] font-medium mt-1 mb-2 leading-snug" style={{ color: "var(--ink)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed mb-4" style={{ color: "var(--ink-light)" }}>
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2.5 border-t flex items-center gap-1.5 text-[11px] font-medium" style={{ borderColor: "var(--rule-light)", color: "var(--ink-secondary)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                  <span>{item.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════ SKILLS & TOOLKIT ══════════════ */}
      <section id="skills" className="section-pad">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-badge">01 / Capabilities</p>
              <h2 className="section-title">Technical Expertise</h2>
            </div>
            <p className="section-desc md:text-right">
              Modern AI engineering stack spanning production RAG, agentic automation, model fine-tuning, and hardware acceleration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group) => (
              <div key={group.area} className="card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                      {group.num}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--rule)" }} />
                  </div>
                  <h3 className="text-[17px] font-medium mb-2" style={{ color: "var(--ink)" }}>
                    {group.area}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed mb-6" style={{ color: "var(--ink-light)" }}>
                    {group.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: "var(--rule-light)" }}>
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════ SELECTED WORK / PROJECTS ══════════════ */}
      <section id="work" className="relative section-pad overflow-hidden">
        {/* Daisy Image Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/Daisy.jpg"
            alt="Daisy meadow background"
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.88 }}
          />
          {/* Soft scrim overlay to preserve crisp card readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(250, 250, 248, 0.45) 0%, rgba(250, 250, 248, 0.25) 50%, rgba(250, 250, 248, 0.45) 100%)",
            }}
          />
          {/* Seamless blending at section boundaries */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, var(--surface) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--surface) 0%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-badge">02 / Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <p className="section-desc md:text-right">
              Selected production implementations in enterprise conversational AI, generative media, model alignment, and computer vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="card backdrop-blur-md flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.85)",
                  boxShadow: "0 10px 30px rgba(12, 74, 110, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                        {project.partner}
                      </span>
                      <h3 className="text-[19px] font-medium mt-1" style={{ color: "var(--ink)" }}>
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-[12px] font-light px-2.5 py-1 rounded-md" style={{ background: "var(--surface-alt)", color: "var(--ink-muted)", border: "1px solid var(--rule)" }}>
                      {project.year}
                    </span>
                  </div>

                  <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--ink-light)" }}>
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="mb-4 pb-3 border-b flex items-center gap-2 text-[12px] font-light" style={{ borderColor: "var(--rule-light)", color: "var(--accent)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    <span>{project.highlight}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════ CAREER JOURNEY / EXPERIENCE ══════════════ */}
      <section id="experience" className="relative section-pad overflow-hidden">
        {/* Animated Sky Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          <CloudShader
            speed={0.5}
            count={5}
            cloudColor="#ffffff"
            skyTopColor="#3a7ec2"
            skyBottomColor="#a8d3f2"
            className="h-full w-full"
          />
          {/* Subtle contrast scrim for crystal-clear readability */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(255, 255, 255, 0.42)" }}
          />
          {/* Smooth blend gradients at the top and bottom of the section */}
          <div
            className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, var(--surface) 0%, rgba(250, 250, 248, 0.6) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, var(--surface-alt) 0%, rgba(245, 245, 242, 0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10 site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <p className="section-badge">03 / Experience</p>
              <h2 className="section-title">Career Journey</h2>
            </div>
            <p className="section-desc md:text-right">
              Track record of building and optimizing enterprise AI systems from initial concept to commercial client deployment.
            </p>
          </div>

          <div className="space-y-8 max-w-3xl">
            {experience.map((exp) => (
              <div key={exp.role + exp.period} className="timeline-track">
                <div className="timeline-node" />
                <div
                  className="card backdrop-blur-md"
                  style={{
                    padding: "1.75rem 2rem",
                    background: "rgba(255, 255, 255, 0.92)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 10px 30px rgba(12, 74, 110, 0.08)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-[17px] font-medium" style={{ color: "var(--ink)" }}>
                        {exp.role}
                      </h3>
                      {exp.isCurrent && (
                        <span className="chip chip-accent text-[11px] py-0.5">Current Role</span>
                      )}
                    </div>
                    <span className="text-[12px] font-light shrink-0" style={{ color: "var(--ink-muted)" }}>
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[13px] font-light mb-4" style={{ color: "var(--accent)" }}>
                    {exp.company} · {exp.type}
                  </p>

                  <ul className="space-y-2.5">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--ink-light)" }}>
                        <span className="mt-[9px] w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "var(--rule)" }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════ EDUCATION & CREDENTIALS ══════════════ */}
      <section id="education" className="section-pad" style={{ background: "var(--surface-alt)" }}>
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="section-badge">04 / Credentials</p>
              <h2 className="section-title">Education & Certifications</h2>
            </div>
            <p className="section-desc md:text-right">
              Formal foundation in Artificial Intelligence, professional cybersecurity certification, and technical leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Degree Card */}
            <div className="card flex flex-col justify-between">
              <div>
                <span className="chip chip-accent text-[11px] mb-4">Academic Degree</span>
                <h3 className="text-[19px] font-medium mb-1" style={{ color: "var(--ink)" }}>
                  B.IS (Hons) in Artificial Intelligence
                </h3>
                <p className="text-[14px] mb-2" style={{ color: "var(--ink-light)" }}>
                  Raffles University, Iskandar Puteri, Johor
                </p>
                <p className="text-[14px] font-medium mb-5" style={{ color: "var(--accent)" }}>
                  CGPA: 3.23 / 4.00
                </p>
                <p className="text-[13px] font-light mb-3" style={{ color: "var(--ink-muted)" }}>
                  Core Curriculum:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Machine Learning",
                    "Deep Learning",
                    "Natural Language Processing",
                    "Computer Vision",
                    "Big Data Analytics",
                    "Software Engineering",
                  ].map((c) => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t flex items-center justify-between text-[12px] font-light" style={{ borderColor: "var(--rule-light)", color: "var(--ink-muted)" }}>
                <span>Raffles University AI Department</span>
                <span>Hons Graduate</span>
              </div>
            </div>

            {/* Certifications & Leadership */}
            <div className="space-y-6">
              <div className="card">
                <span className="chip chip-accent text-[11px] mb-4">Professional Certifications</span>
                <div className="space-y-4">
                  <div className="pb-4 border-b" style={{ borderColor: "var(--rule-light)" }}>
                    <h4 className="text-[15px] font-medium" style={{ color: "var(--ink)" }}>
                      Building Cyber Resilience in a Digital Era
                    </h4>
                    <p className="text-[13px] font-light mt-0.5" style={{ color: "var(--ink-muted)" }}>
                      National University of Singapore (NUS) · ID: 169721679
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium" style={{ color: "var(--ink)" }}>
                      Software & Apps Development with C#
                    </h4>
                    <p className="text-[13px] font-light mt-0.5" style={{ color: "var(--ink-muted)" }}>
                      Koto Association · Dec 2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <span className="chip chip-accent text-[11px] mb-4">Community & Leadership</span>
                <ul className="space-y-3">
                  {[
                    "Treasurer, AI Club — Raffles University (2023)",
                    "Technical Mentor for K-Youth trainees in Python & ML concepts",
                    "Competitive Hackathon Participant (2022, 2023 editions)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--ink-light)" }}>
                      <span className="mt-[8px] w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════ CONTACT & FOOTER WITH DAISY BACKGROUND ══════════════ */}
      <section id="contact" className="relative overflow-hidden pt-24 pb-12">
        {/* Full Daisy Image Background — no top fade, full opacity */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/Daisy.jpg"
            alt="Daisy watercolor meadow"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Content overlapping the Daisy background */}
        <div className="relative z-10 site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span
                className="section-badge px-3 py-1 rounded-full text-[11px] font-semibold"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                }}
              >
                05 / Connection
              </span>
              <h2 className="section-title mt-2" style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.8)" }}>
                Initiate Collaboration
              </h2>
            </div>
            <p
              className="section-desc md:text-right font-normal"
              style={{ color: "#1e293b", textShadow: "0 1px 6px rgba(255, 255, 255, 0.7)" }}
            >
              Available for full-time AI engineering roles, advisory consulting, and enterprise AI partnerships.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-16">
            {/* Contact Form — Centered Frosted White Card Overlapping Background */}
            <div
              className="card"
              style={{
                padding: "2.5rem",
                background: "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 16px 40px rgba(15, 35, 60, 0.08)",
                borderRadius: "24px",
              }}
            >
              {state.succeeded ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <CheckIcon />
                  </div>
                  <h3 className="text-[18px] font-medium" style={{ color: "var(--ink)" }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[14px] font-light max-w-sm mx-auto" style={{ color: "var(--ink-light)" }}>
                    Thank you for reaching out. Your message has been sent directly to my inbox and I will get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="text-[12px] font-medium uppercase tracking-[0.14em] mb-2 block" style={{ color: "var(--ink-muted)" }}>
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl text-[14px] font-light outline-none transition-all"
                        style={{
                          background: "#ffffff",
                          border: "1px solid var(--rule)",
                          color: "var(--ink)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-rose-500 mt-1 block" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-[12px] font-medium uppercase tracking-[0.14em] mb-2 block" style={{ color: "var(--ink-muted)" }}>
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl text-[14px] font-light outline-none transition-all"
                        style={{
                          background: "#ffffff",
                          border: "1px solid var(--rule)",
                          color: "var(--ink)",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-500 mt-1 block" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="text-[12px] font-medium uppercase tracking-[0.14em] mb-2 block" style={{ color: "var(--ink-muted)" }}>
                      Subject / Opportunity Type
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. AI Engineering Role / Advisory Project"
                      className="w-full px-4 py-3 rounded-xl text-[14px] font-light outline-none transition-all"
                      style={{
                        background: "#ffffff",
                        border: "1px solid var(--rule)",
                        color: "var(--ink)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-xs text-rose-500 mt-1 block" />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-[12px] font-medium uppercase tracking-[0.14em] mb-2 block" style={{ color: "var(--ink-muted)" }}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Share details about your team, roadmap, or collaboration idea..."
                      className="w-full px-4 py-3 rounded-xl text-[14px] font-light outline-none transition-all resize-none"
                      style={{
                        background: "#ffffff",
                        border: "1px solid var(--rule)",
                        color: "var(--ink)",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-500 mt-1 block" />
                  </div>

                  {state.errors && Object.keys(state.errors).length > 0 && (
                    <ValidationError errors={state.errors} className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-3 block" />
                  )}

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="btn btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <MailIcon /> {state.submitting ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Integrated Frosted Footer Overlapping Daisies */}
          <footer
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 8px 30px rgba(15, 35, 60, 0.06)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[15px] font-medium" style={{ color: "var(--ink)" }}>
                  Nisha Maheasvaran
                </p>
                <p className="text-[13px] font-light mt-0.5" style={{ color: "var(--ink-muted)" }}>
                  AI Engineer & Data Analyst · Johor Bahru, Malaysia
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 text-[13px] font-light" style={{ color: "var(--ink-secondary)" }}>
                <a href="#about" className="hover:text-black transition-colors">About</a>
                <a href="#skills" className="hover:text-black transition-colors">Skills</a>
                <a href="#work" className="hover:text-black transition-colors">Work</a>
                <a href="#experience" className="hover:text-black transition-colors">Experience</a>
                <a href="#education" className="hover:text-black transition-colors">Education</a>
                <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-black transition-colors font-medium ml-1"
                >
                  Top ↑
                </a>
              </div>
            </div>

            <div
              className="mt-6 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] font-light"
              style={{ borderColor: "rgba(0, 0, 0, 0.08)", color: "var(--ink-muted)" }}
            >
              <p>© {new Date().getFullYear()} Nisha Maheasvaran. All rights reserved.</p>
              <p>Minimal & Elegant Design System.</p>
            </div>
          </footer>
        </div>
      </section>

    </div>
  );
}
