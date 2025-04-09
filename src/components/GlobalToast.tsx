'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/store/useToastStore';
import AnalysisToast from '../app/components/AnalysisToast';
import { useUI } from '@/context/UIContext';

export default function GlobalToast() {
  const { isToastVisible, showToast } = useToastStore();
  const { openModal } = useUI(); // 결과 보러가기 → 피드백 모달 띄움

  // 10초 후 토스트 자동으로 띄우기
  useEffect(() => {
    const timer = setTimeout(() => {
      showToast();
    }, 10000);

    return () => clearTimeout(timer);
  }, [showToast]);

  if (!isToastVisible) return null;

  return (
    <AnalysisToast
      onConfirm={() => {
        openModal(); // "결과 보러 가기" 누르면 피드백 모달 열림
      }}
    />
  );
}
