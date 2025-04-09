// 나중에 백 붙을 때 할 일
// publicRequest.post('/feedback', {...}) 주석 해제
// 실제 API 엔드포인트(/feedback인지 확인)
// 필요 시 Authorization 헤더 추가 (authRequest 사용)
export async function sendFeedback({
  feedback,
  categories,
}: {
  feedback: string;
  categories: string[];
}) {
  console.log('피드백 전송됨:', { feedback, categories });

  // 백 연동 전까지는 가짜 딜레이 + 응답
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'ok' });
    }, 1000);
  });
}
