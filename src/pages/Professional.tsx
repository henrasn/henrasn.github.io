import { ExperienceTimeline } from "../components/ExperienceTimeline"
import { SkillCategoryCard } from "../components/SkillCategoryCard"
import { skillCategories } from "../data/skills"

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCHm65yj9KsxWxEVf90_yxmW1ue9q_Q5mJsQFwtcGJ7H2-VK-zsmTGtrbL2Rx256BEllfklgv5tVVICMJEfvYRDIMUaCVrdWPM022R8NRBellAaYdl1T-LHoTo2vp01uytmoo9RKUcGve806SAndojpnnQpzsrt_19MMaEOxo4W4PLAvknFUMoiASs7EG7PL7GCGJSBDHIrHXA2v2Lb0FFaU4bncrZKQhPzSh7cXLrIc7rg37THHvbKTA"

export default function Professional() {
  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] pt-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] relative">
          <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
            <h1 className="mb-6 font-[Space_Grotesk] text-[48px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface">
              Crafting high-performance Android experiences through solid architecture and modern tooling.
            </h1>
            <p className="mb-8 max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
              Senior Android Engineer with over 8 years of experience building scalable, robust
              applications. I specialize in leading technical transitions to Jetpack Compose,
              architecting complex MVVM patterns with Clean Architecture principles, and optimizing
              CI/CD pipelines to deliver reliable software at velocity.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-semibold tracking-[0.05em] text-on-primary transition-all hover:shadow-[0_0_15px_rgba(173,198,255,0.4)]">
                Download Resume
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
              <a
                href="#"
                className="flex items-center justify-center rounded-full border border-outline px-6 py-3 text-[14px] font-semibold tracking-[0.05em] text-on-surface transition-colors hover:bg-surface-container-highest"
              >
                View LinkedIn
              </a>
            </div>
          </div>
          <div className="relative hidden lg:block lg:col-span-4 h-[400px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-surface/0 to-tertiary/20 opacity-50 blur-3xl mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
            <div
              className="relative z-10 h-full w-full rounded-[2rem] bg-cover bg-center shadow-2xl"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          <div className="col-span-1 lg:col-span-4">
            <div className="top-28 flex flex-col gap-6 lg:sticky">
              <h2 className="font-[Space_Grotesk] text-[40px] font-semibold tracking-[-0.01em] text-on-surface">
                Experience
              </h2>
              <p className="text-[16px] leading-[1.5] text-on-surface-variant">
                A timeline of my professional journey, focusing on architectural leadership and
                technical innovation in the Android ecosystem.
              </p>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-8 mt-12 lg:mt-0">
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-[120px]">
        <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px]">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="mb-4 font-[Space_Grotesk] text-[40px] font-semibold tracking-[-0.01em] text-on-surface">
              Technical Arsenal
            </h2>
            <p className="max-w-lg text-[16px] leading-[1.5] text-on-surface-variant">
              A curated stack focused on modern Android development, performance optimization, and
              scalable architectures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((cat) => (
              <SkillCategoryCard key={cat.title} category={cat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
