const mainCtr = document.getElementById("main-ctr");
const hello = document.getElementsByClassName("hello");
const error = document.getElementsByClassName("error");
const eyeLeft = document.getElementById("eye-left");
const eyeRight = document.getElementById("eye-right");
const eyeToLeft = document.getElementById("eye-to-left");
const eyeToRight = document.getElementById("eye-to-right");
const smileUp = document.getElementById("smile-up");
const smileDown = document.getElementById("smile-down");
const smile = document.getElementById("smile");
const cross1 = document.getElementById("cross1");
const cross2 = document.getElementById("cross2");

const socket = io("http://192.168.1.11:3000");

socket.on("connect", () => {
  console.log(socket.connected); // true
  socket.send("Hello!");
});

socket.on("signal", (msg) => {
  console.log(msg);
  if (msg === "false") {
    noMask();
  } else if (msg === "true") {
    onMask();
  }
});

var tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 0.3,
  delay: 0.3,
});

tl.to(mainCtr, 0.3, {
  opacity: 1,
});

const onMask = () => {
  gsap.set([mainCtr, hello], {
    opacity: 0,
  });

  tl.to(mainCtr, 0.3, {
    opacity: 1,
  })
    .to(smileDown, 0.3, {
      morphSVG: "#smile-up",
    })
    .to(smile, 0.3, {
      rotation: -30,
      transformOrigin: "center center",
      ease: Circ.ease,
    })
    .to(smile, 0.9, {
      rotation: 900,
      transformOrigin: "center center",
      ease: Circ.easeInOut,
    })
    .to(
      eyeLeft,
      0.3,
      {
        morphSVG: "#eye-to-left",
        ease: Power2.ease,
      },
      "-=.3"
    )
    .to(
      eyeRight,
      0.3,
      {
        morphSVG: "#eye-to-right",
        ease: Power2.ease,
      },
      "-=.3"
    )
    .to(eyeRight, 0.1, {
      scaleY: 0.25,
      transformOrigin: "center center",
    })
    .to(eyeRight, 0.1, {
      scaleY: 1,
    })
    .to(
      hello,
      0.3,
      {
        opacity: 1,
      },
      "-=.3"
    )
    .to(mainCtr, 0.6, {
      delay: 1,
      opacity: 0,
    });
};

const noMask = () => {
  gsap.set([mainCtr, hello], {
    opacity: 0,
  });

  tl.to(mainCtr, 0.3, {
    opacity: 1,
  })
    .to(smileDown, 0.3, {
      morphSVG: "#smile-up",
    })
    .to(smile, 0.3, {
      rotation: -30,
      transformOrigin: "center center",
      ease: Circ.ease,
    })
    .to(smile, 0.9, {
      rotation: 900,
      transformOrigin: "center center",
      ease: Circ.easeInOut,
    })
    .to(smile, 0.3, {
      opacity: 0,
    })
    .to(
      eyeLeft,
      0.3,
      {
        morphSVG: "#cross-1",
        ease: Power2.ease,
      },
      "-=.3"
    )
    .to(
      eyeRight,
      0.3,
      {
        morphSVG: "#cross-2",
        ease: Power2.ease,
      },
      "-=.3"
    )
    .to(
      error,
      0.3,
      {
        opacity: 1,
      },
      "-=.3"
    )
    .to(mainCtr, 0.6, {
      delay: 1,
      opacity: 0,
    });
};

const searching = () => {
  tl.to(mainCtr, 0.3, {
    opacity: 1,
  }).to(smileDown, 3, {
    scaleX: 1,
  });
};

noMask();
