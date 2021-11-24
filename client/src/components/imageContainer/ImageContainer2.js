import React, { useEffect } from "react";
import classes from "./slidesCss.module.css"
import image1 from '../../assets/Images/IMG_1.jpg'
import image2 from '../../assets/Images/IMG_2.jpg'
import image3 from '../../assets/Images/IMG_3.jpg'


function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: state.slideIndex === 0 ? 7 - 1 : state.slideIndex - 1
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:(state.slideIndex + 1) % 7
        
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className={classes.slide}
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1
      }}
    >
    <div
        className={classes.slideBackground}
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      />
      <div
        className={classes.slideContent}
        style={{
          backgroundImage: `url('${slide.image}')`
        }}
      >
        <div className={classes.slideContentInner}>
          <h2 className={classes.slideTitle}>{slide.title}</h2>
          <h3 className={classes.slideSubtitle}>{slide.subtitle}</h3>
          <p className={classes.slideDescription}>{slide.description}</p>
        </div>
      </div>
    </div>
  );
}

const ImageContainer2 = (props) => {
  const {slides} = props;
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        dispatch({type: "NEXT"}),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [state.slideIndex]);
  return (
    <div style={{width: "100%",height: "80vh",display: 'flex',justifyContent:'center',alignItems: 'center',position:'relative',overflow:'hidden'}}>
    <div className={classes.slides}>
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
    </div>
    <div className={classes.ImageContainer_main_heading}>
        <span>{props.mainHeading}</span>
      </div>
    </div>
  );
}
export default ImageContainer2
