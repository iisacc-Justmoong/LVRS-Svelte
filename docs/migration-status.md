# LVRS QML to Svelte coverage

Source: LVRS 953189f1217b8eab6ec0abba23c8ad5dc6a43ef2, September 13, 2026.

The public surface is limited to 59 visual components (see components.md).
Layout stacks, app shells, routers, C++ services, input-method guards and backend event
registries are not public package APIs. CardImageContent/CardInformationContent are composed
inside Card. FocusRing, InteractionMotion, SpringBehavior and StateColorBehavior become shared
CSS/action behavior. TextEditor/CodeEditor provide native plain text editing.

0.2.0 is a breaking pre-1.0 release: the former window/layout/router exports are removed,
metrics now match authored LVRS, radio groups use bind:group, and SSR styles are static CSS.
Existing iisacc auth/business/transport code is outside this library.
