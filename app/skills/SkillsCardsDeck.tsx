"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { SkillsDeckDesktopExpandProvider } from "./SkillsDeckDesktopExpandContext";

type SkillsCardsDeckProps = {
  cardOne: ReactNode;
  cardTwo: ReactNode;
};

const DESKTOP_MEDIA = "(min-width: 1024px)";
const SWIPE_COMMIT_PX = 56;
const ROTATION_SNAP_DEG = 90;

function clampRotation(degrees: number) {
  return Math.max(-180, Math.min(0, degrees));
}

/** Desktop: twin panes. Tablet/phone: back-to-back cards with swipe-driven flip. */
export function SkillsCardsDeck({ cardOne, cardTwo }: SkillsCardsDeckProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const draggingRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [ianDesktopExpanded, setIanDesktopExpanded] = useState(false);
  const indexRef = useRef(0);

  const toggleIanDesktopExpand = useCallback(() => {
    setIanDesktopExpanded((current) => !current);
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const finishDrag = useCallback((clientX: number, currentIndex: number) => {
    const width = sceneRef.current?.offsetWidth ?? 1;
    const deltaX = clientX - startXRef.current;
    const projected = clampRotation(startRotationRef.current + (-deltaX / width) * 180);

    let nextIndex = currentIndex;
    if (projected <= -ROTATION_SNAP_DEG) nextIndex = 1;
    else if (projected > -ROTATION_SNAP_DEG) nextIndex = 0;

    if (Math.abs(deltaX) >= SWIPE_COMMIT_PX) {
      if (deltaX < 0) nextIndex = 1;
      if (deltaX > 0) nextIndex = 0;
    }

    setTransitionOn(true);
    setIndex(nextIndex);
    setRotation(nextIndex === 0 ? 0 : -180);
    draggingRef.current = false;
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia(DESKTOP_MEDIA).matches) return;

    draggingRef.current = true;
    startXRef.current = event.clientX;
    startRotationRef.current = index === 0 ? 0 : -180;
    setTransitionOn(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || window.matchMedia(DESKTOP_MEDIA).matches) return;

    const width = sceneRef.current?.offsetWidth ?? 1;
    const deltaX = event.clientX - startXRef.current;
    setRotation(clampRotation(startRotationRef.current + (-deltaX / width) * 180));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    finishDrag(event.clientX, indexRef.current);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    finishDrag(event.clientX, indexRef.current);
  };

  const goTo = (nextIndex: 0 | 1) => {
    setTransitionOn(true);
    setIndex(nextIndex);
    setRotation(nextIndex === 0 ? 0 : -180);
  };

  return (
    <SkillsDeckDesktopExpandProvider expanded={ianDesktopExpanded} toggle={toggleIanDesktopExpand}>
      <div className={`skills-deck${ianDesktopExpanded ? " skills-deck--ian-expanded" : ""}`}>
        <div
          className={`skills-cards-layout skills-cards-layout--desktop${
            ianDesktopExpanded ? " skills-cards-layout--ian-expanded" : ""
          }`}
        >
          {cardOne}
          {ianDesktopExpanded ? null : (
            <>
              <div aria-hidden="true" className="skills-cards-divider" />
              {cardTwo}
            </>
          )}
        </div>

      <div className="skills-cards-flip">
        <div className="skills-flip-hints">
          <p className="skills-flip-hint">
            Swipe to see the differences
            <span className="skills-flip-dots" role="tablist" aria-label="Skill cards">
              <button
                type="button"
                role="tab"
                aria-selected={index === 0}
                className={`skills-flip-dot${index === 0 ? " skills-flip-dot--active" : ""}`}
                onClick={() => goTo(0)}
              >
                <span className="sr-only">Drivkian Development</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={index === 1}
                className={`skills-flip-dot${index === 1 ? " skills-flip-dot--active" : ""}`}
                onClick={() => goTo(1)}
              >
                <span className="sr-only">Other's Development</span>
              </button>
            </span>
          </p>
          <p className="skills-flip-hint skills-flip-hint--sub">
            Double tap to see the backend code
          </p>
        </div>

        <div
          ref={sceneRef}
          className="skills-flip-scene"
          onPointerCancel={onPointerCancel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div
            className={`skills-flip-inner${transitionOn ? " skills-flip-inner--transition" : ""}`}
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            <div className="skills-flip-face skills-flip-face--front">{cardOne}</div>
            <div className="skills-flip-face skills-flip-face--back">{cardTwo}</div>
          </div>
        </div>
      </div>
      </div>
    </SkillsDeckDesktopExpandProvider>
  );
}
