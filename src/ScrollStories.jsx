import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SignatureIntro() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("dongin-intro");
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!visible) return;
    const finish = () => {
      setVisible(false);
      try {
        sessionStorage.setItem("dongin-intro", "1");
      } catch {}
    };
    const timer = setTimeout(
      finish,
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2400,
    );
    return () => clearTimeout(timer);
  }, [visible]);
  return visible ? (
    <div className="signature-intro" aria-label="Dongin 포트폴리오 인트로">
      <span>CRAFTED BY</span>
      <svg viewBox="0 0 540 180" role="img" aria-label="Dongin 서명">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            pathLength="1"
            d="M60 130 Q86 62 91 36 M50 63 C142 -4 174 100 74 135 C39 149 42 126 71 117 M155 104 C186 64 197 112 174 126 C146 143 151 109 175 101 M191 123 L207 89 L197 124 C230 75 241 94 225 120 Q224 134 247 112 M279 95 C254 82 241 126 260 126 Q278 128 285 95 L270 151 C251 195 226 163 269 144 L303 115 M315 92 L302 119 Q302 137 328 112 M321 75 L322 73 M333 124 L348 91 L339 123 C369 78 382 96 367 120 Q365 139 403 110"
          />
          <path
            className="signature-line"
            pathLength="1"
            d="M91 153 Q268 122 451 140 L399 151"
          />
        </g>
      </svg>
      <p>화면 너머, 서버까지.</p>
      <button
        onClick={() => {
          setVisible(false);
          try {
            sessionStorage.setItem("dongin-intro", "1");
          } catch {}
        }}
      >
        건너뛰기 ↗
      </button>
    </div>
  ) : null;
}
const skills = [
  [
    "01",
    "Backend",
    "Java / Spring Boot",
    "서비스의 규칙을 코드로",
    "REST API · 서비스 로직",
    "{ }",
  ],
  [
    "02",
    "Data",
    "JPA / QueryDSL",
    "데이터 조회와 변경을 일관되게",
    "MySQL · PostgreSQL · MariaDB",
    "≋",
  ],
  [
    "03",
    "Security",
    "JWT / OAuth2",
    "로그인부터 접근 권한 검증까지",
    "Spring Security · HttpOnly Cookie · RBAC",
    "⌘",
  ],
  [
    "04",
    "Frontend",
    "Flutter / React",
    "화면과 API를 연결합니다",
    "Dart · JavaScript · API 연동",
    "↗",
  ],
]; // taste-skill-ignore: reference-directed numbered tickets and functional sample interface indicators.
export function SkillDeck() {
  const ref = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(
        () =>
          gsap.fromTo(
            ".skill-ticket",
            {
              y: 120,
              rotateY: -35,
              rotateZ: (i) => (i - 1.5) * 9,
              opacity: 0.35,
            },
            {
              y: 0,
              rotateY: 0,
              rotateZ: (i) => (i - 1.5) * 3,
              opacity: 1,
              stagger: 0.12,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                end: "center 55%",
                scrub: 1,
              },
            },
          ),
        ref,
      );
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="skill-section frame" ref={ref}>
      <div className="skill-heading">
        <span>TOOLS INTO EXPERIENCES</span>
        <h2>
          기술은,
          <br />
          경험을 만들기 위해
        </h2>
        <p>
          직접 구현한 흐름을 바탕으로
          <br />
          사용하는 기술을 소개합니다.
        </p>
      </div>
      <div className="skill-deck">
        {skills.map(([n, title, stack, desc, sub, mark]) => (
          <div className={"skill-ticket ticket-" + n} key={n}>
            <span className="ticket-number">{n} / 04</span>
            <h3>{title}</h3>
            <div className="ticket-symbol" aria-hidden="true">
              {mark}
            </div>
            <strong>{stack}</strong>
            <div className="ticket-stub">
              <p>{desc}</p>
              <small>{sub}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const scenes = {
  crm: [
    [
      "01 / REQUEST",
      "신청 한 번으로,\n상담의 시작을 기록",
      "신규 상담을 접수하고 고객 정보와 상담 이력을 연결합니다.",
      "Customer · ActivityLog",
      "신청 접수",
    ],
    [
      "02 / ASSIGN",
      "담당자가 바뀌면,\n권한도 함께 바뀌도록",
      "관리자가 담당자를 배정하고 서버는 현재 담당 고객인지 검증합니다.",
      "JWT · HttpOnly · RBAC",
      "담당자 배정",
    ],
    [
      "03 / HISTORY",
      "한 번의 상담이 아닌,\n이어지는 고객 이력",
      "상담 결과와 다음 행동을 기록하고 고객 상태를 함께 관리합니다.",
      "JPA · 서버 페이징 · CI",
      "상담 기록",
    ],
  ],
  zipbob: [
    [
      "01 / DISCOVER",
      "오늘의 고민,\n조건으로 좁혀보기",
      "시간과 취향에 맞는 메뉴를 찾는 화면을 API와 연결했습니다.",
      "Flutter · Dart · API 연동",
      "메뉴 탐색",
    ],
    [
      "02 / RECIPE",
      "메뉴를 고르면,\n바로 요리할 수 있게",
      "메뉴 ID로 상세 데이터를 조회하고 재료와 조리 순서를 보여줍니다.",
      "JSON → Dart 모델 → 화면",
      "레시피 확인",
    ],
    [
      "03 / SAVE",
      "마음에 든 한 끼는,\n나만의 기록으로",
      "로그인 상태에 따라 즐겨찾기와 최근 기록을 보여주고 갱신합니다.",
      "회원 상태 · 즐겨찾기 · 최근 기록",
      "즐겨찾기",
    ],
  ],
  youth: [
    [
      "01 / APPLY",
      "경험을 나누고 싶은\n청년의 첫 신청",
      "멘토 신청을 접수하고 관리자가 승인할 수 있는 흐름을 구성했습니다.",
      "Spring Boot · 관리자 기능",
      "멘토 신청",
    ],
    [
      "02 / ACTIVITY",
      "활동을 기록하고,\n성장을 데이터로",
      "승인된 멘토의 활동 로그를 누적하고 점수 산정에 활용합니다.",
      "활동 로그 · 점수 집계",
      "활동 누적",
    ],
    [
      "03 / PROMOTE",
      "쌓인 활동은,\n다음 등급으로",
      "스케줄러가 승급 조건을 확인해 반복적인 운영 작업을 줄입니다.",
      "@Scheduled · 트랜잭션",
      "자동 승급",
    ],
  ],
};
function Dish() {
  return (
    <svg
      className="dish"
      viewBox="0 0 300 210"
      role="img"
      aria-label="김치볶음밥 예시 일러스트"
    >
      <ellipse cx="150" cy="113" rx="126" ry="82" fill="#e8ddd0" />
      <ellipse cx="150" cy="104" rx="115" ry="76" fill="#fffdf6" />
      <ellipse cx="150" cy="108" rx="82" ry="53" fill="#d85c2b" />
      {Array.from({ length: 25 }, (_, i) => (
        <rect
          key={i}
          x={83 + ((i * 37) % 130)}
          y={72 + ((i * 19) % 65)}
          width="13"
          height="5"
          rx="3"
          fill={i % 3 ? "#f59850" : "#588754"}
          transform={`rotate(${i * 23} ${89 + ((i * 37) % 130)} ${75 + ((i * 19) % 65)})`}
        />
      ))}
      <path
        d="M119 71 C125 49 159 56 167 66 C200 65 198 104 181 108 C178 134 135 126 128 113 C102 115 98 82 119 71"
        fill="#fff8e5"
      />
      <circle cx="151" cy="88" r="23" fill="#ffbd35" />
      <path
        d="M215 40 L274 180 M228 33 L287 173"
        stroke="#6c4633"
        strokeWidth="5"
      />
    </svg>
  );
}
function Phone({ step }) {
  return (
    <div className="phone-shell">
      <div className="phone-island" />
      <div className="phone-status">
        9:41 <span>••• ▰</span>
      </div>
      <div className="phone-content" key={step}>
        <div className="app-brand">
          집밥<span>PICK</span>
          <small>나를 위한 한 끼</small>
        </div>
        {step === 0 ? (
          <>
            <h4>
              오늘은 뭘<br />
              먹어볼까요?
            </h4>
            <div className="food-filters">
              <span>20분 이내</span>
              <span>든든한 한 끼</span>
            </div>
            <Dish />
            <div className="dish-caption">
              <small>오늘의 추천</small>
              <strong>계란 김치볶음밥</strong>
              <span>15분 · 간편 요리</span>
            </div>
            <div className="mock-primary">레시피 살펴보기 ↗</div>
          </>
        ) : step === 1 ? (
          <>
            <Dish />
            <h4>계란 김치볶음밥</h4>
            <p className="recipe-meta">15 min / 1인분 / 간단해요</p>
            <div className="ingredients">
              <span>밥 1공기</span>
              <span>김치 ½컵</span>
              <span>계란 1개</span>
            </div>
            <ol className="recipe-steps">
              <li>김치를 잘게 썰어 볶아주세요.</li>
              <li>밥을 넣고 골고루 섞어주세요.</li>
              <li>계란을 올리면 완성!</li>
            </ol>
            <div className="mock-primary">♡ 내 메뉴에 저장</div>
          </>
        ) : (
          <>
            <h4>
              좋아하는 맛을
              <br />
              모아두었어요.
            </h4>
            <div className="saved-notice">✓ 즐겨찾기에 저장했어요</div>
            <Dish />
            <div className="dish-caption">
              <small>MY FAVORITES · 01</small>
              <strong>
                계란 김치볶음밥 <span>♥</span>
              </strong>
              <span>오늘도 맛있는 한 끼</span>
            </div>
            <div className="recent-food">
              최근 본 레시피 <span>김치볶음밥 ↗</span>
            </div>
          </>
        )}
        <div className="phone-nav">
          <span>홈</span>
          <span>전체 메뉴</span>
          <span>즐겨찾기</span>
          <span>마이</span>
        </div>
      </div>
    </div>
  );
} // taste-skill-ignore: reference-directed numbered tickets and functional sample interface indicators.
function BrowserDemo({ id, step }) {
  const crm = id === "crm";
  return (
    <div className="demo-browser">
      <div className="browser-bar">
        <i />
        <i />
        <i />
        <span>{crm ? "DIHS CRM / 상담 관리" : "지방청년 / 멘토 관리"}</span>
      </div>
      <div className="dashboard-body" key={step}>
        <aside>
          <strong>{crm ? "DIHS." : "지방청년."}</strong>
          <span>Dashboard</span>
          <b>{crm ? "고객 관리" : "멘토 관리"}</b>
          <span>활동 기록</span>
          <span>설정</span>
        </aside>
        <div className="demo-content">
          <small>WORKSPACE / {crm ? "CUSTOMERS" : "MENTORS"}</small>
          <h4>
            {crm
              ? ["새로운 상담 신청", "담당 상담사 배정", "고객 상담 타임라인"][
                  step
                ]
              : ["멘토 신청 현황", "활동과 성장 기록", "멘토 자동 승급"][step]}
          </h4>
          <div className="demo-person">
            <span className="avatar">{crm ? "김" : "이"}</span>
            <div>
              <strong>{crm ? "김하늘" : "이도윤"}</strong>
              <small>{crm ? "백엔드 개발 과정 상담" : "지역 청년 멘토"}</small>
            </div>
            <span className="demo-status">
              {crm
                ? ["신규 접수", "배정 완료", "상담 진행"][step]
                : ["승인 대기", "활동 중", "승급 완료"][step]}
            </span>
          </div>
          {step === 0 ? (
            <div className="mock-form">
              <div>
                <span>{crm ? "관심 과정" : "활동 분야"}</span>
                <strong>{crm ? "Java · Spring Boot" : "개발 · 커리어"}</strong>
              </div>
              <div>
                <span>{crm ? "희망 상담 시간" : "신청 내용"}</span>
                <strong>
                  {crm ? "평일 오후" : "경험을 함께 나누고 싶어요."}
                </strong>
              </div>
              <div className="demo-event">
                신청 정보가 접수되었습니다 <b>✓</b>
              </div>
            </div>
          ) : step === 1 ? (
            <>
              <div className="assignment">
                <span>{crm ? "미배정" : "새싹 멘토"}</span>
                <b>→</b>
                <strong>{crm ? "박상담 · 배정 완료" : "활동 로그 누적"}</strong>
              </div>
              <div className="demo-event">
                {crm ? "현재 담당자 권한 확인" : "활동 데이터 집계"} <b>✓</b>
              </div>
              <div className="data-lines">
                <i />
                <i />
                <i />
              </div>
            </>
          ) : (
            <>
              <div className="timeline-demo">
                <p>
                  <i />
                  {crm ? "상담 신청 접수" : "멘토 승인"}
                  <small>기록 생성</small>
                </p>
                <p>
                  <i />
                  {crm ? "담당자 배정 완료" : "활동 점수 집계"}
                  <small>상태 반영</small>
                </p>
                <p className="current">
                  <i />
                  {crm ? "상담 내용 · 다음 행동 저장" : "조건 충족 → 등급 승급"}
                  <small>{crm ? "이력 연결 완료" : "스케줄러 실행 완료"}</small>
                </p>
              </div>
              <div className="demo-event">
                {crm
                  ? "다음 상담도 같은 고객의 이력으로"
                  : "역할과 등급을 분리해서 관리"}{" "}
                <b>✓</b>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} // taste-skill-ignore: reference-directed numbered tickets and functional sample interface indicators.
export function ProjectStory({ project }) {
  const ref = useRef(null),
    [step, setStep] = useState(0);
  const list = scenes[project.id];
  useEffect(() => {
    const el = ref.current,
      media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    const update = () => {
      frame = null;
      if (media.matches) return;
      const distance = el.offsetHeight - el.firstElementChild.offsetHeight;
      if (distance > 0)
        setStep(
          Math.min(
            2,
            Math.max(
              0,
              Math.floor((-el.getBoundingClientRect().top / distance) * 3),
            ),
          ),
        );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    media.addEventListener("change", queue);
    const ro = new ResizeObserver(queue);
    ro.observe(document.body);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      media.removeEventListener("change", queue);
    };
  }, []);
  function choose(i) {
    setStep(i);
    const el = ref.current,
      distance = el.offsetHeight - el.firstElementChild.offsetHeight;
    if (distance > 0 && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      window.scrollTo({
        top:
          scrollY + el.getBoundingClientRect().top + distance * (i / 3 + 0.08),
        behavior: "smooth",
      });
  }

  return (
    <section
      ref={ref}
      className={"project-story story-" + project.id}
      aria-label={project.name + " 사용 흐름"}
    >
      <div className="story-sticky frame">
        <div className="story-copy">
          <span className="story-kicker">{list[step][0]}</span>
          <h4 key={"title" + step}>
            {list[step][1].split("\n").map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <br />}
                {s}
              </React.Fragment>
            ))}
          </h4>
          <p>{list[step][2]}</p>
          <div className="story-tech">{list[step][3]}</div>
          <div
            className="story-controls"
            role="group"
            aria-label="시연 단계 선택"
          >
            {list.map((s, i) => (
              <button
                key={s[0]}
                onClick={() => choose(i)}
                aria-pressed={step === i}
              >
                <span>0{i + 1}</span>
                {s[4]}
                <i />
              </button>
            ))}
          </div>
          <small className="scroll-hint">
            스크롤로 이어지는 서비스 이야기 ↓
          </small>
        </div>
        <div className="device-stage">
          <span className="stage-word" aria-hidden="true">
            {project.id === "zipbob"
              ? "PICK."
              : project.id === "crm"
                ? "CONNECT."
                : "GROW."}
          </span>
          <div className={"device-tilt step-" + step}>
            {project.id === "zipbob" ? (
              <Phone step={step} />
            ) : (
              <BrowserDemo id={project.id} step={step} />
            )}
          </div>
          <span className="example-label">
            기능 흐름을 설명하기 위한 예시 UI · 샘플 데이터
          </span>
        </div>
      </div>
    </section>
  ); // taste-skill-ignore: reference-directed numbered tickets and functional sample interface indicators.
}
