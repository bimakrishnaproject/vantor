'use client';

import { useState } from 'react';
import type { FormField } from '@/types';

interface ContactFormProps {
  fields: FormField[];
}

export function ContactForm({ fields }: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission — replace with actual API call later
    // Example: await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/vantor/v1/contact`, {
    //   method: 'POST', body: JSON.stringify(formData)
    // });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="glass-panel-strong p-10 md:p-16 text-center" id="contact-form">
        <div className="w-16 h-16 rounded-full bg-vantor-blue/10 border border-vantor-blue/30 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vantor-blue" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-vantor-white mb-3">
          Campaign Request Received
        </h3>
        <p className="text-vantor-silver text-sm leading-relaxed max-w-md mx-auto">
          Thank you for your interest. Our team will review your inquiry and get back to you within 24 hours with a custom campaign proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel-strong p-6 md:p-10" id="contact-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === 'textarea' ? 'md:col-span-2' : ''}
          >
            <label
              htmlFor={field.name}
              className="block text-vantor-silver text-xs uppercase tracking-widest font-medium mb-2"
            >
              {field.label}
              {field.required && <span className="text-vantor-blue ml-1">*</span>}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-vantor-navy/50 border border-white/10 rounded-lg px-4 py-3 text-vantor-white text-sm focus:border-vantor-blue/50 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-vantor-navy">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt} className="bg-vantor-navy">
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                rows={5}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-vantor-navy/50 border border-white/10 rounded-lg px-4 py-3 text-vantor-white text-sm placeholder:text-vantor-muted/50 focus:border-vantor-blue/50 focus:outline-none transition-colors duration-300 resize-none"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-vantor-navy/50 border border-white/10 rounded-lg px-4 py-3 text-vantor-white text-sm placeholder:text-vantor-muted/50 focus:border-vantor-blue/50 focus:outline-none transition-colors duration-300"
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full md:w-auto px-10 py-4 rounded-full bg-vantor-blue text-vantor-black font-semibold text-sm tracking-wide hover:bg-vantor-cyan hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <div className="w-4 h-4 border-2 border-vantor-black/30 border-t-vantor-black rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit Inquiry
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
