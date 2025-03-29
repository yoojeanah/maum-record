'use client';

import withAdminAuth from '../components/admin/withAdminAuth';
import HealingProgramList from '../components/admin/HealingProgramList';
import HealingProgramTrendChart from '../components/admin/HealingProgramTrendChart';
import StatCard from '../components/admin/StatCard';
import { Users, PenSquare, Smile, Heart } from 'lucide-react';

type StatsData = {
	userCount: number;
	todayJournalCount: number;
	avgPositiveRate: number;
};

type healingPrograms = {
	name: string;
	count: number;
}

function AdminDashboardPage() {
	// 임시 mock 데이터
	const stats = {
		userCount: 122,
		todayJournalCount: 18,
		avgPositiveRate: 61.2,
	};

	const healingPrograms = [
		{ name: '명상', count: 24 },
		{ name: '요가', count: 19 },
		{ name: '음악 감상', count: 13 },
	];

	/**
	 *  
	 * Backend와 연결하게 되었을 때!!
	 * 
	const [stats, setStats] = useState<StatsData | null>(null);
  
	useEffect(() => {
	  const fetchStats = async () => {
		try {
		  const res = await fetch('https://api.maumrecord.com/admin/dashboard');
		  const data = await res.json();
		  setStats(data);
		} catch (err) {
		  console.error('대시보드 데이터 불러오기 실패:', err);
		}
	  };
  
	  fetchStats();
	}, []);
  
	if (!stats) return <p className="p-4">로딩 중...</p>;
  */

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">📊 관리자 대시보드</h2>

			{/* 요약 카드 */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<StatCard title="전체 사용자 수" value={stats.userCount} icon={<Users />} />
				<StatCard title="오늘 일기 수" value={stats.todayJournalCount} icon={<PenSquare />} />
				<StatCard title="평균 긍정률" value={`${stats.avgPositiveRate}%`} icon={<Smile />} />
			</div>

			{/* 힐링 프로그램 오늘 사용량 & 최근 7일 차트*/}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='lg:col-span-1'>
					<HealingProgramList programs={healingPrograms}/>
				</div>
				<div className='lg:col-span-2'>
					<HealingProgramTrendChart />
				</div>
			</div>
		</div>
	);
}

export default withAdminAuth(AdminDashboardPage);