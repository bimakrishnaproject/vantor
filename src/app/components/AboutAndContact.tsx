"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function AboutAndContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    category: "Sports",
    budget: "$10k - $50k",
    description: ""
  });

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="about" className="w-full bg-transparent flex flex-col lg:flex-row relative">
      
      {/* Left: About & Philosophy */}
      <div className="w-full lg:w-1/2 py-16 px-6 md:p-16 lg:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-accent uppercase tracking-widest text-xs md:text-sm font-semibold mb-8 drop-shadow-md">
            The Philosophy
          </h2>
          <h3 className="font-display text-4xl md:text-5xl uppercase tracking-tighter text-offwhite mb-8 leading-[1.1] drop-shadow-lg">
            Direct access.<br />No agency layers.
          </h3>
          <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed max-w-md mb-6 drop-shadow-md">
            KOLS is owner-operated. We don't act as a middleman buying ads on third-party sites. We own, grow, and activate the actual communities that shape culture. 
          </p>
          <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed max-w-md mb-16 drop-shadow-md">
            When you partner with us, you get unfiltered access to the audience without the standard agency friction.
          </p>

          {/* Founder Placeholder */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1D] border border-white/10 overflow-hidden relative" aria-hidden="true">
               <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <span className="text-[10px] uppercase font-sans tracking-widest">Photo</span>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl text-offwhite tracking-tight">John Doe</span>
              <span className="font-sans text-xs text-accent uppercase tracking-[0.2em] font-semibold">Founder & CEO</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Contact / Conversion Form */}
      <div id="contact" className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 bg-black/40 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-offwhite mb-12 drop-shadow-lg">
            Initiate Campaign
          </h2>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111112] border border-accent/20 p-8 flex flex-col items-center justify-center text-center rounded-sm"
              role="alert"
              aria-live="polite"
            >
              <CheckCircle2 size={48} className="text-accent mb-6" />
              <h3 className="font-display text-3xl uppercase tracking-tighter text-offwhite mb-2">Request Received</h3>
              <p className="font-sans text-white/60 text-sm">
                Our network specialists will review your brief and contact you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 font-sans text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2 py-1"
                aria-label="Submit another request"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Full Name *</label>
                  <input 
                    id="name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    aria-invalid={errors.name ? "true" : "false"}
                    className={`bg-transparent border-b ${errors.name ? 'border-accent' : 'border-white/20'} pb-2 text-offwhite font-sans text-sm focus:outline-none focus:border-accent focus:ring-0 transition-colors`} 
                    placeholder="Enter your name" 
                  />
                  {errors.name && <span className="text-accent text-[10px] uppercase tracking-widest mt-2">{errors.name}</span>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="company" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Company</label>
                  <input 
                    id="company"
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-transparent border-b border-white/20 pb-2 text-offwhite font-sans text-sm focus:outline-none focus:border-accent focus:ring-0 transition-colors" 
                    placeholder="Organization name" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Work Email *</label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`bg-transparent border-b ${errors.email ? 'border-accent' : 'border-white/20'} pb-2 text-offwhite font-sans text-sm focus:outline-none focus:border-accent focus:ring-0 transition-colors`} 
                  placeholder="name@company.com" 
                />
                {errors.email && <span className="text-accent text-[10px] uppercase tracking-widest mt-2">{errors.email}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label htmlFor="category" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Category</label>
                  <select 
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="bg-black/20 border border-white/10 px-4 py-3 text-white/80 font-sans text-sm focus:outline-none focus:border-accent transition-all backdrop-blur-sm appearance-none"
                  >
                    <option>Sports</option>
                    <option>Entertainment & Music</option>
                    <option>Gaming</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="budget" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Est. Budget</label>
                  <select 
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="bg-black/20 border border-white/10 px-4 py-3 text-white/80 font-sans text-sm focus:outline-none focus:border-accent transition-all backdrop-blur-sm appearance-none"
                  >
                    <option>$10k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Campaign Description</label>
                <textarea 
                  id="description"
                  rows={3} 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-transparent border-b border-white/20 pb-2 text-offwhite font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none" 
                  placeholder="Briefly describe your objectives and target audience..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="mt-8 flex items-center justify-between bg-accent text-white px-8 py-4 font-sans uppercase tracking-widest text-sm font-semibold hover:bg-accent/90 transition-colors group w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal focus:ring-accent"
              >
                <span>{isSubmitting ? "Sending..." : "Submit Request"}</span>
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                )}
              </button>

            </form>
          )}
        </motion.div>
      </div>

    </section>
  );
}
