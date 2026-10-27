import { useState } from "react";
import { profile, formspreeId } from "../data/data";
import Section from "./ui/Section";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { Reveal } from "../utils/motion";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
  { label: "Portfolio", value: profile.portfolioLabel, href: profile.portfolio },
];

const inputCls =
  "w-full border-[3px] border-ink bg-cream px-4 py-3 font-mono text-sm font-bold placeholder:font-normal placeholder:uppercase placeholder:tracking-wide focus:bg-sun focus:outline-none";

/** Contact: big headline + direct links + Formspree-ready form (mailto fallback). */
export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    if (formspreeId) {
      setStatus("SENDING…");
      try {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("MESSAGE SENT ✦ TALK SOON!");
          form.reset();
        } else {
          setStatus("SOMETHING BROKE — EMAIL ME DIRECTLY?");
        }
      } catch {
        setStatus("SOMETHING BROKE — EMAIL ME DIRECTLY?");
      }
    } else {
      // No Formspree ID yet → open the visitor's mail app, pre-filled
      const subject = encodeURIComponent(`Portfolio contact — ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("OPENING YOUR MAIL APP…");
    }
  }

  return (
    <Section id="contact" title="Contact" label="06 // Let's Talk" from="bottom">
      <Reveal from="bottom">
        <h3 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] uppercase leading-[1.05]">
          Got an idea that needs
          <span className="ml-2 inline-block -rotate-1 border-[3px] border-ink bg-sun px-2 [text-shadow:none]">
            shipping?
          </span>
        </h3>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Direct links */}
        <Reveal from="left">
          <Card className="h-full p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">Direct lines</p>
            <ul className="mt-4 divide-y-2 divide-ink/15">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") || link.href.startsWith("tel") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline justify-between gap-2 py-4 transition-transform hover:translate-x-1"
                  >
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60 group-hover:text-hot">
                      {link.label}
                    </span>
                    <span className="break-all border-b-2 border-transparent font-mono text-sm font-bold uppercase group-hover:border-ink group-hover:bg-sun">
                      {link.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Button href={profile.resume} variant="ink" download className="mt-6 w-full">
              ↓ Download Resume
            </Button>
          </Card>
        </Reveal>

        {/* Form */}
        <Reveal from="right">
          <Card tone="sun" rotate="rotate-1" className="h-full p-6 md:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-widest">Send a message</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate={false}>
              <div>
                <label htmlFor="name" className="mb-1 block font-mono text-xs font-bold uppercase tracking-wide">
                  Name
                </label>
                <input id="name" name="name" type="text" required placeholder="YOUR NAME" className={inputCls} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block font-mono text-xs font-bold uppercase tracking-wide">
                  Email
                </label>
                <input id="email" name="email" type="email" required placeholder="YOU@EXAMPLE.COM" className={inputCls} />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block font-mono text-xs font-bold uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="TELL ME ABOUT THE PROJECT…"
                  className={`${inputCls} resize-y`}
                />
              </div>
              <Button type="submit" variant="hot" className="w-full">
                Send It →
              </Button>
              {status && (
                <p role="status" aria-live="polite" className="border-2 border-ink bg-ink px-3 py-2 text-center font-mono text-xs font-bold uppercase tracking-widest text-sun">
                  {status}
                </p>
              )}
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
