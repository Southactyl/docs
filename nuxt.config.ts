export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['nuxt-studio'],
   llms: {
    domain: 'https://southactyl.xyz',
    title: 'Southactyl Documentation',
    description: 'Installation documentation for Southactyl Panel, an open-source Pterodactyl based panel.',
  },
  css: ['~/assets/css/main.css']
})