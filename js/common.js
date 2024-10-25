// 헤더와 푸터 로드
async function loadContent(headerUrl, footerUrl) {
  try {
    const headerResponse = await fetch(headerUrl);
    const headerData = await headerResponse.text();
    document.getElementById('header').innerHTML = headerData;

    const footerResponse = await fetch(footerUrl);
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;

    initializeDarkModeToggle();
    initializeGSAPAnimations();
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// 다크 모드 토글 초기화
function initializeDarkModeToggle() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const toggleKnob = document.querySelector('.toggle-knob');
  const body = document.body;
  const logo = document.getElementById('logo');

  // 로고 이미지 경로 설정
  const lightLogo = 'img/light-logo.png';  // 라이트 모드 로고 이미지 경로
  const darkLogo = 'img/dark-logo.png';    // 다크 모드 로고 이미지 경로

  toggleSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleSwitch.classList.toggle('dark');
    toggleKnob.classList.toggle('dark');

    // 다크모드일 때 로고 변경
    if (body.classList.contains('dark-mode')) {
      logo.src = darkLogo;
    } else {
      logo.src = lightLogo;
    }
  });
}

// GSAP 애니메이션 초기화
function initializeGSAPAnimations() {
  // gsap
  gsap.registerPlugin(ScrollTrigger);

  // GSAP Nav 애니메이션
  const showNav = gsap.from("#parallax-nav", {
    yPercent: -200,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: "99999",
    onUpdate: (self) => {
      console.log("Scroll direction:", self.direction);  // 스크롤 방향 감지 로그
      self.direction === -1 ? showNav.play() : showNav.reverse();
    }
  });

  // GSAP 인트로 애니메이션
  gsap.to(".cover", {
    top: "-100%",
    // duration: 1,
    scrollTrigger: {
      trigger: '#intro',
      start: "0% 0%",
      end: "50% 0%",
      scrub: 1,
      markers: false,
    },
  });

  // GSAP 글자 스크롤 애니메이션
  const ani7 = gsap.timeline({
    scrollTrigger: {
      trigger: "#text-ani",
      start: "top top",
      end: "+=6000",
      scrub: 0.5,
      pin: true,
      markers: false,
      anticipatePin: 1
    }
  });

  // 각 텍스트가 순차적으로 나타나고 이전 텍스트는 사라지도록 설정
  ani7.fromTo("#text-ani .t1", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 })
      .fromTo("#text-ani .t1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t2", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t3", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t3", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t4", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t4", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t5", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t5", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t6", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t6", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1")
      .fromTo("#text-ani .t7", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5")
      .fromTo("#text-ani .t7", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 }, "+=1");

  // GSAP 배경 퍼지기 애니메이션
  gsap.to(".box1", {
    scale: 100,
    borderRadius: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.bg1',
      start: "0% 40%",
      end: "100% 80%",
      scrub: 1,
      markers: false,
    }
  });

  // GSAP 세로/가로 스크롤
  const horizontal = document.querySelector("#horizontal");
  const sections = gsap.utils.toArray("#horizontal > section");

  // 각 섹션의 가로 길이에 맞게 애니메이션 설정
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1), // 섹션의 수에 따라 -100% 이동
    ease: "none",
    scrollTrigger: {
      trigger: horizontal,
      start: "top top",
      end: () => "+=" + horizontal.scrollWidth,  // 전체 스크롤 가로 길이 계산
      pin: true,
      scrub: 1.5,
      // snap: {
      //   snapTo: 1 / (sections.length - 1),
      //   inertia: true,
      //   duration: { min: 0.2, max: 0.5 },
      //   ease: "power1.inOut"
      // },
      invalidateOnRefresh: true,
      anticipatePin: 1
    }
  });
}

// 텍스트 애니메이션
function animateText(str, targetId, shuffleId) {
  const target = document.getElementById(targetId);
  const shuffle = document.getElementById(shuffleId);
  const chars = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ123456789@$%&*^!?#()';
  let index = 0;

  const interval = setInterval(() => {
    if (index < str.length) {
      target.appendChild(document.createTextNode(str[index]));
      shuffle.textContent = chars[Math.floor(Math.random() * chars.length)];
      index++;
    } else {
      clearInterval(interval);
      shuffle.textContent = ''; // 남아 있는 랜덤 문자 제거
    }
  }, 50);
  
  target.textContent = '';  // 초기화
}


