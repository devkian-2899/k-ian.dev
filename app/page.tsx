/**
 * app/page.tsx — Home route (`/`)
 *
 * Renders the full public CV as static HTML. Content mirrors the Curriculum Vitae PDF.
 * Styling uses Tailwind utility classes on the markup plus shared classes from globals.css
 * (`.cv-paper`, `.cv-section-title`, `.cv-bullet`).
 *
 * Interactive behavior is limited to `a href` links (phone, email, reference contact).
 */

import { CvTopBanner } from "./CvTopBanner";
import { ProjectRequestProvider } from "./ProjectRequestProvider";
import { ProjectTransparencyNote } from "./ProjectTransparencyNote";

/**
 * Default export for `/`: wraps the CV in a desk background and a print-sized paper sheet.
 */
export default function Home() {
  return (
    <ProjectRequestProvider>
    <div id="top" className="min-h-screen bg-stone-300/90 px-3 py-8 print:bg-white print:p-0 sm:px-6 sm:py-10">
      {/* A4-style white sheet; max width ~210mm to match paper CV */}
      <article className="cv-paper mx-auto max-w-[210mm] bg-white px-8 py-10 text-[11pt] leading-snug text-black shadow-[0_8px_32px_rgba(0,0,0,0.15)] print:max-w-none print:px-10 print:shadow-none sm:px-12 sm:py-12">
        <CvTopBanner />

        {/* Name and contact (left); reserved headshot area (right) */}
        <header
          id="contact"
          className="flex items-start justify-between gap-6 border-b border-stone-200 pb-6"
        >
          <div className="min-w-0 text-left">
            <h1 className="cv-name font-bold tracking-wide">KAUNG KHANT</h1>
            <p className="cv-meta mt-2 leading-relaxed">
              Bangkok, Thailand
              <br />
              <a className="cv-link" href="tel:+66822601141">
                +668 2260 1141
              </a>
              <br />
              <a className="cv-link" href="mailto:contact@k-ian.dev">
                contact@k-ian.dev
              </a>
            </p>
          </div>
          <div
            aria-label="Profile photo placeholder"
            className="cv-photo relative flex h-[132px] w-[102px] shrink-0 items-center justify-center overflow-hidden border border-stone-400 bg-stone-100 text-center text-[9pt] text-stone-500 print:border-stone-600"
          >
            Photo
          </div>
        </header>

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
        <section id="skills" className="cv-section-block scroll-mt-4">
          <h2 className="cv-section-title">Skills</h2>
          <table className="cv-skills-table mt-3 text-left">
            <tbody>
              <tr>
                <td>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Core Frameworks &amp; Library</span>
                  </div>
                  <p className="cv-skill-detail">(PHP, Laravel, React Native)</p>
                </td>
                <td>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Former Experiences</span>
                  </div>
                  <p className="cv-skill-detail">(Next.js, Vue.js, C#.NET, Java)</p>
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Front-end UI Core Techs</span>
                  </div>
                  <p className="cv-skill-detail">(HTML5, CSS3, Basic TypeScript)</p>
                </td>
                <td>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Front-end Frameworks and Components</span>
                  </div>
                  <p className="cv-skill-detail">(React, Bootstrap)</p>
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td colSpan={2}>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Additional Skillset</span>
                  </div>
                  <p className="cv-skill-detail">
                    (Agile SDLC, REST API, AWS, Debugging, Clean Coding, Design Concept Experience & Visual/Text-based
                    Reporting)
                  </p>
                </td>
              </tr>
              <tr className="cv-skills-pair-gap">
                <td colSpan={2}>
                  <div className="cv-skill-head">
                    <span className="cv-bullet">▪</span>
                    <span className="font-bold">Soft Skills</span>
                  </div>
                  <p className="cv-skill-detail">
                    Problem Solving, Project Management, Technical Communication, Time Management
                    &amp; Prioritizing, Teamworking, Adaptability, Organizational Skills, Requirement
                    Gathering.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Each job: role + date row, employer italic, description paragraph */}
        <section id="experiences" className="cv-section-block scroll-mt-4">
          <h2 className="cv-section-title">Experiences</h2>
          <ul className="mt-3 space-y-4">
            <li>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold">Freelance Full-stack Developer</h3>
                <span>Aug 2023 – Present</span>
              </div>
              <p className="italic">in-house, Bangkok, TH.</p>
              <p className="cv-prose mt-1">
                Co-founded member of freelance software development team for creating an in-house ERP
                system and outsource projects mostly from Myanmar.
              </p>
            </li>
            <li>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold">Junior Full-stack Web Developer</h3>
                <span>May 2022 – Oct 2022</span>
              </div>
              <p className="italic">VISKEE (AIBT Global) Bangkok, TH.</p>
              <p className="cv-prose mt-1">
                Developed a timetable system for that educational consultant company with
                collaboration of the other non-IT team members. Learning the system and brainstorming
                the paper-based system to convert the digital system. Stand out development is auto
                generated student and instructor ID and uniform QR code to view the info of each
                member. An auto-generated timetable for each new class. I worked as a full-stack web
                developer for 4 and half months during the first semester of my Master&rsquo;s Degree.
              </p>
            </li>
            <li>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold">IT Technician</h3>
                <span>Sept 2020 – Dec 2021</span>
              </div>
              <p className="italic">WIN Design Group Yangon, MM.</p>
              <p className="cv-prose mt-1">
                Local IT manager for the company. Staff&rsquo;s devices, peripheral devices and its
                related Windows &amp; other software maintenance. Individual PCs, servers, Wi-fi and
                file sharing LAN related hardware maintenance.
              </p>
            </li>
            <li>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold">Internship Web Developer</h3>
                <span>Sept 2018 – Feb 2019</span>
              </div>
              <p className="italic">TRIFINITY Software Yangon, MM.</p>
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

        <section id="projects" className="cv-section-block scroll-mt-4">
          <h2 className="cv-section-title">Projects </h2>
          <ul className="mt-3 space-y-4">
            <CvProject
              title="Personal Assistant AI"
              status="Developing in Progress"
              org="Own Project Bangkok, TH."
              bullets={[
                "Developing a localized AI-powered personal assistant with integrated memory-supported hardware",
                "Focused on enhancing user interaction through persistent memory and contextual awareness.",
              ]}
            />
            <CvProject
              title="In-house AI Assistant (Sena)"
              status="Training in Progress"
              org="Co-founder, in-house, Bangkok, TH."
              bullets={[
                "AI-powered personal and organizational assistant with persistent memory, enabling context-aware interactions, task management, and adaptive user support. Sena can be tested on Telegram Messenger upon request.",
              ]}
            />
            <hr />
            <CvProject
              title="Burmese Subtitle Translator AI"
              status="Finalizing in Progress"
              org="Co-founder, in-house, Bangkok, TH."
              bullets={[
                "Contributed to the development of an AI model for automated English-to-Burmese subtitle translation",
                "Supported media localization for films and music content.",
              ]}
            />
            <CvProject
              title="Hkakabo Gear"
              status="Finalizing in Progress"
              org="Junior Developer, in-house, Bangkok, TH."
              bullets={[
                "Developed an automotive parts e-commerce platform for a client",
                "Implemented key features to support product management and online sales.",
              ]}
            />
            <CvProject
              title="HtooElLin Portfolio"
              status="Finalizing in Progress"
              org="Co-founder, in-house, Bangkok, TH."
              bullets={[
                "Contributed to the development of a professional portfolio platform",
                "Assisted in building and refining system functionality and user experience",
              ]}
            />
            <CvProject
              title="Pico SBS"
              status="Launching Finished"
              org="Co-founder, in-house, Bangkok, TH."
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
              org="Senior Developer, in-house, Bangkok, TH."
              bullets={[
                "Developed a local taxi booking application designed to connect passengers with drivers, featuring ride requests, location-based services, trip management, and a user-friendly interface for convenient transportation.",
              ]}
            />
            <CvProject
              title="Banking App"
              status="Launching Finished"
              org="Senior Developer, in-house, Bangkok, TH."
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
          <ul className="cv-hang-list mt-3">
            <li>
              <span className="cv-bullet" aria-hidden="true">
                ●
              </span>
              <span className="cv-hang-text">Master of Science (Computer Systems), ABAC, TH.</span>
            </li>
            <li>
              <span className="cv-bullet" aria-hidden="true">
                ●
              </span>
              <span className="cv-hang-text">Bachelor of Science (Computing), Gloucestershire, UK.</span>
            </li>
            <li>
              <span className="cv-bullet" aria-hidden="true">
                ●
              </span>
              <span className="cv-hang-text">
                Higher National Diploma in IT, Edexcel, UK.
              </span>
            </li>
            <li>
              <span className="cv-bullet" aria-hidden="true">
                ●
              </span>
              <span className="cv-hang-text">Bachelor of Art (English), University of East Yangon, MM.</span>
            </li>
            <li>
              <span className="cv-bullet" aria-hidden="true">
                ●
              </span>
              <span className="cv-hang-text">
                Basic Programming In Java, Advanced OOP Java from New Westminster, SG.
              </span>
            </li>
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

/** Props for one row in the Projects section (title, status badge, org, bullet lines). */
type CvProjectProps = {
  title: string;
  status: string;
  org: string;
  bullets: string[];
};

/**
 * Renders a single project entry with the same layout as employment rows:
 * title and status on one line, organization in italics, then bullet list.
 */
function CvProject({ title, status, org, bullets }: CvProjectProps) {
  return (
    <li>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold">{title}</h3>
        <span>{status}</span>
      </div>
      <p className="italic">{org}</p>
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
