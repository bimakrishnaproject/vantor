import type { Metadata } from 'next';
import { getContactData } from '@/lib/cms';
import { StadiumHero } from '@/components/StadiumHero';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ContactForm } from '@/components/ContactForm';
import { ContactScene3D } from '@/components/ContactScene3D';

export const metadata: Metadata = {
  title: 'Contact | Vantor Ventures',
  description:
    'Ready to put your brand in front of the most engaged communities in sports, music, and entertainment? Book a campaign today.',
};

export default async function ContactPage() {
  const data = await getContactData();

  return (
    <>
      <StadiumHero hero={data.hero} />

      {/* 3D Wave Grid background for the contact section */}
      <ContactScene3D />

      <SectionWrapper id="contact-form-section" showGrid>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Contact Info Side */}
          <div className="lg:col-span-5 lg:pr-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-vantor-white mb-6">
              Enter the Arena
            </h2>
            <p className="text-vantor-silver text-base leading-relaxed mb-10">
              {data.intro}
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-vantor-blue text-xs uppercase tracking-widest font-semibold mb-3">
                  Email
                </h3>
                <a
                  href={`mailto:${data.contactInfo.email}`}
                  className="text-vantor-white text-lg hover:text-vantor-cyan transition-colors"
                >
                  {data.contactInfo.email}
                </a>
              </div>

              {data.contactInfo.phone && (
                <div>
                  <h3 className="text-vantor-blue text-xs uppercase tracking-widest font-semibold mb-3">
                    Phone
                  </h3>
                  <p className="text-vantor-white text-lg">
                    {data.contactInfo.phone}
                  </p>
                </div>
              )}

              {data.contactInfo.address && (
                <div>
                  <h3 className="text-vantor-blue text-xs uppercase tracking-widest font-semibold mb-3">
                    Headquarters
                  </h3>
                  <p className="text-vantor-white text-lg max-w-xs">
                    {data.contactInfo.address}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-vantor-blue text-xs uppercase tracking-widest font-semibold mb-3">
                  Connect
                </h3>
                <div className="flex gap-4">
                  {data.contactInfo.socials?.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-vantor-silver hover:text-vantor-blue hover:border-vantor-blue/50 hover:bg-vantor-blue/5 transition-all duration-300"
                      aria-label={social.platform}
                    >
                      <span className="text-sm font-bold">
                        {social.platform.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <ContactForm fields={data.formFields} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
