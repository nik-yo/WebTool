# Create app
npx nuxi@latest init asylosoft-webtool

# Pull with conflict
git pull origin main --allow-unrelated-histories

# Launch dev
yarn dev -o

# Build for static hosting
npx nuxi generate

# Launch dev for static hosting
npx serve .output/public

# Modules
yarn add bootstrap
yarn add vue-uuid
yarn add jmespath

# Dev modules
yarn add -D nuxt-gtag
yarn add -D @types/jmespath
