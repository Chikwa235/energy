
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <div className="mb-4 flex justify-center">
          <Pill>{eyebrow}</Pill>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-white/65 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="text-3xl md:text-4xl font-semibold">{value}</div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start gap-4">
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <p className="mt-4 text-xs text-white/50">
        Built for uptime, compliance, and measurable ROI.
      </p>
    </div>
  );
}

function ServiceCard({ title, bullets }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium">{q}</span>
        <span className="text-white/60">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-4 text-sm text-white/70"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const [open, setOpen] = useState(false);

  // ✅ success notification state
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef(null);

  // Subtle parallax for hero background
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);

  const stats = useMemo(
    () => [
      { value: "74MWp+", label: "Installed capacity delivered" },
      { value: "400+", label: "Commercial & industrial projects" },
      { value: "Pan‑Africa", label: "Operating footprint & partners" },
      { value: "24/7", label: "Monitoring + performance reporting" },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: "⚡",
        title: "ROI-first system design",
        desc: "Engineering that starts with payback period, demand profile, and reliability—not just panels.",
      },
      {
        icon: "🧠",
        title: "Performance monitoring",
        desc: "Live dashboards + proactive alerts so stakeholders know savings, uptime, and output at a glance.",
      },
      {
        icon: "🛠️",
        title: "End‑to‑end EPC delivery",
        desc: "Survey, design, procurement, installation, and commissioning—with documentation you can audit.",
      },
      {
        icon: "🧾",
        title: "Transparent reporting",
        desc: "Monthly reports that translate kWh into cost savings, CO₂ offset, and operational impact.",
      },
      {
        icon: "🔒",
        title: "Bankable documentation",
        desc: "Clear specs, warranties, as-builts, and O&M plans—structured for decision-makers.",
      },
      {
        icon: "🌍",
        title: "Built for African conditions",
        desc: "Dust, heat, unstable grid, and outages—designed with real-world resilience in mind.",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "Commercial Solar EPC",
        bullets: [
          "Site survey + load profiling",
          "Design + procurement",
          "Installation + commissioning",
        ],
      },
      {
        title: "Hybrid & Backup Systems",
        bullets: [
          "Battery sizing",
          "Generator + grid integration",
          "Critical load prioritization",
        ],
      },
      {
        title: "Operations & Maintenance",
        bullets: [
          "Remote monitoring",
          "Preventive maintenance",
          "Performance optimization",
        ],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "How fast can we see ROI?",
        a: "Most C&I projects target 2–5 years depending on tariff, load profile, and financing structure.",
      },
      {
        q: "Do you handle monitoring after installation?",
        a: "Yes—ongoing monitoring, alerts, and monthly reporting can be included as an O&M plan.",
      },
      {
        q: "What info do you need for an audit?",
        a: "A recent electricity bill, estimated operating hours, and your site location are enough to start.",
      },
      {
        q: "Can this work with frequent outages?",
        a: "Yes—hybrid designs can prioritize critical loads and add battery storage for uptime.",
      },
    ],
    []
  );

  // ✅ submit handler: shows success message after submit
  const handleAuditSubmit = (e) => {
    e.preventDefault(); // stops page reload

    // (Optional) If you're sending data to an API, do it here, then show success on success.

    setShowSuccess(true);

    // auto-hide after 3 seconds
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
    successTimerRef.current = setTimeout(() => setShowSuccess(false), 3000);

    // optional: reset the form fields
    e.currentTarget.reset();
  };

  return (
    <div className="font-sans text-white bg-black selection:bg-emerald-400/30">
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_60%)]" />

      {/* NAV */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <Container className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 grid place-items-center">
              <span className="text-emerald-300 font-bold">A</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Energy Systems</div>
              <div className="text-xs text-white/55">Solar • Hybrid • O&M</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#proof" className="hover:text-white">
              Impact
            </a>
            <a href="#process" className="hover:text-white">
              Process
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
          >
            Get a free audit
          </button>
        </Container>
      </div>

      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
        </motion.div>

        <Container className="relative z-10 pt-16 md:pt-24 pb-12">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-12 gap-10 items-center"
          >
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <Pill>Trusted by commercial & industrial energy users across Africa</Pill>

              <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
                Cut energy costs.
                <span className="text-emerald-300"> Increase uptime.</span>
                <br />
                Build long-term independence.
              </h1>

              <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
                We design, deploy, and maintain solar + hybrid energy systems
                for businesses that need predictable bills and reliable power.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    document
                      .getElementById("audit-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                >
                  Request a free energy audit
                </button>

                <a
                  href="#proof"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition text-center"
                >
                  View case studies
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/60">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Typical ROI: 24–60 months
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Monitoring + reporting included
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Bankable documentation
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-sm text-white/70">Quick estimate</div>
                <div className="mt-2 text-2xl font-semibold">
                  What could you save?
                </div>
                <p className="mt-3 text-sm text-white/65">
                  Share your last bill and operating hours. We’ll return a
                  high-level savings estimate + recommended system size.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60 text-xs">Response time</div>
                    <div className="mt-1 font-semibold">Under 24 hours</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-white/60 text-xs">Deliverable</div>
                    <div className="mt-1 font-semibold">1–2 page audit</div>
                  </div>
                </div>

                <div className="mt-6 h-px bg-white/10" />

                <div className="mt-6 flex items-center justify-between text-xs text-white/60">
                  <span>Designed for decision-makers</span>
                  <span className="text-emerald-300">Savings • Uptime • ROI</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* LOGOS STRIP */}
      <section className="py-10 border-y border-white/10 bg-black">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/60">
              Built for teams that can’t afford downtime
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Manufacturing",
                "Hotels",
                "Hospitals",
                "Retail",
                "Warehousing",
                "Schools",
              ].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <section className="py-16 bg-black">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <motion.div variants={fadeUp} key={s.label}>
                <Stat value={s.value} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <Container>
          <SectionTitle
            eyebrow="The problem"
            title="Energy costs drain profit and kill reliability"
            subtitle="Tariffs rise, outages increase, and diesel costs are unpredictable. The winners build stable, resilient power systems with measurable performance."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-emerald-300 font-semibold">
                Cost volatility
              </div>
              <p className="mt-2 text-sm text-white/65">
                Grid + diesel swings make budgeting impossible.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-emerald-300 font-semibold">Downtime</div>
              <p className="mt-2 text-sm text-white/65">
                Lost production and equipment damage cost more than energy.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-emerald-300 font-semibold">No visibility</div>
              <p className="mt-2 text-sm text-white/65">
                Without monitoring, savings and output stay unclear.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-black">
        <Container>
          <SectionTitle
            eyebrow="Why teams choose us"
            title="Engineered, executed, and reported like a serious infrastructure project"
            subtitle="A strong solar homepage isn’t just pretty. It must communicate credibility, process, and proof—fast."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div variants={fadeUp} key={f.title}>
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-20 bg-zinc-950 border-y border-white/10"
      >
        <Container>
          <SectionTitle
            eyebrow="What we do"
            title="Services built for commercial reliability"
            subtitle="Pick a deployment model or request a free audit and we’ll recommend the best setup."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {services.map((s) => (
              <motion.div variants={fadeUp} key={s.title}>
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CASE STUDY / PROOF */}
      <section id="proof" className="py-20 bg-black">
        <Container>
          <SectionTitle
            eyebrow="Proof"
            title="Real business impact (example)"
            subtitle=""
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mt-12 grid lg:grid-cols-12 gap-6 items-stretch"
          >
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-8">
              <div className="text-sm text-white/60">Manufacturing facility</div>
              <h3 className="mt-2 text-2xl font-semibold">
                44% monthly cost reduction
              </h3>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-xs text-white/60">Before</div>
                  <div className="mt-1 text-xl font-semibold">
                    $25,000 / month
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <div className="text-xs text-emerald-200/80">After</div>
                  <div className="mt-1 text-xl font-semibold">
                    $14,000 / month
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Improved uptime
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Predictable operating cost
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  Monitoring + reporting
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm text-white/60">Client feedback</div>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                “We finally have visibility into energy output and costs. The
                reporting makes it easy to justify the investment to leadership.”
              </p>

              <div className="mt-6 text-sm text-white/60">
                — Operations Director, Industrial Client
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 bg-zinc-950 border-y border-white/10"
      >
        <Container>
          <SectionTitle
            eyebrow="FAQ"
            title="Questions decision-makers ask"
            subtitle="Clear answers reduce friction and increase conversion rates."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <FAQItem key={f.q} {...f} />
            ))}
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-black text-center">
        <Container>
          <h2 className="text-4xl md:text-5xl font-semibold">
            Ready to reduce your energy costs?
          </h2>

          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Get a structured audit with real numbers, system design, and ROI
            estimate in under 24 hours.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("audit-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 rounded-2xl bg-emerald-500 px-8 py-4 text-black font-semibold hover:bg-emerald-400 transition"
          >
            Request Free Energy Audit
          </button>
        </Container>
      </section>

      {/* AUDIT FORM */}
      <section
        id="audit-form"
        className="py-20 bg-zinc-950 border-t border-white/10"
      >
        <Container>
          <SectionTitle
            eyebrow="Free Audit"
            title="Request your energy audit"
            subtitle="Fill in your details and we’ll get back to you within 24 hours."
          />

          <form
            className="mt-10 max-w-2xl mx-auto grid gap-4"
            onSubmit={handleAuditSubmit}
          >
            <input
              type="text"
              placeholder="Your name"
              className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              className="rounded-xl bg-white/5 border border-white/10 p-3 text-white"
              required
            />

            <textarea
              placeholder="Describe your energy usage"
              className="rounded-xl bg-white/5 border border-white/10 p-3 text-white min-h-[120px]"
              required
            />

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400"
            >
              Submit Request
            </button>

            {/* ✅ Success message (appears AFTER submit) */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-200"
                >
                  Request sent successfully. We’ll get back to you within 24
                  hours.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 border-t border-white/10">
        © 2026 Energy Systems Demo
      </footer>
    </div>
  );
}




