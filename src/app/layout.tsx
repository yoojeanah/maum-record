import './globals.css';
import { UIProvider } from '@/context/UIContext';
import GlobalToast from '@/components/GlobalToast';
import GlobalUI from '@/components/GlobalUI';

export const metadata = {
  title: 'MaumRecord',
  description: '당신의 마음을 기록하고 관리하세요.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <UIProvider>
          {children}
          <GlobalToast />
          <GlobalUI nickname="테스트 유저" />
          {/* const user = useUser();
          <GlobalUI nickname={user.nickname} /> */}
        </UIProvider>
      </body>
    </html>
  );
}
