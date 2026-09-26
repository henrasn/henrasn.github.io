import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center text-center px-[20px] lg:px-[24px] max-w-[1200px] mx-auto pt-20 pb-[120px]">
      <div className="inline-flex items-center gap-3 bg-surface-container px-4 py-2 rounded-full mb-8 shadow-sm relative group cursor-pointer transition-transform hover:scale-105">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
        </div>
        <span className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest group-hover:text-on-surface transition-colors">
          Open to select Senior &amp; Staff Android roles
        </span>
      </div>

      <h1 className="font-[Space_Grotesk] text-[48px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
        Henra Surya
      </h1>
      <h2 className="font-[Space_Grotesk] text-[32px] md:text-[40px] font-semibold tracking-[-0.01em] leading-[1.2] text-secondary mb-8">
        Senior Android Engineer
      </h2>

      <p className="font-body text-[18px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto mb-10">
        Architecting fluid, fault-tolerant Android experiences. Specializing in highly optimized{" "}
        <strong className="text-on-surface font-semibold">Kotlin</strong> codebases, declarative UIs with{" "}
        <strong className="text-on-surface font-semibold">Jetpack Compose</strong>, and robust reactive architectures.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl mx-auto">
        <span className="font-code text-[14px] bg-primary/10 text-primary px-4 py-2 rounded-full">Kotlin</span>
        <span className="font-code text-[14px] bg-primary/10 text-primary px-4 py-2 rounded-full">Jetpack Compose</span>
        <span className="font-code text-[14px] bg-primary/10 text-primary px-4 py-2 rounded-full">Coroutines &amp; Flow</span>
        <span className="font-code text-[14px] bg-primary/10 text-primary px-4 py-2 rounded-full">Clean Architecture &amp; MVI</span>
        <span className="font-code text-[14px] bg-primary/10 text-primary px-4 py-2 rounded-full">Baseline Profiles</span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-24">
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-body text-[16px] font-semibold px-6 py-3 rounded-lg hover:shadow-[0_8px_24px_rgba(173,198,255,0.2)] hover:-translate-y-0.5 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>chat</span>
          WhatsApp
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-surface-container text-on-surface font-body text-[16px] font-semibold px-6 py-3 rounded-lg hover:bg-surface-container-high hover:-translate-y-0.5 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>work</span>
          LinkedIn
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-surface-container text-on-surface font-body text-[16px] font-semibold px-6 py-3 rounded-lg hover:bg-surface-container-high hover:-translate-y-0.5 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>mail</span>
          Email
        </a>
      </div>

      <div className="flex flex-col items-center w-full max-w-4xl mb-24">
        <p className="font-body text-[14px] font-semibold text-outline-variant mb-6 tracking-widest uppercase">Select Portfolio Mode</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link
            to="/professional"
            className="group flex flex-col text-left bg-surface-container hover:bg-surface-container-high p-6 rounded-2xl shadow-sm transition-all relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-dim flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-surface-variant text-[24px]">work_history</span>
              </div>
              <h3 className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface">Professional</h3>
            </div>
            <p className="font-body text-[16px] text-on-surface-variant">Resume, Timeline &amp; Skills</p>
          </Link>

          <Link
            to="/personal"
            className="group flex flex-col text-left bg-surface-container-high p-6 rounded-2xl shadow-[0_12px_32px_rgba(68,226,205,0.15)] relative overflow-hidden ring-2 ring-secondary/50 transform scale-[1.02] transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent" />
            <div className="absolute top-6 right-6">
              <span className="font-body text-[14px] font-semibold bg-secondary/20 text-secondary px-3 py-1 rounded-full uppercase tracking-widest">Gallery</span>
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shadow-[0_4px_16px_rgba(68,226,205,0.4)] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-secondary text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
              </div>
              <h3 className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface">Personal</h3>
            </div>
            <p className="font-body text-[16px] text-on-surface-variant relative z-10">Apps, Articles, Hobbies</p>
          </Link>
        </div>
      </div>

      <div className="w-full bg-surface-container-low rounded-2xl p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-[Space_Grotesk] text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              8<span className="text-primary">+</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Years / Android Focus</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-outline-variant/30 hidden md:flex">
            <p className="font-[Space_Grotesk] text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              15M<span className="text-primary">+</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Production Installs</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-outline-variant/30 hidden md:flex">
            <p className="font-[Space_Grotesk] text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              99<span className="text-secondary">.94%</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Crash-Free Rate</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px before:bg-outline-variant/30 hidden md:flex">
            <p className="font-[Space_Grotesk] text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              100<span className="text-primary">%</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Modern Compose</p>
          </div>

          <div className="flex md:hidden flex-col items-center justify-center text-center">
            <p className="font-[Space_Grotesk] text-[40px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              15M<span className="text-primary">+</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Production Installs</p>
          </div>
          <div className="flex md:hidden flex-col items-center justify-center text-center mt-6">
            <p className="font-[Space_Grotesk] text-[40px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              99<span className="text-secondary">.94%</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Crash-Free Rate</p>
          </div>
          <div className="flex md:hidden flex-col items-center justify-center text-center mt-6">
            <p className="font-[Space_Grotesk] text-[40px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-2">
              100<span className="text-primary">%</span>
            </p>
            <p className="font-body text-[14px] font-semibold text-on-surface-variant uppercase tracking-wider">Modern Compose</p>
          </div>
        </div>
      </div>
    </div>
  )
}