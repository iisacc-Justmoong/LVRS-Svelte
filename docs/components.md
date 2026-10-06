<a id="component-reference"></a>

# 구성요소 참조

`import { ComponentName } from 'lvrs-svelte'` 를 사용하세요. 버튼 변형은 PushButton 의 속성 ( `text`, `tone`, `href`, `disabled`, `checkable`, `checked`, `size`, `iconName`, `iconSource` ) 과 `on:click` / `on:change` 를 공유하며 PushButton 도 `onclick` 콜백을 받습니다.

입력은 `bind:text` 를 노출하며 체크박스/스위치는 `bind:checked` 를 노출합니다. RadioButton 는 `bind:group` 에 `value` 를 더 사용합니다. 슬라이더, 스텝퍼, ComboBox 및 ColorPicker 는 `bind:value` 를 노출합니다. 입력에 네이티브 속성 (이름, 필수, 자동완성, aria-label) 을 전달합니다. 섹먼트는 `bind:activeIndex`, `items: {text, iconName?, disabled?}[]` 및 `label` 를 노출합니다.

카드 8 `type` 값을 지원합니다: 파일, filePreview, 폴더, 프로젝트, 장치, 모델, 구성원, 링크. `size="small|medium|large"`, `detail="brief|detailed"`, 제목, 설명, 메타데이터, statusText, previewSource, previewAlt, iconName, 행, 진행률 및 actionText 를 사용하세요. `href` 는 링크를 만들고 `selectable` 는 선택 버튼을 만듭니다. 그렇지 않으면 그것은 기사입니다. article 카드 안에 독립적인 인터랙티브 자제 컨트롤을 배치하여 링크/버튼이 중첩되지 않도록 합니다. 내용을 제공하려면 preview, icon 및 default 슬롯을 사용하세요.

Modal, Sheet 및 Alert 은 `bind:open` 과 title 을 받습니다. Modal/Sheet 은 default/actions 슬롯과 `on:closed` 를 노출하며, Alert 은 message, primaryText, secondaryText, tertiaryText 및 `on:primaryClicked` / `on:secondaryClicked` / `on:tertiaryClicked` 를 추가합니다. 소유 애플리케이션이 주 동작이 완료되어 알림을 닫는 시점을 결정합니다.

ContextMenu는 바인딩:open, x, y, 항목 및 on:itemTriggered를 허용합니다. 뷰포트에 고정되고 비활성화된 항목을 건너뛰고 키보드 해제/선택에 대한 초점을 복원합니다. 팝오버는 트리거 슬롯 또는 텍스트와 기본 콘텐츠 슬롯을 사용합니다. 도구 설명은 포커스 가능한 컨트롤을 래핑합니다.

TextEditor 과 CodeEditor 는 일반 텍스트 편집기이며, 네이티브 Qt 리치 텍스트 엔진, 구문 분석 서비스 및 코드 실행은 포함되지 않습니다. CSS 재료는 LVRS 배경 흐림을 근사하며, 네이티브 윈도우 통합은 없습니다. 아이콘은 번들 일반 컨트롤/카드 이름 하위 집합 또는 애플리케이션이 제공하는 SVG 소스를 받습니다.

|컴포넌트|제품군|
| --- | --- |
| `AbstractButton` |제어|
| `AbstractInputBar` |제어|
| `Alert` |표면|
| `AlertButton` |표면|
| `AppCard` |표면|
| `Card` |표면|
| `CheckBox` |제어|
| `CodeEditor` |제어|
| `ColorPicker` |제어|
| `ColorPickerButton` |제어|
| `ComboBox` |제어|
| `ContextMenu` |내비게이션|
| `ContextMenuDivider` |내비게이션|
| `ContextMenuItem` |내비게이션|
| `DropdownButton` |제어|
| `HelpButton` |제어|
| `Hierarchy` |내비게이션|
| `HierarchyItem` |내비게이션|
| `HierarchyList` |내비게이션|
| `HierarchyToolbar` |내비게이션|
| `Icon` |제어|
| `IconButton` |제어|
| `IconMenuButton` |제어|
| `IconSegmentedControl` |제어|
| `InputField` |제어|
| `Label` |제어|
| `LabelButton` |제어|
| `LabelMenuButton` |제어|
| `LabelSegmentedControl` |제어|
| `Link` |내비게이션|
| `List` |내비게이션|
| `ListFooter` |내비게이션|
| `ListItem` |내비게이션|
| `ListItemComposite` |내비게이션|
| `ListItemSelector` |내비게이션|
| `ListToolbar` |내비게이션|
| `LvrsThemeProvider` |테마|
| `MaterialSurface` |표면|
| `Menu` |내비게이션|
| `MenuDivider` |내비게이션|
| `MenuItem` |내비게이션|
| `Modal` |표면|
| `PanelMaterial` |표면|
| `Popover` |표면|
| `ProgressBar` |제어|
| `PushButton` |제어|
| `RadioButton` |제어|
| `Sheet` |표면|
| `Slider` |제어|
| `Stepper` |제어|
| `Table` |제어|
| `TableCellItem` |제어|
| `TableHeader` |제어|
| `TableRow` |제어|
| `TextEditor` |제어|
| `ToggleSwitch` |제어|
| `ToolbarButton` |내비게이션|
| `Tooltip` |표면|
| `WindowMaterial` |표면|
