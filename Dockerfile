ARG NODE_VERSION=24.13.0-slim

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY ./package.json ./

RUN npm install


FROM node:${NODE_VERSION} AS builder
# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .


# ENV NODE_ENV=production

RUN npm run build
RUN ls -la /app/.next/standalone

FROM node:${NODE_VERSION} AS runner
# ============================================
# Stage 3: Run Next.js application
# ============================================

WORKDIR /app

# ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]