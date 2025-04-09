'use client';

import FeedbackModal from '@/app/components/FeedbackModal';
import { useUI } from '@/context/UIContext';
import { sendFeedback } from '@/api/sendFeedback';
import { useRouter } from 'next/navigation';

export default function GlobalUI({ nickname }: { nickname: string }) {
  const { showModal, closeModal } = useUI();
  const router = useRouter();

  if (!showModal) return null;

  return (
    <FeedbackModal
      show={true}
      nickname={nickname}
      onSelect={async (feedback, categories) => {
        try {
          await sendFeedback({ feedback, categories });
          router.push('/result');
        } catch (error) {
          console.error('피드백 전송 실패:', error);
          alert('전송 중 문제가 발생했어요. 다시 시도해 주세요.');
        } finally {
          closeModal();
        }
      }}
    />
  );
}
