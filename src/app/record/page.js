"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";

export default function RecordPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [nickname] = useState("마음이");

  const audioChunksRef = useRef([]);

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        console.log("🎧 녹음 파일 생성됨:", audioBlob);
      };

      recorder.start();
      setIsRecording(true);
      setIsPaused(false);
      console.log("🔴 녹음 시작!");
    } catch (err) {
      alert("마이크 접근 권한이 필요합니다.");
      console.error("마이크 오류:", err);
    }
  };

  const handlePause = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      setIsPaused(true);
      console.log("⏸️ 녹음 일시정지");
    }
  };

  const handleResume = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      setIsPaused(false);
      console.log("▶️ 녹음 다시 시작");
    }
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      console.log("⏹️ 녹음 종료");
    }
  };

  const handleSubmit = () => {
    if (!audioBlob) return alert("녹음 파일이 없습니다.");
    console.log("🚀 AI 분석용 음성 전송 준비 완료!");
  };

  const isLoggedIn = true;
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        로그인이 필요합니다.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-8 mt-6">
        어서 오세요, {nickname} 님. <br />
        오늘 하루는 어떠셨나요?
      </h1>

      <div className="flex gap-4 flex-wrap justify-center">
        {!isRecording ? (
          <button
            onClick={handleStart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            녹음 시작
          </button>
        ) : isPaused ? (
          <button
            onClick={handleResume}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            다시 시작
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg"
          >
            일시정지
          </button>
        )}

        {isRecording && (
          <button
            onClick={handleStop}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          >
            녹음 종료
          </button>
        )}

        {audioBlob && !isRecording && (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            녹음 제출
          </button>
        )}
      </div>

      <FooterLogo />
    </div>
  );
}
