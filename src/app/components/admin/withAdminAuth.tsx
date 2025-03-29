'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function withAdminAuth<T extends {}>(
	Component: React.ComponentType<T>
  ) {
	return function ProtectedRoute(props: T) {
	  const router = useRouter();
	  const [checked, setChecked] = useState(false);
  
	  useEffect(() => {
		const token = localStorage.getItem('admin-token');
		if (!token) {
		  router.replace('/admin/login');
		} else {
			setChecked(true);
		  }
	  }, [router]);

	  if (!checked) {
		// 로그인 체크가 끝날 때까지 아무것도 보여주지 않음
		return null;
	  }
  
	  return <Component {...props as T} />;
	};
  }
  