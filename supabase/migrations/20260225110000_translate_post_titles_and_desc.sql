-- Update post titles and descriptions to Korean

UPDATE posts
SET 
  title = 'Tailwind CSS로 확장 가능한 디자인 시스템 구축하기',
  description = '유틸리티 우선 CSS를 사용하여 제품 요구사항에 맞춰 확장 가능하고 유지보수하기 쉬운 디자인 시스템을 설계하는 방법을 알아보세요.'
WHERE title = 'Building Scalable Design Systems with Tailwind CSS';

UPDATE posts
SET 
  title = 'React Hooks 마스터하기: 기본 그 이상',
  description = 'useEffect, useMemo에 대해 깊이 알아보고, 더 깔끔한 컴포넌트 로직을 위해 커스텀 훅을 만드는 방법을 배워보세요.'
WHERE title = 'Mastering React Hooks: Beyond the Basics';

UPDATE posts
SET 
  title = '타입스크립트 제네릭의 이해',
  description = '제네릭을 사용하여 재사용 가능하고 타입 안전한 컴포넌트를 작성하는 포괄적인 가이드입니다.'
WHERE title = 'Understanding TypeScript Generics';

UPDATE posts
SET 
  title = 'CSS Grid vs Flexbox: 언제 무엇을 사용해야 할까?',
  description = '이제 헷갈리지 마세요. UI에 적합한 레이아웃 모델을 선택하기 위한 확실한 가이드를 제공합니다.'
WHERE title = 'CSS Grid vs Flexbox: When to use which?';

UPDATE posts
SET 
  title = 'Node.js 성능 최적화',
  description = 'Node 앱에서 메모리 누수를 디버깅하고 처리량을 향상시키기 위한 팁과 요령을 알아봅니다.'
WHERE title = 'Optimizing Node.js Performance';

UPDATE posts
SET 
  title = '접근성을 고려한 UI 디자인 패턴',
  description = '모두가 웹 애플리케이션을 사용할 수 있도록 보장하세요. WCAG 2.1 규정 준수를 쉽게 만들어줍니다.'
WHERE title = 'Accessible UI Design Patterns';

UPDATE posts
SET 
  title = '2024년의 상태 관리',
  description = 'Redux Toolkit, Zustand, Jotai, React Context를 비교합니다. 당신의 프로젝트에 맞는 것은 무엇일까요?'
WHERE title = 'State Management in 2024';
