export default function EmotionColorPalette() {
    const lightPalette = [
      { emotion: "공포", color: "#A0C4FF" },
      { emotion: "놀람", color: "#FFD6A5" },
      { emotion: "분노", color: "#FF6B6B" },
      { emotion: "슬픔", color: "#BBD0FF" },
      { emotion: "중립", color: "#EAEAEA" },
      { emotion: "행복", color: "#FDFFB6" },
      { emotion: "혐오", color: "#C5DCA0" },
    ];
  
    const darkPalette = [
      { emotion: "공포", color: "#264653" },
      { emotion: "놀람", color: "#A68A64" },
      { emotion: "분노", color: "#9B1D20" },
      { emotion: "슬픔", color: "#3A506B" },
      { emotion: "중립", color: "#6C757D" },
      { emotion: "행복", color: "#D4A373" },
      { emotion: "혐오", color: "#556B2F" },
    ];
  
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2">밝은 감정 팔레트</h2>
          <div className="flex gap-2">
            {lightPalette.map((item) => (
              <div
                key={item.emotion}
                title={item.emotion}
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>
  
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2">어두운 감정 팔레트</h2>
          <div className="flex gap-2">
            {darkPalette.map((item) => (
              <div
                key={item.emotion}
                title={item.emotion}
                className="w-8 h-8 rounded-md border"
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  