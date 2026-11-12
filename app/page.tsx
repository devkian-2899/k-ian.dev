/**
 * app/page.tsx — Home route (`/`)
 *
 * Renders the full public CV as static HTML. Content mirrors the Curriculum Vitae PDF.
 * Styling uses Tailwind utility classes on the markup plus shared classes from globals.css
 * (`.cv-paper`, `.cv-section-title`, `.cv-bullet`).
 *
 * Interactive behavior is limited to `a href` links (phone, email, reference contact, project request).
 */

import Image from "next/image";
import { CvSectionHighlight } from "./CvSectionHighlight";
import { CvTopBanner } from "./CvTopBanner";
import { CV_SKILLS } from "./cv-skill-list";
import { ProjectRequestProvider } from "./ProjectRequestProvider";
import { ProjectTransparencyNote } from "./ProjectTransparencyNote";

/** Header social links — icons are decorative; labels are the only clickable part. */
const CV_GITHUB = {
  href: "https://github.com/devkian-2899",
  label: "devkian-2899",
};

const CV_LOCATION = {
  href: "https://www.google.com/maps/search/?api=1&query=Min+Buri,+Bangkok,+Thailand",
  label: "Minburi/Minburi, Bangkok, TH.",
};

/* Temporarily hidden — restore when LinkedIn URL is ready.
const CV_LINKEDIN = {
  href: "https://www.linkedin.com/in/kaung-khant",
  label: "LinkedIn",
};
*/

const CV_EDUCATION: { degree: string; school: string }[] = [
  { degree: "Bachelor of Science (Computing)", school: "Gloucestershire, UK." },
  { degree: "Higher National Diploma in IT", school: "Edexcel, UK." },
  { degree: "Bachelor of Art (English)", school: "University of East Yangon, MM." },
  { degree: "Basic Programming In Java, Advanced OOP Java", school: "New Westminster, SG." },
];

function CvSkillTableCell({ title, detail }: { title: string; detail: string }) {
  return (
    <>
      <div className="cv-skill-head">
        <span className="cv-bullet">▪</span>
        <span className="font-bold">{title}</span>
      </div>
      <p className="cv-skill-detail">{detail}</p>
    </>
  );
}

function CvContactPhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-contact-icon"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CvContactEmailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-contact-icon"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m22 6-10 7L2 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CvContactGitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-contact-icon"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CvCompanyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-entry-org-icon"
      fill="none"
      height="13"
      viewBox="0 0 24 24"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CvLocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-entry-org-icon"
      fill="none"
      height="13"
      viewBox="0 0 24 24"
      width="13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" fill="currentColor" r="1.75" stroke="none" />
    </svg>
  );
}

function CvEntryOrgLine({
  company,
  companyHref,
  companyLinkText,
  location,
}: {
  company: string;
  companyHref?: string;
  /** When set with companyHref, only this substring is linked inside `company`. */
  companyLinkText?: string;
  location: string;
}) {
  const companyLabel =
    companyHref && companyLinkText && company.includes(companyLinkText) ? (
      <>
        {company.slice(0, company.indexOf(companyLinkText))}
        <a className="cv-link" href={companyHref} rel="noopener noreferrer" target="_blank">
          {companyLinkText}
        </a>
        {company.slice(company.indexOf(companyLinkText) + companyLinkText.length)}
      </>
    ) : companyHref ? (
      <a className="cv-link" href={companyHref} rel="noopener noreferrer" target="_blank">
        {company}
      </a>
    ) : (
      <span>{company}</span>
    );

  return (
    <p className="cv-entry-org">
      <span className="cv-entry-org-part">
        <CvCompanyIcon />
        {companyLabel}
      </span>
      <span aria-hidden="true" className="cv-entry-org-sep">
        |
      </span>
      <span className="cv-entry-org-part">
        <CvLocationIcon />
        <span>{location}</span>
      </span>
    </p>
  );
}

/* Temporarily hidden — restore with header LinkedIn row below.
function CvContactLinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="cv-contact-icon"
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="4" cy="4" fill="currentColor" r="1.5" stroke="none" />
    </svg>
  );
}
*/

/**
 * Default export for `/`: wraps the CV in a desk background and a print-sized paper sheet.
 */
export default function Home() {
  return (
    <ProjectRequestProvider>
    <CvSectionHighlight />
    <div id="top" className="min-h-screen bg-stone-300/90 px-3 py-8 print:bg-white print:p-0 sm:px-6 sm:py-10">
      {/* A4-style white sheet; max width ~210mm to match paper CV */}
      <article className="cv-paper mx-auto max-w-[210mm] bg-white px-8 py-10 text-[11pt] leading-snug text-black shadow-[0_8px_32px_rgba(0,0,0,0.15)] print:max-w-none print:px-10 print:shadow-none sm:px-12 sm:py-12">
        <div className="cv-hero pb-2">
          <p className="cv-hero-kicker">Interactive Digital CV</p>
          <header
            id="contact"
            className="cv-hero-card flex items-center justify-between gap-5 sm:items-start sm:gap-6"
          >
            <div className="min-w-0 flex-1 text-left">
              <div className="cv-hero-name-row">
                <Image
                  alt="Kaung Khant developer logo"
                  className="cv-hero-logo"
                  height={40}
                  src="/images/icon-png-blk.png"
                  width={40}
                />
                <h1 className="cv-name mt-2 font-bold tracking-wide">KAUNG KHANT</h1>
              </div>
            <p className="cv-meta mt-2 leading-relaxed">
              <span className="cv-contact-row">
                <CvLocationIcon />
                <a
                  className="cv-link"
                  href={CV_LOCATION.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {CV_LOCATION.label}
                </a>
              </span>
              <br />
              <span className="cv-contact-row">
                <CvContactPhoneIcon />
                <a className="cv-link" href="tel:+66822601141">
                  +668 2260 1141
                </a>
              </span>
              <br />
              <span className="cv-contact-row">
                <CvContactEmailIcon />
                <a className="cv-link" href="mailto:contact@k-ian.dev">
                  contact@k-ian.dev
                </a>
              </span>
              <br />
              <span className="cv-contact-row">
                <CvContactGitHubIcon />
                <a
                  className="cv-link"
                  href={CV_GITHUB.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {CV_GITHUB.label}
                </a>
              </span>
              {/* Temporarily hidden — LinkedIn contact
              <br />
              <span className="cv-contact-row cv-contact-row--linkedin">
                <CvContactLinkedInIcon />
                <a
                  className="cv-link"
                  href={CV_LINKEDIN.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {CV_LINKEDIN.label}
                </a>
              </span>
              */}
            </p>
          </div>
          <div
            aria-label="Profile photo of Kaung Khant"
            className="cv-photo relative size-[120px] shrink-0 overflow-hidden rounded-full border border-stone-400 bg-stone-100 print:border-stone-600"
          >
            <Image
              alt="Kaung Khant"
              className="object-cover object-center"
              fill
              priority
              sizes="120px"
              src="/images/profile.jpg"
            />
          </div>
          </header>
        </div>

        <CvTopBanner />

        <section id="design-approaches" className="cv-section-block scroll-mt-4">
          <h2 className="cv-section-title">Summary</h2>
          <div className="cv-prose mt-2 space-y-2">
            <p>
              <span className="font-bold">Full-stack Software Developer :</span> Co-founded a
              Thailand-based freelance software development team and led the development of
              &ldquo;PICOSBS&rdquo; a fully customizable ERP system serving clients across multiple
              industries. Also contributed to AI-related projects using proprietary in-house AI
              Solutions.
            </p>
            <p>
              <span className="font-bold">Data Analyst/Engineering :</span> Experienced in data
              analysis, data organization, and intermediate-level data engineering through the
              integration of in-house AI and machine learning models.
            </p>
            <p>
              <span className="font-bold">IT Office Management :</span> Experienced in providing IT
              support and maintenance across software, hardware, and server environments, including
              troubleshooting technical issues, maintaining systems, and ensuring reliable day-to-day
              IT operations both clients and servers, with 1.5 years of IT support experience at an
              engineering company and previous experience as a full-stack software developer by
              launching multiple industry&rsquo;s software.
            </p>
            <p>
              <span className="font-bold">Systematic Developer :</span> With a solid academic
              foundation in the Software Development Life Cycle (SDLC), experienced in managing the
              full development lifecycle across both my own team and previous roles from ideation and
              system design through development, implementation, and delivery.
            </p>
            <p>
              <span className="font-bold">Collaborative Team Player :</span> Team-oriented developer
              with experience collaborating across cross-functional teams in both onsite and remote
              working environments.
            </p>
            <p>
              <span className="font-bold">Designer's Vision :</span> Gained valuable experience collaborating with an in-house professional graphic design team,
              developing a strong understanding of color theory, typography, font pairing, visual hierarchy, and layout principles.
            </p>
          </div>
        </section>

        {/* Two-column skills table (same structure as the PDF) */}
        <section id="skills" className="cv-section-block cv-section-highlight-target scroll-mt-4">
          <h2 className="cv-section-title">Skills</h2>
          <div className="cv-skills-mobile mt-3 text-left sm:hidden">
            {CV_SKILLS.map((skill) => (
              <div key={skill.title} className="cv-skill-mobile-block">
                <p className="font-bold leading-snug">{skill.title}</p>
                <p className="cv-skill-mobile-detail mt-0.5 leading-snug">{skill.detail}</p>
              </div>
            ))}
          </div>
          <table className="cv-skills-table cv-skills-desktop mt-3 hidden text-left sm:table">
            <tbody>
              <tr>
                <td>
                  <CvSkillTableCell title={CV_SKILLS[0].title} detail={CV_SKILLS[0].detail} />
                </td>
                <td>
                  <CvSkillTableCell title={CV_SKILLS[1].title} detail={CV_SKILLS[1].detail} />
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td>
                  <CvSkillTableCell title={CV_SKILLS[2].title} detail={CV_SKILLS[2].detail} />
                </td>
                <td>
                  <CvSkillTableCell title={CV_SKILLS[3].title} detail={CV_SKILLS[3].detail} />
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td colSpan={2}>
                  <CvSkillTableCell title={CV_SKILLS[4].title} detail={CV_SKILLS[4].detail} />
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td colSpan={2}>
                  <CvSkillTableCell title={CV_SKILLS[5].title} detail={CV_SKILLS[5].detail} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <p className="cv-skills-explore mt-3">
          <span className="cv-skills-explore-soon">Explore my skills here! (Coming Soon...)</span>
        </p>

        {/* Each job: role + date row, employer italic, description paragraph */}
        <section id="experiences" className="cv-section-block cv-section-highlight-target scroll-mt-4">
          <h2 className="cv-section-title">Experiences</h2>
          <ul className="mt-3 space-y-4">
            <li className="cv-entry">
              <div className="cv-entry-head">
                <h3 className="font-bold">Freelance Full-stack Developer</h3>
                <span className="cv-entry-date">Aug 2023 – Present</span>
              </div>
              <CvEntryOrgLine company="In-house Team" location="Bangkok, TH." />
              <p className="cv-prose mt-1">
                Co-founded member of freelance software development team for creating an in-house ERP
                system and outsource projects mostly from Myanmar.
              </p>
            </li>
            <li className="cv-entry">
              <div className="cv-entry-head">
                <h3 className="font-bold">Junior Full-stack Web Developer</h3>
                <span className="cv-entry-date">May 2022 – Oct 2022</span>
              </div>
              <CvEntryOrgLine
                company="VISKEE (AIBT Global)"
                companyHref="https://aibtglobal.edu.au/"
                companyLinkText="AIBT Global"
                location="Bangkok, TH."
              />
              <p className="cv-prose mt-1">
                Developed a timetable system for that educational consultant company with
                collaboration of the other non-IT team members. Learning the system and brainstorming
                the paper-based system to convert the digital system. Stand out development is auto
                generated student and instructor ID and uniform QR code to view the info of each
                member. An auto-generated timetable for each new class. I worked as a full-stack web
                developer for four and a half months.
              </p>
            </li>
            <li className="cv-entry">
              <div className="cv-entry-head">
                <h3 className="font-bold">IT Technician</h3>
                <span className="cv-entry-date">Sept 2020 – Dec 2021</span>
              </div>
              <CvEntryOrgLine company="WIN Design Group" location="Yangon, MM." />
              <p className="cv-prose mt-1">
                Local IT manager for the company. Staff&rsquo;s devices, peripheral devices and its
                related Windows &amp; other software maintenance. Individual PCs, servers, Wi-fi and
                file sharing LAN related hardware maintenance.
              </p>
            </li>
            <li className="cv-entry">
              <div className="cv-entry-head">
                <h3 className="font-bold">Internship Web Developer</h3>
                <span className="cv-entry-date">Sept 2018 – Feb 2019</span>
              </div>
              <CvEntryOrgLine
                company="TRIFINITY Software"
                companyHref="https://web.facebook.com/trifinitymyanmar/?_rdc=1&_rdr#"
                location="Yangon, MM."
              />
              <p className="cv-prose mt-1">
                Joined as an internship web-developer and became a group 1 leader. Developed an
                auction system web application frame with a real-time bidding system by using ReactJS
                by using Laravel framework. Launching the web app on the AWS server by setting up a
                whole new stand-alone Ubuntu server starting from installation until hosting the whole
                application which can start the performance testing phase.
              </p>
            </li>
          </ul>
        </section>

        <section id="projects" className="cv-section-block cv-section-highlight-target scroll-mt-4">
          <h2 className="cv-section-title">Projects </h2>
          <ul className="mt-3 space-y-4">
            <CvProject
              title="Personal Assistant AI"
              status="Developing in Progress"
              company="Own Project"
              location="Bangkok, TH."
              bullets={[
                "Developing a localized AI-powered personal assistant with integrated memory-supported hardware",
                "Focused on enhancing user interaction through persistent memory and contextual awareness.",
              ]}
            />
            <CvProject
              title="In-house AI Assistant (Sena)"
              status="Training in Progress"
              company="Co-founder, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "AI-powered personal and organizational assistant with persistent memory, enabling context-aware interactions, task management, and adaptive user support. Sena can be tested on Telegram Messenger upon request.",
              ]}
            />
            <hr />
            <CvProject
              title="Burmese Subtitle Translator AI"
              status="Finalizing in Progress"
              company="Co-founder, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Contributed to the development of an AI model for automated English-to-Burmese subtitle translation",
                "Supported media localization for films and music content.",
              ]}
            />
            <CvProject
              title="Hkakabo Gear"
              status="Finalizing in Progress"
              company="Junior Developer, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Developed an automotive parts e-commerce platform for a client",
                "Implemented key features to support product management and online sales.",
              ]}
            />
            <CvProject
              title="HtooElLin Portfolio"
              status="Finalizing in Progress"
              company="Co-founder, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Contributed to the development of a professional portfolio platform",
                "Assisted in building and refining system functionality and user experience",
              ]}
            />
            <CvProject
              title="Pico SBS"
              status="Launching Finished"
              company="Co-founder, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Customizable ERP system designed to support diverse business needs, offering modular features for operations management, scalability, and process optimization.",
              ]}
            />
          </ul>
          
          <ProjectTransparencyNote />
          <br />
          <hr />
          <ul className="mt-3 space-y-4">
            <CvProject
              title="Local Taxi App"
              status="Launching Finished"
              company="Senior Developer, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Developed a local taxi booking application designed to connect passengers with drivers, featuring ride requests, location-based services, trip management, and a user-friendly interface for convenient transportation.",
              ]}
            />
            <CvProject
              title="Banking App"
              status="Launching Finished"
              company="Senior Developer, In-house Team"
              location="Bangkok, TH."
              bullets={[
                "Developed a banking application designed to support digital financial services, featuring account management, transaction processing, fund transfers, and secure, user-friendly interfaces for efficient banking operations.",
              ]}
            />
          </ul>
          
          <p className="cv-block-note">
            Project details are confidential under client restrictions; only user-level access is permitted.
          </p>
          <br />
          <hr />

        </section>

        <section className="cv-section-block scroll-mt-4">
          <h2 className="cv-section-title">Education</h2>
          <ul className="cv-edu-list cv-hang-list mt-3">
            {CV_EDUCATION.map((row) => (
              <li key={row.degree} className="cv-edu-item">
                <span className="cv-bullet" aria-hidden="true">
                  ●
                </span>
                <span className="cv-hang-text cv-edu-text">
                  <span className="cv-edu-degree">{row.degree}</span>
                  <span className="cv-edu-loc">
                    <CvLocationIcon />
                    <span className="cv-edu-school">{row.school}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section-block scroll-mt-4">
          <h2 className="font-bold">References:</h2>
          <p className="mt-2">
            MYO THET NAUNG (MR.), Project Manager PICO SBS.
            <br />
            <a className="cv-link" href="mailto:myothetnaung.th@gmail.com">
              myothetnaung.th@gmail.com
            </a>
            ,{" "}
            <a className="cv-link" href="tel:+66620277379">
              +66620277379
            </a>
            .
          </p>
        </section>
      </article>
    </div>
    </ProjectRequestProvider>
  );
}

/** Props for one row in the Projects section (title, status badge, company/location, bullet lines). */
type CvProjectProps = {
  title: string;
  status: string;
  company: string;
  location: string;
  bullets: string[];
};

/**
 * Renders a single project entry with the same layout as employment rows:
 * title and status on one line, company | location, then bullet list.
 */
function CvProject({ title, status, company, location, bullets }: CvProjectProps) {
  return (
    <li className="cv-entry">
      <div className="cv-entry-head">
        <h3 className="font-bold">{title}</h3>
        <span className="cv-entry-date">{status}</span>
      </div>
      <CvEntryOrgLine company={company} location={location} />
      <ul className="cv-hang-list">
        {bullets.map((line) => (
          <li key={line}>
            <span className="cv-bullet" aria-hidden="true">
              ●
            </span>
            <span className="cv-hang-text">{line}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
