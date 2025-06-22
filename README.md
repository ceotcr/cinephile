# 🎥 Cinephile Bot 🎭

> A Telegram bot that notifies me of upcoming anime episodes — so I never miss a release again.

---

## 🧠 Background

July 2025 is huge for anime.

Multiple fan-favorite shows are returning with new seasons, and a bunch of exciting originals are premiering. I knew it would be hard to keep track of all the release dates — especially with shows airing in different time zones and platforms.

So, I built this.

---

## 🔔 What it Does

This is my **personal Telegram bot** built with **NestJS** that:

- Lets me `/add` an anime
- Sends a **daily notification** of what’s airing today
- Reminds me **5 minutes before each new episode drops**
- Updates itself with the next airing date (via Simkl API)
- Lets me manage my watchlist easily from Telegram

---

## 💻 Tech Stack

| Feature            | Technology                     |
|--------------------|---------------------------------|
| Backend Framework  | NestJS + TypeORM                |
| Database           | SQLite (lightweight & simple)   |
| Scheduler          | `@nestjs/schedule`              |
| Bot Interface      | `node-telegram-bot-api`         |
| Anime Metadata     | Simkl API                       |
| Deployment         | Render                          |

---

## 📦 Local Setup

```bash
git clone https://github.com/ceotcr/cinephile
cd cinephile

npm install
npm run build
npm run start
