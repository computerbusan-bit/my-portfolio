import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const PortfolioContext = createContext();

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const PortfolioProvider = ({ children }) => {
  const [aboutMeData, setAboutMeDataRaw] = useState({
    basicInfo: {
      name: '김하미',
      role: '프론트엔드 개발자',
      headline: '사용자가 헤매지 않는\n인터페이스를 만듭니다',
      slogan: '디자인의 눈으로 문제를 발견하고, 코드로 해결합니다.\nFigma로 그리고 React로 구현하는, 처음부터 끝까지.',
      education: 'Northumbria University / Multidisciplinary Innovation MA',
      major: '산업디자인 · Multidisciplinary Innovation',
      experience: '신입 · 1년차',
      photo: '',
      links: {
        github: 'https://github.com/computerbusan-bit',
        email: 'mailto:computer.busan@gmail.com',
      },
    },
    sections: [
      {
        id: 'dev-story',
        title: '나의 개발 스토리',
        content:
          '호기심이 많고 배우는 것을 좋아합니다. 새로운 기술을 접하면 직접 만들어보며 이해하고, 목표가 생기면 어떻게든 해내려는 사람입니다.\n\n개발하다 막히는 순간이 오면 잠깐 자리를 떠납니다. 산책을 하거나 운동을 하고 나서 다시 코드를 보면 신기하게도 해결 방법이 보이더라고요. 그렇게 저는 오늘도 해냅니다.',
        showInHome: true,
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        content:
          '호기심이 이끄는 곳에 성장이 있다고 믿습니다. 새로운 기술을 마주치면 끝까지 파고들고, 목표를 세우면 반드시 이루려 합니다.',
        showInHome: true,
      },
      {
        id: 'personal',
        title: '개인적인 이야기',
        content: '',
        showInHome: false,
      },
    ],
    traits: [
      {
        title: '호기심 탐구',
        desc: '새로운 기술을 마주치면 왜, 어떻게 동작하는지 끝까지 파고듭니다.',
      },
      {
        title: '목표 완수',
        desc: '목표를 세우면 반드시 이루려고 노력합니다. 포기보다는 방법을 찾습니다.',
      },
      {
        title: '움직이면 해결',
        desc: '막히면 일단 일어납니다. 몸을 쓰고 돌아오면 의외로 답이 보이더라고요.',
      },
    ],
    skills: {
      main: [
        { name: 'HTML5',      icon: `${DEV}/html5/html5-original.svg`,           desc: '시맨틱 마크업과 웹 표준 준수',  level: 85 },
        { name: 'CSS3',       icon: `${DEV}/css3/css3-original.svg`,             desc: '반응형 레이아웃 & 애니메이션',  level: 80 },
        { name: 'JavaScript', icon: `${DEV}/javascript/javascript-original.svg`, desc: 'ES6+ 문법, 비동기 처리',       level: 75 },
        { name: 'React',      icon: `${DEV}/react/react-original.svg`,           desc: '컴포넌트 설계, 상태 관리',      level: 70 },
        { name: 'AI-POT',     icon: null,                                        desc: 'AI 기반 서비스 개발',           level: 65 },
      ],
      sub: [
        { name: 'Git',      icon: `${DEV}/git/git-original.svg` },
        { name: 'Vite',     icon: `${DEV}/vite/vite-original.svg` },
        { name: 'Supabase', icon: `${DEV}/supabase/supabase-original.svg` },
        { name: 'MUI',      icon: `${DEV}/materialui/materialui-original.svg` },
      ],
    },
  });

  // useCallback으로 안정적인 setter 참조 유지
  const setAboutMeData = useCallback((updater) => {
    setAboutMeDataRaw(updater);
  }, []);

  // useMemo로 홈 탭용 데이터 캐싱 — aboutMeData가 바뀔 때만 재계산
  const homeData = useMemo(() => {
    const homeContent = aboutMeData.sections
      .filter((s) => s.showInHome)
      .map((s) => ({
        title: s.title,
        summary: s.content.length > 100 ? s.content.substring(0, 100) + '...' : s.content,
      }));

    const topSkills = [...aboutMeData.skills.main]
      .sort((a, b) => b.level - a.level)
      .slice(0, 4);

    return {
      content: homeContent,
      skills: topSkills,
      basicInfo: aboutMeData.basicInfo,
    };
  }, [aboutMeData]);

  // 하위 호환: 함수 형태로도 제공 (이전 호출자 대비)
  const getHomeData = useCallback(() => homeData, [homeData]);

  return (
    <PortfolioContext.Provider value={{ aboutMeData, setAboutMeData, homeData, getHomeData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
