"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const DEVKIAN_MAIN_ICON = "/images/Icon.png";

type SkillsInnerFlipCardProps = {
  code: ReactNode;
  onShowCodeChange: (showCode: boolean) => void;
  showCode: boolean;
  side: "ian" | "other";
  ui: ReactNode;
};

const DESKTOP_MEDIA = "(min-width: 1024px)";
const FLIP_MS = 380;
const FADE_MS = 260;
const DOUBLE_TAP_MS = 320;
const TAP_MOVE_TOLERANCE_PX = 12;
const HINT_HOLD_MS = 2000;
const HINT_POP_OUT_MS = 280;

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

/** Mobile center overlay after flip — reflects current face (UI vs Code). */
function SkillsMobileFlipHint({
  side,
  view,
}: {
  side: "ian" | "other";
  view: "code" | "ui";
}) {
  if (view === "ui") {
    return (
      <span className="skills-inner-toggle-stack">
        <SkillsToggleUiIcon />
        <span className="skills-inner-toggle-label">UI</span>
      </span>
    );
  }

  if (side === "ian") {
    return (
      <span className="skills-inner-toggle-stack">
        <Image
          alt=""
          aria-hidden
          className="skills-inner-center-main-icon"
          height={20}
          src={DEVKIAN_MAIN_ICON}
          width={20}
        />
        <span className="skills-inner-toggle-label">Code</span>
      </span>
    );
  }

  return (
    <span className="skills-inner-toggle-stack">
      <SkillsToggleCodeIcon />
      <span className="skills-inner-toggle-label">Code</span>
    </span>
  );
}

function isDesktopViewport() {
  return typeof window !== "undefined" && window.matchMedia(DESKTOP_MEDIA).matches;
}

/** Desktop: side toggles. Mobile/tablet: double-tap to flip UI/code; center hint after turn. */
type CenterHintPhase = "hidden" | "show" | "hide";

export function SkillsInnerFlipCard({
  side,
  ui,
  code,
  showCode,
  onShowCodeChange,
}: SkillsInnerFlipCardProps) {
  const [hintPhase, setHintPhase] = useState<CenterHintPhase>("hidden");
  const flipTimerRef = useRef<number | undefined>(undefined);
  const hintHoldTimerRef = useRef<number | undefined>(undefined);
  const hintOutTimerRef = useRef<number | undefined>(undefined);
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

  const clearHintTimers = () => {
    if (hintHoldTimerRef.current !== undefined) {
      window.clearTimeout(hintHoldTimerRef.current);
      hintHoldTimerRef.current = undefined;
    }
    if (hintOutTimerRef.current !== undefined) {
      window.clearTimeout(hintOutTimerRef.current);
      hintOutTimerRef.current = undefined;
    }
  };

  const hideCenterHint = useCallback(() => {
    clearHintTimers();
    setHintPhase("hidden");
  }, []);

  const scheduleHintPopOut = useCallback(() => {
    clearHintTimers();
    hintHoldTimerRef.current = window.setTimeout(() => {
      setHintPhase("hide");
      hintOutTimerRef.current = window.setTimeout(() => {
        setHintPhase("hidden");
      }, HINT_POP_OUT_MS);
    }, HINT_HOLD_MS);
  }, []);

  const revealCenterHint = useCallback(() => {
    if (isDesktopViewport()) return;

    clearFlipTimer();
    clearHintTimers();
    flipTimerRef.current = window.setTimeout(() => {
      if (!isDesktopViewport()) {
        setHintPhase("show");
        scheduleHintPopOut();
      }
    }, FLIP_MS);
  }, [scheduleHintPopOut]);

  const goToView = useCallback(
    (nextShowCode: boolean) => {
      if (isDesktopViewport()) {
        onShowCodeChange(nextShowCode);
        hideCenterHint();
        return;
      }

      hideCenterHint();
      clearFlipTimer();
      flipTimerRef.current = window.setTimeout(() => {
        onShowCodeChange(nextShowCode);
        revealCenterHint();
      }, FADE_MS);
    },
    [hideCenterHint, onShowCodeChange, revealCenterHint],
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

    const initial = window.setTimeout(() => {
      setHintPhase("show");
      scheduleHintPopOut();
    }, FLIP_MS + 80);

    return () => {
      window.clearTimeout(initial);
      clearFlipTimer();
      clearHintTimers();
    };
  }, [scheduleHintPopOut]);

  const mobileHintView: "code" | "ui" = showCode ? "code" : "ui";

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
            hintPhase === "show"
              ? " skills-inner-center-hint--show"
              : hintPhase === "hide"
                ? " skills-inner-center-hint--hide"
                : ""
          }`}
          aria-hidden="true"
        >
          <span className="skills-inner-center-hint-pill">
            <SkillsMobileFlipHint side={side} view={mobileHintView} />
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
