This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
maumrecord
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ audio
│  │  ├─ bell.mp3
│  │  ├─ essay-meditation-part1.wav
│  │  ├─ essay-meditation-part2.wav
│  │  ├─ fireplace.mp3
│  │  └─ VOLI_TTS_설아.wav
│  ├─ favicon.ico
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
│  │  ├─ book-bg.jpg
│  │  ├─ calendar-example.png
│  │  ├─ healing-example.png
│  │  ├─ record-example.png
│  │  ├─ result-example.png
│  │  ├─ tree-fruit.png
│  │  ├─ tree-full.png
│  │  ├─ tree-growing.png
│  │  ├─ tree-sprout.png
│  │  └─ tree-taller.png
│  ├─ mock-images
│  │  └─ inquiry-example.png
│  ├─ music
│  │  ├─ 1.mp3
│  │  ├─ 2.mp3
│  │  ├─ 3.mp3
│  │  ├─ 4.mp3
│  │  ├─ 5.mp3
│  │  └─ 6.mp3
│  ├─ poses
│  ├─ profile-default.png
│  ├─ video
│  │  ├─ 1.mp4
│  │  ├─ 2.mp4
│  │  ├─ 3.mp4
│  │  ├─ 4.mp4
│  │  └─ fireplace.mp4
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ admin
│  │  │  ├─ inquiries
│  │  │  │  ├─ InquiriesPageContent.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ users
│  │  │     ├─ page.tsx
│  │  │     └─ [id]
│  │  │        └─ page.tsx
│  │  ├─ analyzing
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  ├─ admin
│  │  │  │  └─ users
│  │  │  │     └─ route.ts
│  │  │  ├─ meditation-courses
│  │  │  │  └─ route.ts
│  │  │  ├─ music-tracks
│  │  │  │  └─ route.ts
│  │  │  └─ yoga-courses
│  │  │     └─ route.ts
│  │  ├─ calendar
│  │  │  └─ page.tsx
│  │  ├─ colors
│  │  │  └─ page.tsx
│  │  ├─ components
│  │  │  ├─ admin
│  │  │  │  ├─ AdminHeader.tsx
│  │  │  │  ├─ AdminSidebar.tsx
│  │  │  │  ├─ HealingProgramTrendChart.tsx
│  │  │  │  ├─ StatCard.tsx
│  │  │  │  └─ UserTrendChart.tsx
│  │  │  ├─ AnalysisToast.tsx
│  │  │  ├─ auth
│  │  │  │  └─ withAdminAuth.tsx
│  │  │  ├─ FeedbackModal.tsx
│  │  │  ├─ FooterLogo.tsx
│  │  │  ├─ HamburgerMenu.tsx
│  │  │  ├─ Notice.tsx
│  │  │  └─ ProfileIcon.tsx
│  │  ├─ dashboard
│  │  │  ├─ components
│  │  │  │  ├─ EmotionBarChart.tsx
│  │  │  │  ├─ EmotionYearlyBarChart.tsx
│  │  │  │  ├─ HealingLineChart.tsx
│  │  │  │  └─ HealingPieChart.tsx
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ healing
│  │  │  ├─ meditation
│  │  │  │  ├─ course1
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ course2
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ course3
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ music
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ yoga
│  │  │     ├─ course1
│  │  │     │  └─ page.tsx
│  │  │     ├─ course2
│  │  │     │  └─ page.tsx
│  │  │     ├─ course3
│  │  │     │  └─ page.tsx
│  │  │     ├─ course4
│  │  │     │  └─ page.tsx
│  │  │     ├─ course5
│  │  │     │  └─ page.tsx
│  │  │     ├─ course6
│  │  │     │  └─ page.tsx
│  │  │     ├─ course7
│  │  │     │  └─ page.tsx
│  │  │     ├─ course8
│  │  │     │  └─ page.tsx
│  │  │     ├─ course9
│  │  │     │  └─ page.tsx
│  │  │     └─ page.tsx
│  │  ├─ inquiry
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ my-inquiries
│  │  │  └─ page.tsx
│  │  ├─ page.tsx
│  │  ├─ profile
│  │  │  └─ page.tsx
│  │  ├─ record
│  │  │  └─ page.tsx
│  │  ├─ result
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ components
│  │  └─ ResultPage.tsx
│  ├─ context
│  │  └─ UserContext.tsx
│  └─ lib
│     ├─ axiosInstance.ts
│     ├─ healingFeedbackData.ts
│     └─ logout.ts
├─ tailwind.config.js
└─ tsconfig.json

```