import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#a3ff12",
            fontSize: "132px",
            fontWeight: 900,
            fontFamily: "Arial, Helvetica, sans-serif",
            lineHeight: 1,
          }}
        >
          T
        </div>
      </div>
    ),
    {
      width: 180,
      height: 180,
    }
  );
}