<script setup lang="ts">
useHead({
  title: 'Southactyl Panel Documentation',
  meta: [
    {
      name: 'description',
      content:
        'Installation documentation for Southactyl Panel, a re-themed Pterodactyl panel with addon support.'
    }
  ]
})

const features = [
  {
    title: 'Clean installation',
    description:
      'Follow the correct order for preparing Pterodactyl, applying Southactyl, and avoiding broken assets or missing dependencies.',
    icon: '🚀'
  },
  {
    title: 'Rethemed panel',
    description:
      'Southactyl changes the look and feel of the Pterodactyl panel without forcing you to guess which files matter.',
    icon: '🎨'
  },
  {
    title: 'Addon-ready setup',
    description:
      'Install supported addons, understand what they modify, and troubleshoot conflicts before they wreck your panel.',
    icon: '🧩'
  }
]

const installSteps = [
  'Prepare a working Pterodactyl panel',
  'Back up your files and database',
  'Upload or pull the Southactyl files',
  'Install required dependencies',
  'Build panel assets',
  'Clear cache and restart services'
]

const quickLinks = [
  {
    label: 'Installation guide',
    to: '/docs/installation'
  },
  {
    label: 'Requirements',
    to: '/docs/installation/02-requirements'
  },
  {
    label: 'Addons',
    to: '/docs/addons'
  },
  {
    label: 'Troubleshooting',
    to: '/docs/troubleshooting'
  }
]
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="hero__glow hero__glow--one" />
      <div class="hero__glow hero__glow--two" />

      <div class="hero__content">
        <div class="badge-row">
          <span>Pterodactyl-based</span>
          <span>Rethemed panel</span>
          <span>Addon support</span>
        </div>

        <p class="eyebrow">Southactyl Panel Docs</p>

        <h1>
          Install Southactyl without breaking your panel.
        </h1>

        <p class="hero__text">
          Southactyl is a re-themed Pterodactyl panel with addon support.
          These docs walk you through requirements, installation, asset building,
          addon setup, and common fixes.
        </p>

        <div class="hero__actions">
          <NuxtLink to="/docs/installation" class="button button--primary">
            Start installation
          </NuxtLink>

          <NuxtLink to="/docs/requirements" class="button button--ghost">
            View requirements
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="grid">
      <article v-for="feature in features" :key="feature.title" class="card">
        <div class="card__icon">
          {{ feature.icon }}
        </div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </article>
    </section>

    <section class="panel">
      <div>
        <p class="eyebrow">Installation flow</p>
        <h2>Follow the order. Do not freestyle it.</h2>
        <p>
          Most broken installs happen because people skip backups, build assets
          too early, or install addons before the base panel is working.
        </p>

        <div class="link-grid">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="quick-link"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="checklist">
        <div
          v-for="(step, index) in installSteps"
          :key="step"
          class="checklist__item"
        >
          <span>{{ index + 1 }}</span>
          <p>{{ step }}</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <p class="eyebrow">Before you install</p>
      <h2>Back up first. Complaining later is not a strategy.</h2>
      <p>
        Southactyl modifies panel files and assets. If you are installing it on
        a live Pterodactyl panel, create a proper backup before touching anything.
      </p>

      <NuxtLink to="/docs/installation" class="button button--primary">
        Open installation guide
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  color: #e5e7eb;
  background:
    radial-gradient(circle at top left, rgba(59, 130, 246, 0.25), transparent 34rem),
    radial-gradient(circle at top right, rgba(168, 85, 247, 0.24), transparent 30rem),
    linear-gradient(135deg, #020617 0%, #0f172a 55%, #111827 100%);
  overflow: hidden;
}

.hero {
  position: relative;
  padding: 1.25rem;
}

.nav {
  position: relative;
  z-index: 2;
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand,
.nav__links a {
  color: #e5e7eb;
  text-decoration: none;
}

.brand {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  color: #020617;
  background: linear-gradient(135deg, #93c5fd, #c4b5fd);
}

.nav__links {
  display: flex;
  gap: 1rem;
  font-size: 0.95rem;
}

.nav__links a {
  color: #cbd5e1;
}

.nav__links a:hover {
  color: white;
}

.hero__content {
  position: relative;
  z-index: 2;
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 7rem 0 6rem;
  text-align: center;
}

.badge-row {
  display: flex;
  justify-content: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.badge-row span {
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  color: #dbeafe;
  border: 1px solid rgba(147, 197, 253, 0.24);
  background: rgba(15, 23, 42, 0.58);
  font-size: 0.8rem;
  font-weight: 800;
}

.eyebrow {
  margin: 0 0 1rem;
  color: #93c5fd;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 1.25rem;
  color: white;
  font-size: clamp(3rem, 8vw, 6.75rem);
  line-height: 0.92;
  letter-spacing: -0.08em;
}

.hero__text {
  max-width: 760px;
  margin: 0 auto 2rem;
  color: #cbd5e1;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  line-height: 1.7;
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding: 0 1.25rem;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button--primary {
  color: #020617;
  background: white;
}

.button--ghost {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
}

.grid {
  width: min(1120px, calc(100% - 2.5rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.card,
.panel,
.cta {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.62);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(20px);
}

.card {
  padding: 1.5rem;
  border-radius: 1.5rem;
}

.card__icon {
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.08);
  font-size: 1.35rem;
}

.card h2,
.panel h2,
.cta h2 {
  margin-bottom: 0.75rem;
  color: white;
  font-size: clamp(1.45rem, 3vw, 2.25rem);
  letter-spacing: -0.04em;
}

.card p,
.panel p,
.cta p {
  color: #cbd5e1;
  line-height: 1.7;
}

.panel {
  width: min(1120px, calc(100% - 2.5rem));
  margin: 1rem auto 0;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 1.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.quick-link {
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  color: #e5e7eb;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.checklist {
  display: grid;
  gap: 0.75rem;
}

.checklist__item {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  padding: 0.9rem;
  border-radius: 1rem;
  background: #020617;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.checklist__item span {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  color: #020617;
  background: #bfdbfe;
  font-size: 0.85rem;
  font-weight: 900;
}

.checklist__item p {
  margin: 0;
  color: #e5e7eb;
  font-weight: 700;
}

.cta {
  width: min(1120px, calc(100% - 2.5rem));
  margin: 1rem auto 0;
  padding: clamp(2rem, 5vw, 4rem);
  border-radius: 2rem 2rem 0 0;
  text-align: center;
}

.cta p {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.hero__glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(12px);
  opacity: 0.8;
  pointer-events: none;
}

.hero__glow--one {
  width: 24rem;
  height: 24rem;
  top: 6rem;
  left: -8rem;
  background: rgba(59, 130, 246, 0.22);
}

.hero__glow--two {
  width: 20rem;
  height: 20rem;
  right: -6rem;
  top: 12rem;
  background: rgba(168, 85, 247, 0.2);
}

@media (max-width: 760px) {
  .nav {
    align-items: flex-start;
    gap: 1rem;
    flex-direction: column;
  }

  .nav__links {
    flex-wrap: wrap;
  }

  .hero__content {
    padding: 4rem 0;
    text-align: left;
  }

  .badge-row,
  .hero__actions {
    justify-content: flex-start;
  }

  .grid,
  .panel,
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>