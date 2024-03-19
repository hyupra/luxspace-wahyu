import React, { useRef, useCallback, useLayoutEffect, useState } from "react";
import { addClass, removeClass } from "../../helpers/format/classNameModifier";

function Carousel({ children, refContainer }) {
  const refDragHandler = useRef(null);
  const [index, setIndex] = useState(0);
  const treshold = 100;
  const itemToShow = window.innerWidth < 767 ? 1 : 4;
  const DIRECTION_LEFT = "DIRECTION_LEFT";
  const DIRECTION_RIGHT = "DIRECTION_RIGHT";

  const posInitial = useRef();
  const posX1 = useRef();
  const posX2 = useRef();
  const posFinal = useRef();
  const isAllowShift = useRef(true);
  const cards = useRef();

  const cardCount = cards.current?.length || 0;
  const cardSize = cards.current?.[0].offsetWidth || 0;

  const fnShiftItem = useCallback(
    (direction) => {
      addClass(refDragHandler.current, "transition-all duration-200");

      if (isAllowShift.current) {
        if (direction === "DIRECTION_LEFT") {
          setIndex((prev) => prev + 1);
          refDragHandler.current.style.left = `${
            posInitial.current - cardSize
          }px`;
        } else if (direction === "DIRECTION_RIGHT") {
          setIndex((prev) => prev - 1);
          refDragHandler.current.style.left = `${
            posInitial.current + cardSize
          }px`;
        }
      }

      isAllowShift.current = false;
    },
    [cardSize]
  );

  const fnCheckIndex = useCallback(
    (e) => {
      if (e.propertyName === "left") {
        setTimeout(() => {
          removeClass(refDragHandler.current, "transition-all duration-200");
        });

        const isMobile = window.innerWidth < 767 ? 0 : -1;

        if (index <= 0) {
          refDragHandler.current.style.left = 0;
          setIndex(0);
        } else if (index >= cardCount - itemToShow) {
          refDragHandler.current.style.left = `${-(
            (cardCount - itemToShow + isMobile) *
            cardSize
          )}px`;
          setIndex(cardCount - itemToShow);
        } else if (index === cardCount || index === cardCount - 1) {
          refDragHandler.current.style.left = `${(cardCount - 1) * cardSize}px`;
          setIndex(cardCount - 1);
        }

        isAllowShift.current = true;
      }
    },
    [cardCount, cardSize, itemToShow, index]
  );

  const onClick = useCallback((e) => {
    e = e || window.event;
    !isAllowShift.current && e.preventDefault();
  }, []);

  const onDragMove = useCallback((event) => {
    event.preventDefault();
    const e = event || window.event;

    if (e.type === "touchmove") {
      posX2.current = posX1.current - e.touches[0].clientX;
      posX1.current = e.touches[0].clientX;
    } else {
      posX2.current = posX1.current - e.clientX;
      posX1.current = e.clientX;
    }

    refDragHandler.current.style.left = `${
      refDragHandler.current.offsetLeft - posX2.current
    }px`;
  }, []);

  const onDragEnd = useCallback(
    (event) => {
      event.preventDefault();
      const e = event || window.event;

      posFinal.current = refDragHandler.current.offsetLeft;

      if (posFinal.current - posInitial.current < -treshold) {
        fnShiftItem(DIRECTION_LEFT);
      } else if (posFinal.current - posInitial.current > treshold) {
        fnShiftItem(DIRECTION_RIGHT);
      } else {
        refDragHandler.current.style.left = `${posInitial.current}px`;
      }
      document.onmouseup = null;
      document.onmousemove = null;
    },
    [fnShiftItem]
  );

  const onDragStart = useCallback(
    (event) => {
      event.preventDefault();
      const e = event || window.event;

      posInitial.current = refDragHandler.current.offsetLeft;

      if (e.type === "touchstart") {
        posX1.current = e.touches[0].clientX;
      } else {
        posX1.current = e.clientX;
        document.onmouseup = onDragEnd;
        document.onmousemove = onDragMove;
      }
    },
    [onDragEnd, onDragMove]
  );

  const [containerClientRect, setContainerClientRect] = useState(null);

  useLayoutEffect(() => {
    const refForwardDragHandler = refDragHandler.current;

    const removeEventListeners = () => {
      refForwardDragHandler.removeEventListener("touchstart", onDragStart);
      refForwardDragHandler.removeEventListener("touchmove", onDragMove);
      refForwardDragHandler.removeEventListener("touchend", onDragEnd);
      refForwardDragHandler.removeEventListener("click", onClick);
      refForwardDragHandler.removeEventListener("transitionend", fnCheckIndex);
    };

    setContainerClientRect(refContainer.current.getBoundingClientRect());

    refForwardDragHandler.onmousedown = onDragStart;
    refForwardDragHandler.addEventListener("touchstart", onDragStart);
    refForwardDragHandler.addEventListener("touchmove", onDragMove);
    refForwardDragHandler.addEventListener("touchend", onDragEnd);
    refForwardDragHandler.addEventListener("click", onClick);
    refForwardDragHandler.addEventListener("transitionend", fnCheckIndex);

    return removeEventListeners;
  }, [onDragStart, onDragMove, onDragEnd, onClick, fnCheckIndex, refContainer]);

  useLayoutEffect(() => {
    if (refDragHandler.current) {
      cards.current = refDragHandler.current.getElementsByClassName("card");
    }
  }, []);

  return (
    <div
      ref={refDragHandler}
      className="flex -mx-4 flex-row relative"
      style={{
        paddingLeft: containerClientRect ? containerClientRect.left - 16 : 0,
      }}
    >
      {children}
    </div>
  );
}

export default Carousel;
