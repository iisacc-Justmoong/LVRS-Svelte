# LVRS QML -> Svelte Migration Status

## Status Definitions

- `READY`: Svelte implementation and export are complete
- `EXCLUDED_BACKEND_REQUIRED`: excluded because separate backend/runtime dependency is required

## Summary

- QML component names: `46`
- Svelte component names: `47` (includes LVRS-Svelte-only components such as `ApplicationWindow`, `AppShell`, `LvrsThemeProvider`)
- QML names not implemented: `2`
  - `EventListener`
  - `TextEditor`

## app

| Source (QML) | Svelte | Status |
|---|---|---|
| `ApplicationWindow.qml` | `ApplicationWindow.svelte` | READY |
| `AppShell.qml` | `AppShell.svelte` | READY |

## layout

| Source (QML) | Svelte | Status |
|---|---|---|
| `AppHeader.qml` | `AppHeader.svelte` | READY |
| `HStack.qml` | `HStack.svelte` | READY |
| `VStack.qml` | `VStack.svelte` | READY |
| `ZStack.qml` | `ZStack.svelte` | READY |
| `Spacer.qml` | `Spacer.svelte` | READY |

## control - buttons/check/display/input/util

| Source (QML) | Svelte | Status |
|---|---|---|
| `AbstractButton.qml` | `AbstractButton.svelte` | READY |
| `IconButton.qml` | `IconButton.svelte` | READY |
| `IconMenuButton.qml` | `IconMenuButton.svelte` | READY |
| `IconSegmentedControl.qml` | `IconSegmentedControl.svelte` | READY |
| `LabelButton.qml` | `LabelButton.svelte` | READY |
| `LabelMenuButton.qml` | `LabelMenuButton.svelte` | READY |
| `LabelSegmentedControl.qml` | `LabelSegmentedControl.svelte` | READY |
| `CheckBox.qml` | `CheckBox.svelte` | READY |
| `RadioButton.qml` | `RadioButton.svelte` | READY |
| `ToggleSwitch.qml` | `ToggleSwitch.svelte` | READY |
| `Label.qml` | `Label.svelte` | READY |
| `ProgressBar.qml` | `ProgressBar.svelte` | READY |
| `Table.qml` | `Table.svelte` | READY |
| `TableCellItem.qml` | `TableCellItem.svelte` | READY |
| `TableHeader.qml` | `TableHeader.svelte` | READY |
| `TableRow.qml` | `TableRow.svelte` | READY |
| `AbstractInputBar.qml` | `AbstractInputBar.svelte` | READY |
| `InputField.qml` | `InputField.svelte` | READY |
| `CodeEditor.qml` | `CodeEditor.svelte` | READY |
| `InputMethodGuard.qml` | `InputMethodGuard.svelte` | READY |
| `WheelScrollGuard.qml` | `WheelScrollGuard.svelte` | READY |
| `EventListener.qml` | None | EXCLUDED_BACKEND_REQUIRED |
| `TextEditor.qml` | None | EXCLUDED_BACKEND_REQUIRED |

## surfaces

| Source (QML) | Svelte | Status |
|---|---|---|
| `Alert.qml` | `Alert.svelte` | READY |
| `AlertButton.qml` | `AlertButton.svelte` | READY |
| `AppCard.qml` | `AppCard.svelte` | READY |

## navigation

| Source (QML) | Svelte | Status |
|---|---|---|
| `ContextMenu.qml` | `ContextMenu.svelte` | READY |
| `Hierarchy.qml` | `Hierarchy.svelte` | READY |
| `HierarchyItem.qml` | `HierarchyItem.svelte` | READY |
| `HierarchyList.qml` | `HierarchyList.svelte` | READY |
| `HierarchyToolbar.qml` | `HierarchyToolbar.svelte` | READY |
| `Link.qml` | `Link.svelte` | READY |
| `List.qml` | `List.svelte` | READY |
| `ListFooter.qml` | `ListFooter.svelte` | READY |
| `ListItem.qml` | `ListItem.svelte` | READY |
| `ListToolbar.qml` | `ListToolbar.svelte` | READY |
| `MenuDivider.qml` | `MenuDivider.svelte` | READY |
| `MenuItem.qml` | `MenuItem.svelte` | READY |
| `Navigator.qml` | `Navigator.svelte` | READY |
| `PageRouter.qml` | `PageRouter.svelte` | READY |
| `ToolbarButton.qml` | `ToolbarButton.svelte` | READY |
