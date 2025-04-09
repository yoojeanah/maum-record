'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import HamburgerMenu from '@/app/components/HamburgerMenu';
import ProfileIcon from '@/app/components/ProfileIcon';
import FooterLogo from '@/app/components/FooterLogo';

export default function MeditationPage() {
  const router = useRouter();
  const { nickname } = useUserStore();

  const handleNavigate = (course: number) => {
    router.push(`/healing/meditation/course${course}`);
  };

  const courses = [
    { id: 1, title: '종소리 명상', desc: '고요한 울림에 마음을 천천히 실어보는 시간' },
    { id: 2, title: '에세이 명상', desc: '문장들 속에서 사유를 깊이 새겨보는 시간' },
    { id: 3, title: '모닥불 소리 명상', desc: '타닥대는 불소리에 기대어 마음을 내려놓는 시간' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center px-4 py-10 overflow-hidden">
      <HamburgerMenu />
      <ProfileIcon />

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-5xl z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold text-center mb-8">
          {nickname} 님, <br />
          원하는 명상 코스를 선택해 보세요.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleNavigate(course.id)}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:bg-purple-50 transition flex flex-col justify-center items-center min-h-[150px]"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 text-center">{course.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <FooterLogo />
    </div>
  );
}
