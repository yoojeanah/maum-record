import ResultPage from "@/components/ResultPage";

export default function Page() {
  return (
    <ResultPage
      longSummary="오늘은 아침 일찍 일어나 출근 준비를 했어요. 버스가 평소보다 붐벼서 약간 지치긴 했지만, 출근길에 들은 팟캐스트 덕분에 마음이 조금은 편안해졌습니다. 회사에서는 업무량이 많아서 정신없이 하루를 보냈고, 팀 회의 중에는 내가 준비했던 발표가 생각보다 반응이 좋지 않아서 살짝 속상했어요. 점심은 간단히 편의점에서 해결했는데, 급하게 먹어서 그런지 속이 불편했네요. 오후엔 메일과 업무 처리에 시달리다 보니 시간이 훌쩍 흘렀고, 퇴근 무렵에는 비까지 내려 우산 없이 젖은 채로 집에 도착했어요. 그래도 집에 돌아와서 따뜻한 물로 샤워를 하고, 조용한 음악을 틀어놓고 일기를 쓰며 하루를 마무리하니 마음이 조금은 가라앉는 느낌입니다. 오늘은 전반적으로 힘든 하루였지만, 내일은 좀 더 나은 하루가 되길 바라는 마음이에요."
      shortSummary="오늘은 지치고 속상한 일이 많았던 하루였어요. 스스로를 잘 돌보는 시간이 필요해 보여요."
      emotion="😔 우울"
      positive={34}
      negative={66}
    />
  );
}
