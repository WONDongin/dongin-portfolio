import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./style.css";
import ParticleCore from "./ParticleCore";
import CareerTimeline from "./CareerTimeline";
import { SignatureIntro, SkillDeck, ProjectStory } from "./ScrollStories";

gsap.registerPlugin(ScrollTrigger);
const projects = [
  {
    id: "crm",
    name: "DIHS CRM",
    category: "교육 상담 고객 관리",
    stack: "Java · Spring Boot · JPA · Next.js · MySQL",
    summary: "한 번의 상담 신청이,\n끊기지 않는 고객 이력으로.",
    description:
      "상담 신청부터 담당자 배정, 상담 기록과 수강 전환까지. 관리자와 상담사가 하나의 고객 흐름을 이어가는 웹 애플리케이션입니다.",
    role: "관리자 기능 · 인증·권한 · 조회 개선 · CI · 화면 리디자인",
    repo: "https://github.com/WONDongin/project-crm",
    videoUrl: "", // 유튜브 시연 영상 URL을 입력하세요.
    flow: ["상담 신청", "담당자 배정", "상담 기록", "수강 전환"],
    technical: [
      [
        "현재 담당자까지 확인하는 권한",
        "JWT·HttpOnly Cookie 인증과 역할 검증에 더해, 현재 담당 고객과 기록 작성자를 서버에서 확인합니다.",
      ],
      [
        "고객과 상담 이력의 분리",
        "Customer는 현재 상태를, ActivityLog는 누적 이력을 관리합니다. 재신청도 기존 고객의 이력으로 연결합니다.",
      ],
      [
        "조회와 검증을 함께 개선",
        "서버 페이징과 @EntityGraph로 목록을 조회하고, GitHub Actions로 백엔드·프론트 검증을 자동화했습니다.",
      ],
    ],
    proof: "담당자가 바뀌어도, 권한은 현재 상태를 기준으로.",
    images: [
      ["/images/crm-current.webp", "DIHS CRM 고객 관리 화면"],
      ["/images/crm-before.webp", "DIHS CRM 리디자인 이전 고객 관리 화면"],
    ],
  },
  {
    id: "zipbob",
    name: "집밥PICK",
    category: "메뉴 추천·레시피 탐색 앱",
    stack: "Java · Spring Boot · JPA · PostgreSQL · Flutter · Dart",
    summary: "오늘 뭐 먹지?\n고민을 한 끼로 바꾸는 앱.",
    description:
      "자취생의 메뉴 고민을 줄이는 레시피 탐색 앱입니다. 조건에 맞는 메뉴를 찾고, 레시피를 확인하고, 마음에 드는 메뉴를 저장합니다.",
    role: "회원 인증·개인 기록 API · 관리자 기능 · Flutter 화면·API 연동 · 테스트·CI",
    repo: "https://github.com/WONDongin/zipbob_app",
    videoUrl: "", // 유튜브 시연 영상 URL을 입력하세요.
    liveUrl: "https://zipbob-web.vercel.app",
    flow: ["조건 선택", "메뉴 추천", "레시피 확인", "즐겨찾기"],
    technical: [
      [
        "인증부터 회원 데이터까지",
        "JWT 로그인과 Refresh Token 갱신·폐기, 목적별 이메일 인증을 구현했습니다. 즐겨찾기와 최근 본 레시피는 로그인한 회원을 기준으로 조회·관리합니다.",
      ],
      [
        "메뉴 운영을 위한 관리자 기능",
        "메뉴 등록·수정과 이미지 업로드·교체, 공통코드 관리 및 통계 대시보드를 구현했습니다. Flutter 주요 화면을 API와 연결하고 회원 데이터 갱신을 처리했습니다.",
      ],
      [
        "앱 연동과 테스트로 예외 상황까지 확인",
        "동시 요청 시 토큰 재발급 중복을 방지하고, 주요 기능의 단위·통합 테스트를 작성했습니다. GitHub Actions로 빌드와 PostgreSQL 통합 테스트를 자동화했습니다.",
      ],
    ],
    proof: "회원 인증부터 개인 기록과 메뉴 운영까지 이어지는 서비스.",
    images: [],
  },
  {
    id: "youth",
    name: "지방청년",
    category: "청년 지역 정착 지원 플랫폼",
    stack: "Java · Spring Boot · QueryDSL · Next.js · MariaDB",
    summary: "멘토의 활동이,\n다음 등급으로 이어지도록.",
    description:
      "정책 탐색과 지역 커뮤니티, 멘토링을 연결하는 웹 플랫폼입니다. 멘토 관리와 운영 자동화, 관리자 기능 및 인증을 담당했습니다.",
    role: "멘토 관리·자동 승급 · 관리자 운영 · OAuth2·JWT 인증",
    repo: "https://github.com/WONDongin/project-jibangyoung-groupware",
    videoUrl: "https://youtu.be/9anicZNei0s?si=rW8naLL1Td8l-qot",
    flow: ["멘토 신청", "관리자 승인", "활동 누적", "자동 승급"],
    technical: [
      [
        "역할과 등급을 따로 설계",
        "멘토 승인에 따른 역할 변경과, 활동 점수에 따른 등급 승급을 분리했습니다.",
      ],
      [
        "반복되는 운영 작업 자동화",
        "활동 로그의 점수를 집계하고 @Scheduled로 승급 조건을 확인해 등급을 반영합니다.",
      ],
      [
        "운영 기능과 변경 이력",
        "QueryDSL 검색·페이징, 신고·정책·사용자 관리와 주요 관리자 행위의 Audit 로그를 구현했습니다.",
      ],
    ],
    proof: "관리자의 반복 확인을, 활동 로그와 스케줄러로.",
    images: [
      ["/images/youth-main.webp", "지방청년 관리자 사용자 관리 화면"],
      ["/images/youth-mentor.webp", "지방청년 관리자 신고 관리 화면"],
    ],
  },
];

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
function ImageViewer({ image, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (image) {
      dialog.current.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);
  if (!image) return null;
  return (
    <dialog
      ref={dialog}
      className="viewer"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      aria-label={image[1]}
    >
      <button className="viewer-close" onClick={onClose}>
        닫기 ×
      </button>
      <img src={image[0]} alt={image[1]} />
      <p>{image[1]}</p>
    </dialog>
  );
}
const roleItems = {
  crm: [
    ["관리자 기능", "사용자 관리 · 담당자 배정 · 대시보드"],
    ["인증·권한", "JWT · HttpOnly Cookie · 역할 검증"],
    ["조회 개선·CI", "서버 페이징 · 연관 조회 · 자동 검증"],
    ["화면 리디자인", "관리자·상담사 공통 레이아웃"],
  ],
  zipbob: [
    ["회원 인증", "JWT · Refresh Token · 이메일 인증"],
    ["회원 데이터", "즐겨찾기 · 최근 본 레시피 · 회원별 접근 제어"],
    ["관리자 기능", "메뉴·이미지·공통코드 관리 · 통계 대시보드"],
    ["앱 연동·자동 검증", "Flutter 주요 화면 · API 연동 · 테스트·CI"],
  ],
  youth: [
    ["멘토 관리", "신청 · 승인 · 활동 · 자동 승급"],
    ["관리자 운영", "사용자 · 신고 · 정책 관리"],
    ["인증·권한", "OAuth2 · JWT · 역할 분리"],
    ["조회·이력", "QueryDSL · 페이징 · Audit 로그"],
  ],
};
function RoleIcon({ index }) {
  const paths = [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M20 8v6 M17 11h6",
    "M12 3l8 4v6c0 5-8 9-8 9s-8-4-8-9V7z M8 12l3 3 5-6",
    "M4 6c0-4 16-4 16 0s-16 4-16 0v12c0 4 16 4 16 0V6 M4 12c0 4 16 4 16 0",
    "M3 3h18v14H3z M8 21h8 M12 17v4",
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d={paths[index % 4]} />
    </svg>
  );
}
function ProjectCards({ project: p }) {
  const ref = useRef(null);
  useEffect(() => {
    const items = ref.current.querySelectorAll(".airy-item");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("entered");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    items.forEach((e) => {
      e.classList.add("animate");
      observer.observe(e);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <section
      className="airy-details frame"
      ref={ref}
      aria-label={p.name + " 구현 상세"}
    >
      <header className="airy-heading">
        <h4>직접 만든 부분들</h4>
        <span>
          {p.name} / {p.id === "youth" ? "4" : "2"}인 협업
        </span>
      </header>
      <div className="airy-row">
        <h5>
          <small>01</small>담당 역할
        </h5>
        <div className="airy-roles">
          {roleItems[p.id].map(([title, body], i) => (
            <div
              className="airy-item"
              key={title}
              style={{ "--delay": i * 80 + "ms" }}
            >
              <RoleIcon index={i} />
              <h6>{title}</h6>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="airy-row">
        <h5>
          <small>02</small>구현 상세
        </h5>
        <div className="airy-implementation">
          {p.technical.map(([title, body], i) => (
            <div
              className="airy-item"
              key={title}
              style={{ "--delay": i * 80 + "ms" }}
            >
              <span className="airy-index">0{i + 1} —</span>
              <h6>{title}</h6>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="airy-destination airy-item">
        <h5>
          <small>03</small>프로젝트 바로가기
        </h5>
        <div>
          <h6>{p.name}</h6>
          <span className="deploy-status">
            {p.id === "zipbob" ? (
              <>
                서비스 운영 중
                <br />
                프론트 Vercel · 백엔드 Render · DB Neon · 메일 Brevo
              </>
            ) : (
              "유튜브를 통해 주요 기능 시연 영상을 확인하세요."
            )}
          </span>
        </div>
        <div className="destination-actions">
          {p.id !== "zipbob" &&
            (p.videoUrl ? (
              <ExternalLink href={p.videoUrl}>시연 영상 ↗</ExternalLink>
            ) : (
              <button type="button" disabled title="시연 영상 준비 중">
                시연 영상 ↗
              </button>
            ))}
          {p.id === "zipbob" && p.liveUrl && (
            <ExternalLink href={p.liveUrl}>라이브 서비스 ↗</ExternalLink>
          )}
          <ExternalLink href={p.repo}>GitHub ↗</ExternalLink>
        </div>
      </div>
    </section>
  );
}
function SoftCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const move = (e) => {
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      el.classList.add("visible");
      document.documentElement.classList.add("custom-cursor");
      el.classList.toggle("hovering", !!e.target.closest("a,button,summary"));
    };
    const hide = () => {
      el.classList.remove("visible");
      document.documentElement.classList.remove("custom-cursor");
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      hide();
    };
  }, []);
  return (
    <div ref={ref} className="soft-cursor" aria-hidden="true">
      <i />
    </div>
  );
}
function App() {
  const app = useRef(null),
    [image, setImage] = useState(null),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-title > span", {
          y: 70,
          opacity: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: "power4.out",
          clearProps: "opacity",
        });
        gsap.from(".hero-meta > *", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.25,
          clearProps: "all",
        });
        gsap.from(".hero-core canvas", {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          clearProps: "opacity",
        });
        const desktop = window.matchMedia("(min-width: 701px)").matches;
        if (desktop) {
          const story = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          story
            .to(
              ".hero-word-left",
              {
                x: () => -window.innerWidth * 0.18,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
              },
              0,
            )
            .to(
              ".hero-word-right",
              {
                x: () => window.innerWidth * 0.18,
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
              },
              0,
            )
            .to(".hero-core", { scale: 1.8, duration: 1.5, ease: "none" }, 0)
            .to(
              ".hero-core",
              { filter: "blur(7px)", opacity: 0.32, duration: 0.55 },
              0.5,
            )
            .fromTo(
              ".hero-message",
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
              0.65,
            )
            .to(".hero-meta", { opacity: 0, y: 24, duration: 0.4 }, 0.7);
        }
        gsap.utils.toArray(".reveal").forEach((el) =>
          gsap.from(el, {
            y: 38,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            clearProps: "all",
          }),
        );
        gsap.utils.toArray(".image-main img").forEach((el) =>
          gsap.fromTo(
            el,
            { scale: 1.035 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
      }, app);
      return () => ctx.revert();
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);
  return (
    <div ref={app}>
      <SignatureIntro />
      <SoftCursor />
      <a className="skip" href="#work">
        프로젝트로 건너뛰기
      </a>
      <header className="site-header frame">
        <a href="#top" className="brand" aria-label="원동인 홈">
          Dongin<span className="brand-period">.</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "닫기" : "메뉴"}
        </button>
        <nav
          id="navigation"
          className={menu ? "is-open" : ""}
          aria-label="주 메뉴"
        >
          <a href="#work" onClick={() => setMenu(false)}>
            프로젝트
          </a>
          <a href="#about" onClick={() => setMenu(false)}>
            소개
          </a>
          <a href="#contact" onClick={() => setMenu(false)}>
            연락
          </a>
          <ExternalLink href="https://github.com/WONDongin">
            GitHub
          </ExternalLink>
        </nav>
      </header>
      <main>
        <section id="top" className="hero frame" aria-labelledby="hero-title">
          <div className="hero-core">
            <ParticleCore />
          </div>
          <div className="hero-stage">
            <h1
              id="hero-title"
              className="hero-title sr-only"
              aria-label="Backend developer"
            >
              <span className="hero-word-left">BACK</span>
              <span className="hero-word-right">END.</span>
            </h1>
            <div className="hero-message">
              <h2>
                화면 너머,
                <br />
                서버까지
              </h2>
              <p>
                사용자의 요청이 데이터에 닿기까지,
                <br />그 사이의 흐름을 설계합니다.
              </p>
            </div>
          </div>
          <div className="hero-meta">
            <div>
              <p className="identity">
                원동인 <span>Java & Spring Boot 백엔드 개발자</span>
              </p>
              <p className="hero-description">
                웹 퍼블리싱 실무에서 출발해, 사용자 화면과 서버의 데이터 흐름을
                함께 이해하며 개발합니다.
              </p>
            </div>
          </div>
        </section>
        <SkillDeck />
        <section id="work" className="work" aria-labelledby="work-title">
          <div className="work-heading frame">
            <div className="code-art" aria-hidden="true">
              <span>{"{"}</span>
              <div className="code-sheet sheet-one">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="code-sheet sheet-two">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span>{"}"}</span>
            </div>
            <span className="work-eyebrow reveal">PROJECT ARCHIVE / 2026</span>
            <h2 id="work-title" className="reveal">
              Selected
              <br />
              <em>work</em>
            </h2>
            <p className="reveal">
              사용자의 흐름을 만들고,
              <br />그 뒤의 로직을 설계했습니다.
            </p>
          </div>
          <div className="work-tools frame">
            <nav aria-label="프로젝트 바로가기" className="project-nav">
              {projects.map((p) => (
                <a href={"#" + p.id} key={p.id}>
                  {p.name}
                </a>
              ))}
            </nav>
          </div>
          {projects.map((p, index) => {
            return (
              <article
                id={p.id}
                className={"project project-" + p.id}
                key={p.id}
                aria-labelledby={p.id + "-title"}
              >
                <div className="project-heading frame">
                  <span className="chapter-number reveal">
                    0{index + 1}
                    <small> / PROJECT</small>
                  </span>
                  <h3 className="reveal" id={p.id + "-title"}>
                    {p.name}
                  </h3>
                  <div className="reveal">
                    <p>{p.category}</p>
                    <p className="stack">{p.stack}</p>
                  </div>
                  <ExternalLink href={p.repo} className="source-link reveal">
                    소스 보기{" "}
                    <span className="sr-only">{p.name} GitHub 새 창</span>
                  </ExternalLink>
                </div>
                <ProjectStory project={p} />
                <ProjectCards project={p} onImage={setImage} />
              </article>
            );
          })}
        </section>
        <CareerTimeline />
        <section
          id="contact"
          className="contact frame"
          aria-labelledby="contact-title"
        >
          <div className="contact-top reveal">
            <a href="#top">맨 위로 ↑</a>
          </div>
          <div className="contact-layout">
            <div className="contact-intro reveal">
              <h2 id="contact-title">
                만들고,
                <br />
                기록하고, 계속 나아갑니다.
              </h2>
              <p>
                화면을 이해하고 서버를 만드는 개발자.
                <br />
                구현한 코드와 고민한 과정은 GitHub와 블로그에 담았습니다.
              </p>
              <div className="contact-signature contact-info">
                <a href="tel:01052418860">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  010-5241-8860
                </a>

                <a href="mailto:dev.doding@gmail.com">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  dev.doding@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-destinations">
              <ExternalLink
                href="https://github.com/WONDongin"
                className="destination reveal"
              >
                <div>
                  <small>CODE & PROJECTS</small>
                  <h3>GitHub</h3>
                  <p>프로젝트 소스와 구현 과정</p>
                </div>
                <span aria-hidden="true">↗</span>
              </ExternalLink>
              <ExternalLink
                href="https://dongin97.tistory.com/"
                className="destination reveal"
              >
                <div>
                  <small>BLOG & LEARNING</small>
                  <h3>Coding Dongin</h3>
                  <p>개발하며 마주한 문제와 해결 기록</p>
                </div>
                <span aria-hidden="true">↗</span>
              </ExternalLink>
              <ExternalLink
                href="https://www.youtube.com/@Dongin_Dev"
                className="destination reveal"
              >
                <div>
                  <small>VIDEOS & DEMOS</small>
                  <h3>Dongin Dev</h3>
                  <p>직접 만든 프로젝트의 주요 기능 시연</p>
                </div>
                <span aria-hidden="true">↗</span>
              </ExternalLink>
            </div>
          </div>
          <footer>
            <a className="footer-wordmark" href="#top">
              Dongin.
            </a>
            <p>화면 너머, 서버까지</p>
            <span>PORTFOLIO / 2026</span>
          </footer>
        </section>
      </main>
      <ImageViewer image={image} onClose={() => setImage(null)} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
