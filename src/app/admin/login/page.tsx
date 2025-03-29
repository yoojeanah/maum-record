'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
  
	const handleLogin = async (e: React.FormEvent) => {
	  e.preventDefault();
	  setError('');
  
	  // ✅ MOCK 로그인 로직 (임시)
	  if (email === 'admin@maumrecord.com' && password === 'admin123') {
		localStorage.setItem('admin-token', 'mock-token');
		window.dispatchEvent(new Event('admin-login'));
		router.push('/admin');
	  } else {
		setError('이메일 또는 비밀번호가 올바르지 않습니다.');
	  }
  
	  // ✅ 실제 백엔드 연동 예시
	  // try {
	  //   const res = await fetch('https://api.yourserver.com/admin/login', {
	  //     method: 'POST',
	  //     headers: {
	  //       'Content-Type': 'application/json',
	  //     },
	  //     body: JSON.stringify({ email, password }),
	  //   });
  
	  //   if (!res.ok) throw new Error('로그인 실패');
  
	  //   const data = await res.json();
	  //   localStorage.setItem('admin-token', data.token);
	  //   router.push('/admin');
	  // } catch (err) {
	  //   setError('로그인 중 오류가 발생했습니다.');
	  // }
	};
  
	return (
	  <div className="min-h-screen flex items-center justify-center bg-gray-100">
		<form
		  onSubmit={handleLogin}
		  className="bg-white p-8 rounded shadow-md w-full max-w-md"
		>
		  <h2 className="text-2xl font-bold mb-6">🔐 관리자 로그인</h2>
  
		  <label className="block mb-2 text-sm font-medium">이메일</label>
		  <input
			type="email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			className="w-full p-2 mb-4 border rounded"
			required
		  />
  
		  <label className="block mb-2 text-sm font-medium">비밀번호</label>
		  <input
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			className="w-full p-2 mb-4 border rounded"
			required
		  />
  
		  {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
  
		  <button
			type="submit"
			className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
		  >
			로그인
		  </button>
		</form>
	  </div>
	);
  }