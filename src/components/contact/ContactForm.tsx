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

interface ContactFormProps {
  formConfig?: {
    fields: {
      name: string;
      options?: string[];
    }[];
    submitText: string;
  };
}

export default function ContactForm({ formConfig }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = async (data: FormValues) => {
    console.log("[contact form submission]", data);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <h2 className={styles.successTitle}>Thank you!</h2>
        <p className={styles.successBody}>
          We&apos;ll map the owned audience surface and be in touch within 24
          hours.
        </p>
      </div>
    );
  }

  // Use config options if available, else default
  const campaignOptions = formConfig?.fields?.find(f => f.name === 'campaignType')?.options || [
    "Audio Audience Access", "Commerce Feed Placement", "Mobile App Placement", "Casino & Gaming Access", "Custom Audience Surface"
  ];
  
  const budgetOptions = formConfig?.fields?.find(f => f.name === 'budgetRange' || f.name === 'budget')?.options || [
    "$10k - $50k", "$50k - $100k", "$100k - $500k", "$500k+"
  ];

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
          {...register("company", { required: "Required" })}
        />
        {errors.company && (
          <span className={styles.error}>{errors.company.message}</span>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="campaignType">
            Audience Layer
          </label>
          <select
            id="campaignType"
            className={styles.select}
            defaultValue=""
            {...register("service", { required: "Pick one" })}
          >
            <option value="" disabled>Choose…</option>
            {campaignOptions.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.service && (
            <span className={styles.error}>{errors.service.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="budgetRange">
            Placement Range
          </label>
          <select
            id="budgetRange"
            className={styles.select}
            defaultValue=""
            {...register("budget", { required: "Pick one" })}
          >
            <option value="" disabled>Choose…</option>
            {budgetOptions.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.budget && (
            <span className={styles.error}>{errors.budget.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Audience and Placement Need
        </label>
        <textarea
          id="message"
          rows={4}
          className={styles.textarea}
          {...register("message", {
            required: "Tell us who you need to reach",
          })}
        />
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}
      </div>

      <div className={styles.submit}>
        <Button variant="primary" size="lg" type="submit">
          {isSubmitting ? "Sending…" : (formConfig?.submitText || "Request Access")}
        </Button>
      </div>
    </form>
  );
}
