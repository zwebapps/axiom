"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageSquare, User } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { contact as contactContent } from "@/content/site";
import { easeLux, springSnappy } from "@/lib/motion-presets";

import { MotionButton } from "./MotionCTA";
import { PageWrap } from "./PageWrap";
import { Reveal } from "./Reveal";
import { SectionIntro } from "./SectionIntro";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="group/field">
      <label
        htmlFor={id}
        className="mb-2.5 block text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
      >
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="error"
            id={`${id}-error`}
            className="mt-2 overflow-hidden text-xs text-gold"
            role="alert"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.26, ease: easeLux }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const fieldBase =
  "w-full rounded-sm border bg-navy-deep/50 px-4 py-3.5 pl-11 text-[15px] text-foreground shadow-[inset_0_1px_0_oklch(1_0_0/4%)] outline-none backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground/55";

function fieldClass(hasError: boolean) {
  return hasError
    ? `${fieldBase} border-gold/50 ring-2 ring-gold/15 focus:border-gold focus:ring-gold/25`
    : `${fieldBase} border-border/70 hover:border-border focus:border-gold/45 focus:bg-navy-deep/70 focus:ring-2 focus:ring-gold/20`;
}

export function Contact() {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = contactContent.errors.name;
    if (!isValidEmail(email)) next.email = contactContent.errors.email;
    if (!message.trim()) next.message = contactContent.errors.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    if (!validate()) return;

    const subject = encodeURIComponent(`Website inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );
    window.location.href = `mailto:${contactContent.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-[var(--site-nav-h)] border-b border-border bg-navy py-16 md:py-24"
    >
      <PageWrap className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-20">
        <div>
          <SectionIntro
            eyebrow={contactContent.eyebrow}
            title={contactContent.title}
            description={contactContent.description}
            titleClassName="mt-5 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-light leading-[1.12]"
            descriptionClassName="mt-6 max-w-md text-[15px] leading-[1.75] text-muted-foreground"
          />
          <Reveal delay={220} variant="scale">
            <a
              href={`mailto:${contactContent.email}`}
              className="mt-10 inline-flex items-center gap-3 rounded-sm border border-border/80 bg-navy-deep/40 px-4 py-3 text-[13px] text-foreground transition-colors duration-300 hover:border-gold/40 hover:text-gold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 text-gold">
                <Mail size={16} strokeWidth={1.4} />
              </span>
              {contactContent.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={100} variant="slideLeft">
          <div className="relative overflow-hidden rounded-xs border border-border/80 bg-linear-to-br from-navy via-navy-deep/95 to-navy shadow-[var(--shadow-panel)]">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/80 to-transparent"
              aria-hidden
            />
            <div className="border-b border-border/50 px-6 py-4 sm:px-8 sm:py-5">
              <p className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
                Inquiry form
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                All fields are required. We typically respond within one business day.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.div
                    key="success"
                    className="relative overflow-hidden rounded-sm border border-gold/30 bg-gold/[0.07] px-6 py-8 text-center sm:px-8"
                    role="status"
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -8 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: easeLux }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 bg-linear-to-b from-gold/[0.08] to-transparent"
                      aria-hidden
                    />
                    <motion.span
                      className="relative block"
                      initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={reduceMotion ? { duration: 0 } : { ...springSnappy, delay: 0.12 }}
                    >
                      <CheckCircle2 className="mx-auto text-gold" size={36} strokeWidth={1.25} />
                    </motion.span>
                    <p className="relative mt-4 font-display text-xl text-foreground">
                      {contactContent.successTitle}
                    </p>
                    <p className="relative mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                      {contactContent.successBody}
                    </p>
                    <button
                      type="button"
                      className="relative mt-6 text-[13px] font-medium text-gold underline-offset-4 transition-colors hover:text-gold-soft hover:underline"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.34, ease: easeLux }}
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field id="contact-name" label="Name" error={errors.name}>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground/70"
                            size={17}
                            strokeWidth={1.4}
                            aria-hidden
                          />
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                            }}
                            placeholder={contactContent.placeholders.name}
                            className={fieldClass(Boolean(errors.name))}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "contact-name-error" : undefined}
                          />
                        </div>
                      </Field>

                      <Field id="contact-email" label="Email" error={errors.email}>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground/70"
                            size={17}
                            strokeWidth={1.4}
                            aria-hidden
                          />
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email)
                                setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            placeholder={contactContent.placeholders.email}
                            className={fieldClass(Boolean(errors.email))}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "contact-email-error" : undefined}
                          />
                        </div>
                      </Field>
                    </div>

                    <Field id="contact-message" label="Message" error={errors.message}>
                      <div className="relative">
                        <MessageSquare
                          className="pointer-events-none absolute top-3.5 left-3.5 text-muted-foreground/70"
                          size={17}
                          strokeWidth={1.4}
                          aria-hidden
                        />
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message)
                              setErrors((prev) => ({ ...prev, message: undefined }));
                          }}
                          placeholder={contactContent.placeholders.message}
                          className={`${fieldClass(Boolean(errors.message))} min-h-[148px] resize-y pt-3.5`}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? "contact-message-error" : undefined}
                        />
                      </div>
                    </Field>

                    <div className="border-t border-border/50 pt-6">
                      <div className="flex sm:justify-end">
                        <MotionButton
                          type="submit"
                          className="btn-gold group w-full justify-center px-8 sm:w-auto"
                        >
                          {contactContent.submit}
                          <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </MotionButton>
                      </div>
                      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                        <Mail size={14} className="mt-0.5 shrink-0 opacity-60" aria-hidden />
                        {contactContent.footnote}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </PageWrap>
    </section>
  );
}
