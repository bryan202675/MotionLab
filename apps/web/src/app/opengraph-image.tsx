import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "MotionLab — Make it move";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 54,
        background: "#f4f2ec",
        color: "#101010",
        border: "18px solid #101010",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "monospace",
          fontSize: 18,
          letterSpacing: 2,
        }}
      >
        <span>MOTIONLAB®</span>
        <span>REACT MOTION COMPONENT LIBRARY</span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 30 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 146,
            fontWeight: 900,
            letterSpacing: -12,
            lineHeight: 0.77,
          }}
        >
          <span>MAKE IT</span>
          <span>MOVE.</span>
        </div>
        <div
          style={{
            width: 185,
            height: 112,
            marginBottom: 2,
            background: "#dfff00",
            border: "5px solid #101010",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          fontSize: 17,
          letterSpacing: 2,
        }}
      >
        <span>OPEN SOURCE / MIT / VOL. 001</span>
        <span>BUILT TO EXPERIMENT. READY TO SHIP.</span>
      </div>
    </div>,
    size,
  );
}
