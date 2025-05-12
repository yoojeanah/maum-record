"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { publicRequest } from "@/lib/axiosInstance";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/context/ToastContext";

import HamburgerMenu from "@/app/components/HamburgerMenu";
import ProfileIcon from "@/app/components/ProfileIcon";
import FooterLogo from "@/app/components/FooterLogo";
import Notice from "@/app/components/Notice";
import WaveSurfer from "wavesurfer.js";

export default function RecordPage() {
  const router = useRouter();
  const { nickname } = useUser();
  const { setJobId } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState("00:00");
  const [progress, setProgress] = useState(0);

  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const MAX_SECONDS = 600;

  // 타이머 업데이트
  const updateTimer = () => {
    secondsRef.current += 1;
    const min = String(Math.floor(secondsRef.current / 60)).padStart(2, "0");
    const sec = String(secondsRef.current % 60).padStart(2, "0");
    setRecordingTime(`${min}:${sec}`);
    setProgress((secondsRef.current / MAX_SECONDS) * 100);

    if (secondsRef.current >= MAX_SECONDS) {
      handleStop();
    }
  };

  // 녹음 시작
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
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setIsRecording(false);
        setIsPaused(false);
        recorder.stream.getTracks().forEach((track) => track.stop());

        // 녹음이 끝난 후 파형 표시
        if (waveformContainerRef.current) {
          if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
          }

          const wavesurfer = WaveSurfer.create({
            container: waveformContainerRef.current,
            waveColor: "#d1d5db",
            progressColor: "#ef4444",
            height: 64,
            barWidth: 2,
            barGap: 2,
          });

          wavesurfer.loadBlob(blob);
          wavesurfer.on("ready", () => {
            wavesurfer.play();
          });

          wavesurferRef.current = wavesurfer;
        }
      };

      recorder.start();
      setIsRecording(true);
      setIsPaused(false);
      secondsRef.current = 0;
      setRecordingTime("00:00");
      setProgress(0);
      intervalRef.current = setInterval(updateTimer, 1000);
    } catch (err) {
      alert("마이크 접근 권한이 필요합니다.");
      console.error("마이크 오류:", err);
    }
  };

  // 녹음 일시 정지
  const handlePause = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  // 녹음 다시 시작
  const handleResume = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      setIsPaused(false);
      intervalRef.current = setInterval(updateTimer, 1000);
    }
  };

  // 녹음 종료
  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  // 녹음 제출
  const handleSubmit = async () => {
    if (!audioBlob) return alert("녹음 파일이 없습니다.");

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    try {
      const res = await publicRequest.post<{ jobId: string }>(
        "/audio/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const jobId = res.data.jobId;

      setJobId(jobId);

      router.push("/analyzing");
    } catch (err) {
      console.error("❌ 업로드 실패:", err);
      alert("녹음 업로드에 실패했습니다.");
    }
  };

  const isLoggedIn = true;
  const showStartButton = !isRecording && !isPaused && !audioBlob;

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        로그인이 필요합니다.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 pb-16">
      <Notice />
      <HamburgerMenu />
      <ProfileIcon />

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-8 mt-6">
        어서 오세요, {nickname} 님. <br />
        오늘 하루는 어떠셨나요?
      </h1>

      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <div className="text-2xl font-mono text-gray-800">{recordingTime}</div>

        <div className="w-full h-[64px] bg-gray-200 relative">
          {!(audioBlob || isRecording) && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
              🎧 녹음 파형이 표시되는 영역입니다
            </div>
          )}
          <div ref={waveformContainerRef} className="absolute inset-0" />
        </div>

        <div className="w-full h-2 bg-gray-300 overflow-hidden rounded-none">
          <div
            className="h-full bg-red-500 transition-all duration-300 rounded-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex gap-4 flex-wrap justify-center mt-4">
          {showStartButton && (
            <button
              onClick={handleStart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              녹음 시작
            </button>
          )}
          {isRecording && isPaused && (
            <button
              onClick={handleResume}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              다시 시작
            </button>
          )}
          {isRecording && !isPaused && (
            <button
              onClick={handlePause}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              일시 정지
            </button>
          )}
          {isRecording && (
            <button
              onClick={handleStop}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              녹음 종료
            </button>
          )}
          {audioBlob && !isRecording && (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              녹음 제출
            </button>
          )}
        </div>
      </div>

      <FooterLogo />
    </div>
  );
}
