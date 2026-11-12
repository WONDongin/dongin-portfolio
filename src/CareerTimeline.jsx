import React, { useEffect, useRef } from "react";
// 종료 시점 내림차순, 종료 월이 같으면 시작 시점 내림차순.
const history = [
  {
    date: "2026.09 — 2026.11",
    end: 202611,
    start: 202609,
    type: "프로젝트",
    title: "메뉴 추천·레시피 탐색 앱, 집밥PICK",
    meta: "개발 완료 · 2인 협업",
    body: "JWT·Refresh Token과 이메일 인증, 회원별 즐겨찾기·최근 기록 API를 구현했습니다. 메뉴·이미지·공통코드·통계 관리와 Flutter 화면 연동, 테스트·CI를 구성했습니다.",
    tags: ["Spring Boot", "PostgreSQL", "Flutter", "GitHub Actions"],
    icon: 0,
  },
  {
    date: "2025.10 — 2026.11",
    end: 202611,
    start: 202510,
    type: "경험·활동",
    title: "백엔드 개발 역량 강화",
    meta: "알고리즘 · 기술 기록 · 자격 취득",
    body: "백준 224일 이상 연속 문제 풀이와 프로그래머스 학습을 이어갔습니다. 구현 과정과 트러블슈팅을 블로그에 기록하고, 정보처리기사와 SQLD에 최종 합격했습니다.",
    tags: ["문제 해결", "기술 블로그", "정보처리기사", "SQLD"],
    icon: 1,
  },
  {
    date: "2026.04 — 2026.06",
    end: 202606,
    start: 202604,
    type: "프로젝트",
    title: "교육 상담 고객 관리, DIHS CRM",
    meta: "개발 완료 · 2인 협업",
    body: "JWT·HttpOnly Cookie 인증과 역할·담당 고객 기준 접근 제어를 구현했습니다. 상담사 계정·담당자 배정·대시보드를 개발하고, 서버 페이징·@EntityGraph와 CI 검증을 적용했습니다.",
    tags: ["Spring Security", "JPA", "서버 페이징", "CI"],
    icon: 2,
  },
  {
    date: "2025.01 — 2025.09",
    end: 202509,
    start: 202501,
    type: "교육",
    title: "클라우드(AWS) 활용 자바/스프링 개발 부트캠프",
    meta: "Java·Spring 기반 웹 애플리케이션 개발",
    body: "객체지향 설계와 서비스 구조를 학습하고 JPA·MySQL로 데이터 모델링과 비즈니스 로직을 구현했습니다. AWS 환경에서 CI/CD와 배포 프로세스를 실습했습니다.",
    tags: ["Java", "Spring Boot", "JPA", "AWS"],
    icon: 1,
  },
  {
    date: "2025.06 — 2025.08",
    end: 202508,
    start: 202506,
    type: "교육·팀 프로젝트",
    title: "지역 청년 커뮤니티 플랫폼, 지방청년",
    meta: "멘토 시스템 · 관리자 운영 · 인증·권한",
    body: "멘토 신청·승인·활동·승급을 구현하고 활동 점수 집계와 @Scheduled 자동 승급을 구성했습니다. 관리자 기능·상태 변경 이력, Naver OAuth2·JWT와 QueryDSL 검색·페이징을 담당했습니다.",
    tags: ["QueryDSL", "OAuth2", "JWT", "@Scheduled"],
    icon: 2,
  },
  {
    date: "2025.04 — 2025.05",
    end: 202505,
    start: 202504,
    type: "교육·팀 프로젝트",
    title: "JSP/Servlet 기반 학사 관리 시스템, LMS",
    meta: "메인 화면 · 학사일정·알림 · 강의계획서",
    body: "학생·교수별 강의·과제와 학사일정 조회, 일정 CRUD·개인 알림을 구현했습니다. MyBatis 기반 강의계획서 조회와 JSP 연동, SiteMesh 공통 레이아웃·과제 화면을 담당했습니다.",
    tags: ["JSP", "Servlet", "MyBatis", "SiteMesh"],
    icon: 0,
  },
  {
    date: "2022.06 — 2024.12",
    end: 202412,
    start: 202206,
    type: "경력",
    title: "㈜인터메이저",
    meta: "웹 퍼블리셔 · 홈페이지 구축 및 유지보수",
    body: "포스코 계열사 26개 사이트 유지보수와 주요 사이트 리뉴얼에 참여했습니다. REST API 응답을 연결한 동적 화면, 반응형·웹 접근성 개선, Git·SVN 및 Jenkins 환경의 유지보수를 경험했습니다.",
    tags: ["HTML·CSS", "JavaScript", "REST API", "Git·Jenkins"],
    icon: 0,
  },
  {
    date: "2021.11 — 2022.04",
    end: 202204,
    start: 202111,
    type: "교육",
    title: "UX/UI 반응형 웹디자인 & 웹퍼블리셔 양성과정",
    meta: "반응형 웹 · 사용자 인터페이스",
    body: "HTML5·CSS3·JavaScript·jQuery로 반응형 웹을 구현했습니다. Figma·Zeplin 시안을 분석해 화면으로 연결하는 과정을 학습했습니다.",
    tags: ["HTML5", "CSS3", "JavaScript", "Figma"],
    icon: 1,
  },
  {
    date: "2020.04 — 2022.01",
    end: 202201,
    start: 202004,
    type: "경력",
    title: "MJ스포랜드",
    meta: "FC · 매니저 · 콘텐츠디자인",
    body: "고객 상담과 운영 관리, 프로모션 기획을 담당했습니다. 사용자 요구사항을 파악하고 서비스 개선으로 연결하는 운영 경험을 쌓았습니다.",
    tags: ["고객 상담", "운영 관리", "프로모션 기획"],
    icon: 2,
  },
].sort((a, b) => b.end - a.end || b.start - a.start);
function TimelineIcon({ index }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <rect x="3" y="5" width="26" height="22" rx="3" />
          <path d="M3 11h26 M13 16l-4 4 4 4 M19 16l4 4-4 4" />
        </>
      ) : index === 1 ? (
        <>
          <rect x="5" y="5" width="22" height="9" rx="2" />
          <rect x="5" y="18" width="22" height="9" rx="2" />
          <path d="M21 9h2 M21 22h2" />
        </>
      ) : (
        <>
          <path d="M16 3L3 10l13 7 13-7z M3 17l13 7 13-7 M3 24l13 7 13-7" />
        </>
      )}
    </svg>
  );
}
export default function CareerTimeline() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current,
      items = [...root.querySelectorAll(".career-entry")],
      media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    const update = () => {
      frame = null;
      const line = root.querySelector(".career-track"),
        rect = line.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight * 0.6 - rect.top) / rect.height),
      );
      root.style.setProperty("--career-progress", progress);
      let active = 0;
      items.forEach((el, i) => {
        const top = el.getBoundingClientRect().top;
        if (top < innerHeight * 0.88 || media.matches)
          el.classList.add("is-visible");
        if (top < innerHeight * 0.6) active = i;
      });
      items.forEach((el, i) => el.classList.toggle("is-current", i === active));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    root.classList.add("career-enhanced");
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    media.addEventListener("change", queue);
    const ro = new ResizeObserver(queue);
    ro.observe(root);
    queue();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      media.removeEventListener("change", queue);
    };
  }, []);
  return (
    <section
      id="about"
      className="career-about frame"
      ref={ref}
      aria-labelledby="about-title"
    >
      <aside className="career-intro">
        <h2 id="about-title">
          화면을 이해하는
          <br />
          백엔드
        </h2>
        <p className="career-name">
          원동인
          <br />
          Java & Spring Boot 개발자
        </p>
        <p className="career-message">
          화면에서 시작한 경험을,
          <br />
          서버와 데이터로 이어갑니다.
        </p>
        <dl className="career-skills">
          {[
            [
              "Backend",
              "Java · Spring Boot · Spring Security · JPA · QueryDSL",
            ],
            ["Data", "MySQL · PostgreSQL · MariaDB"],
            ["Interface", "HTML · CSS · JavaScript · React · Flutter"],
            ["Collaboration", "Git · GitHub Actions · Jira · Jenkins"],
          ].map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </aside>
      <div className="career-history">
        <header>
          <h3>경험이 이어지는 과정</h3>
          <p>
            경력 · 경험 · 활동 · 교육 <span>최신순</span>
          </p>
        </header>
        <div className="career-track">
          <div className="career-line" aria-hidden="true">
            <i />
          </div>
          <ol>
            {history.map((entry, i) => (
              <li className="career-entry" key={entry.title}>
                <span className="career-node" aria-hidden="true" />
                <article className="career-card">
                  <div className="career-meta">
                    <span>{entry.date}</span>
                    <span>{entry.type}</span>
                  </div>
                  <TimelineIcon index={entry.icon} />
                  <h4>{entry.title}</h4>
                  <p className="career-subtitle">{entry.meta}</p>
                  <p className="career-description">{entry.body}</p>
                  <ul className="career-tags" aria-label="관련 기술·경험">
                    {entry.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
