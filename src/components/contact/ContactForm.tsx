"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

interface FormValues {
  fullName: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = async (data: FormValues) => {
    // TODO: integrate with WordPress REST API or transactional email service
    console.log("[contact form submission]", data);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <h2 className={styles.successTitle}>Thank you!</h2>
        <p className={styles.successBody}>
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            className={styles.input}
            {...register("fullName", { required: "Required" })}
          />
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="company">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          className={styles.input}
          {...register("company")}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="service">
            Service Interest
          </label>
          <select
            id="service"
            className={styles.select}
            defaultValue=""
            {...register("service", { required: "Pick one" })}
          >
            <option value="" disabled>
              Choose…
            </option>
            <option value="audio">Audio</option>
            <option value="ecommerce">eCommerce</option>
            <option value="mobile-apps">Mobile Apps</option>
            <option value="casinos">Casinos</option>
            <option value="other">Other</option>
            <option value="not-sure">Not Sure</option>
          </select>
          {errors.service && (
            <span className={styles.error}>{errors.service.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="budget">
            Budget Range
          </label>
          <select
            id="budget"
            className={styles.select}
            defaultValue=""
            {...register("budget", { required: "Pick one" })}
          >
            <option value="" disabled>
              Choose…
            </option>
            <option value="under-10k">Under $10K</option>
            <option value="10-50k">$10K – $50K</option>
            <option value="50-100k">$50K – $100K</option>
            <option value="100k+">$100K+</option>
            <option value="na">Prefer not to say</option>
          </select>
          {errors.budget && (
            <span className={styles.error}>{errors.budget.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={styles.textarea}
          {...register("message", {
            required: "Tell us a bit about your project",
          })}
        />
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}
      </div>

      <div className={styles.submit}>
        <Button variant="primary" size="lg" type="submit">
          {isSubmitting ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
