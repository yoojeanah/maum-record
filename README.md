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
│  ├─ favicon.ico
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
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
│  │  ├─ inquiry-example.png
│  │  ├─ suryanamaskara-A-1.png
│  │  ├─ suryanamaskara-A-10.png
│  │  ├─ suryanamaskara-A-11.png
│  │  ├─ suryanamaskara-A-2.png
│  │  ├─ suryanamaskara-A-3.png
│  │  ├─ suryanamaskara-A-4.png
│  │  ├─ suryanamaskara-A-5.png
│  │  ├─ suryanamaskara-A-6.png
│  │  ├─ suryanamaskara-A-7.png
│  │  ├─ suryanamaskara-A-8.png
│  │  └─ suryanamaskara-A-9.png
│  ├─ music
│  │  ├─ 1.mp3
│  │  ├─ 2.mp3
│  │  ├─ 3.mp3
│  │  ├─ 4.mp3
│  │  ├─ 5.mp3
│  │  └─ 6.mp3
│  ├─ profile-default.png
│  ├─ test
│  │  ├─ test v1.0
│  │  │  ├─ meditation-course1
│  │  │  │  ├─ 1.mp4
│  │  │  │  ├─ 2.mp4
│  │  │  │  ├─ 3.mp4
│  │  │  │  ├─ 4.mp4
│  │  │  │  ├─ bell.mp3
│  │  │  │  └─ VOLI_TTS_설아.wav
│  │  │  ├─ meditation-course2
│  │  │  │  ├─ book-bg.jpg
│  │  │  │  ├─ essay-meditation-part1.wav
│  │  │  │  └─ essay-meditation-part2.wav
│  │  │  └─ meditation-course3
│  │  │     ├─ fireplace.mp3
│  │  │     └─ fireplace.mp4
│  │  └─ test v2.0
│  │     ├─ meditation-course1
│  │     │  ├─ 1.mp4
│  │     │  ├─ 2.mp4
│  │     │  ├─ 3.mp4
│  │     │  ├─ 4.mp4
│  │     │  └─ course1_final.mp3
│  │     ├─ meditation-course2
│  │     │  ├─ book-bg.jpg
│  │     │  └─ course2_final.mp3
│  │     └─ meditation-course3
│  │        ├─ course3_final.mp3
│  │        └─ fireplace.mp4
│  ├─ video
│  │  ├─ course1.mp4
│  │  ├─ course2.mp4
│  │  └─ course3.mp4
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
│  │  │  ├─ users
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ [id]
│  │  │  │     └─ page.tsx
│  │  │  └─ yoga
│  │  │     ├─ poses
│  │  │     │  └─ page.tsx
│  │  │     └─ programs
│  │  │        ├─ new
│  │  │        │  └─ page.tsx
│  │  │        ├─ page.tsx
│  │  │        └─ [id]
│  │  │           └─ page.tsx
│  │  ├─ analyzing
│  │  │  └─ page.tsx
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
│  │  │  ├─ FeedbackModal.tsx
│  │  │  ├─ FooterLogo.tsx
│  │  │  ├─ HamburgerMenu.tsx
│  │  │  ├─ Notice.tsx
│  │  │  └─ ProfileIcon.tsx
│  │  ├─ dashboard
│  │  │  ├─ components
│  │  │  │  ├─ EmotionBarChart.tsx
│  │  │  │  ├─ EmotionDailyBarChart.tsx
│  │  │  │  ├─ HealingLineChart.tsx
│  │  │  │  └─ HealingPieChart.tsx
│  │  │  └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ healing
│  │  │  ├─ meditation
│  │  │  │  ├─ course
│  │  │  │  │  └─ [id]
│  │  │  │  │     └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ music
│  │  │  │  └─ page.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ yoga
│  │  │     ├─ course
│  │  │     │  └─ [title]
│  │  │     │     └─ page.tsx
│  │  │     └─ page.tsx
│  │  ├─ inquiry
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  ├─ my-inquiries
│  │  │  ├─ page.tsx
│  │  │  └─ [id]
│  │  │     └─ page.tsx
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
│  │  ├─ ToastContext.tsx
│  │  └─ UserContext.tsx
│  └─ lib
│     ├─ axiosInstance.ts
│     ├─ logout.ts
│     └─ userDashboard.ts
├─ tailwind.config.js
└─ tsconfig.json

```