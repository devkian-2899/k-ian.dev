"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type SkillsInnerFlipCardProps = {
  code: ReactNode;
  ui: ReactNode;
};

const DESKTOP_MEDIA = "(min-width: 1024px)";
const FLIP_MS = 380;
const FADE_MS = 260;
const DOUBLE_TAP_MS = 320;
const TAP_MOVE_TOLERANCE_PX = 12;

function SkillsToggleCodeIcon() {
  return (
    <span aria-hidden="true" className="skills-inner-toggle-glyph">
      &lt;/&gt;
    </span>
  );
}

function SkillsToggleUiIcon() {
  return (
    <svg
      aria-hidden="true"
      className="skills-inner-toggle-icon"
      fill="none"
      height="17"
      viewBox="0 0 24 24"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        width="17"
        x="3.5"
        y="4.5"
      />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function SkillsToggleStack({ mode }: { mode: "code" | "ui" }) {
  return (
    <span className="skills-inner-toggle-stack">
      {mode === "code" ? <SkillsToggleCodeIcon /> : <SkillsToggleUiIcon />}
      <span className="skills-inner-toggle-label">{mode === "code" ? "Code" : "UI"}</span>
    </span>
  );
}

function isDesktopViewport() {
  return typeof window !== "undefined" && window.matchMedia(DESKTOP_MEDIA).matches;
}

/** Desktop: side toggles. Mobile/tablet: double-tap to flip UI/code; center hint after turn. */
export function SkillsInnerFlipCard({ ui, code }: SkillsInnerFlipCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [centerHintVisible, setCenterHintVisible] = useState(false);
  const flipTimerRef = useRef<number | undefined>(undefined);
  const lastTapRef = useRef(0);
  const tapStartRef = useRef<{ x: number; y: number } | null>(null);
  const tapMovedRef = useRef(false);
  const rotation = showCode ? -180 : 0;

  const clearFlipTimer = () => {
    if (flipTimerRef.current !== undefined) {
      window.clearTimeout(flipTimerRef.current);
      flipTimerRef.current = undefined;
    }
  };

  const revealCenterHint = useCallback(() => {
    clearFlipTimer();
    flipTimerRef.current = window.setTimeout(() => {
      if (!isDesktopViewport()) setCenterHintVisible(true);
    }, FLIP_MS);
  }, []);

  const goToView = useCallback(
    (nextShowCode: boolean) => {
      if (isDesktopViewport()) {
        setShowCode(nextShowCode);
        setCenterHintVisible(false);
        return;
      }

      setCenterHintVisible(false);
      clearFlipTimer();
      flipTimerRef.current = window.setTimeout(() => {
        setShowCode(nextShowCode);
        revealCenterHint();
      }, FADE_MS);
    },
    [revealCenterHint],
  );

  const handleMobileDoubleTap = () => {
    if (isDesktopViewport()) return;
    if (tapMovedRef.current) return;

    const now = Date.now();
    if (now - lastTapRef.current <= DOUBLE_TAP_MS) {
      lastTapRef.current = 0;
      goToView(!showCode);
      return;
    }

    lastTapRef.current = now;
  };

  const onInnerPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isDesktopViewport()) return;
    tapStartRef.current = { x: event.clientX, y: event.clientY };
    tapMovedRef.current = false;
  };

  const onInnerPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isDesktopViewport() || !tapStartRef.current) return;

    const deltaX = event.clientX - tapStartRef.current.x;
    const deltaY = event.clientY - tapStartRef.current.y;
    if (Math.hypot(deltaX, deltaY) > TAP_MOVE_TOLERANCE_PX) {
      tapMovedRef.current = true;
    }
  };

  const onInnerPointerUp = () => {
    tapStartRef.current = null;
  };

  useEffect(() => {
    if (isDesktopViewport()) return;
    const initial = window.setTimeout(() => setCenterHintVisible(true), FLIP_MS + 80);
    return () => {
      window.clearTimeout(initial);
      clearFlipTimer();
    };
  }, []);

  const nextHintMode: "code" | "ui" = showCode ? "ui" : "code";

  return (
    <div className="skills-inner-flip-wrap">
      {showCode ? (
        <button
          type="button"
          aria-label="Show UI"
          className="skills-inner-toggle skills-inner-toggle--left"
          onClick={() => goToView(false)}
        >
          <SkillsToggleStack mode="ui" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="Show code work"
          className="skills-inner-toggle skills-inner-toggle--right"
          onClick={() => goToView(true)}
        >
          <SkillsToggleStack mode="code" />
        </button>
      )}

      <div
        aria-label={
          showCode
            ? "Double-tap to show UI preview"
            : "Double-tap to show the backend code"
        }
        className="skills-inner-scene skills-inner-scene--mobile-tap"
        role="button"
        tabIndex={0}
        onClick={handleMobileDoubleTap}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goToView(!showCode);
          }
        }}
        onPointerCancel={onInnerPointerUp}
        onPointerDown={onInnerPointerDown}
        onPointerMove={onInnerPointerMove}
        onPointerUp={onInnerPointerUp}
      >
        <div
          className={`skills-inner-center-hint${
            centerHintVisible ? " skills-inner-center-hint--visible" : ""
          }`}
          aria-hidden="true"
        >
          <span className="skills-inner-center-hint-pill">
            <SkillsToggleStack mode={nextHintMode} />
          </span>
        </div>

        <div
          className="skills-inner-flip skills-inner-flip--transition"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <div className="skills-inner-face skills-inner-face--ui">{ui}</div>
          <div className="skills-inner-face skills-inner-face--code">{code}</div>
        </div>
      </div>
    </div>
  );
}
