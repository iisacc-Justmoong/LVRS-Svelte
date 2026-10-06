<a id="lvrs-qml-to-svelte-coverage"></a>

# LVRS QML ~ Svelte 적용 범위

출처: LVRS 953189f1217b8eab6ec0abba23c8ad5dc6a43ef2, 9 월 13, 2026.

공공 표면은 59 시각 컴포넌트로 제한됩니다(components.md 참조). 레이아웃 스택, 앱 쉘, 라우터, C++ 서비스, 입력 방법 가드 및 백엔드 이벤트 레지스트리는 공개 패키지 API 가 아닙니다. CardImageContent / CardInformationContent 는 Card 내부에서 구성되며, FocusRing, InteractionMotion, SpringBehavior 및 StateColorBehavior 는 공유 CSS /동작 동작이 됩니다. TextEditor / CodeEditor 는 네이티브 일반 텍스트 편집을 제공합니다.

0.2.0 는1.0 이전 중단 호환 릴리스입니다: 이전 윈도우/레이아웃/라우터 내보내기가 제거되고, 지표는 작성된 LVRS 와 일치하며, 라디오 그룹은 bind:group 을 사용하며, SSR 스타일은 정적 CSS 입니다. 기존 iisacc 인증/비즈니스/운송 코드는 이 라이브러리 외부에 있습니다.
