# LVRS QML -> Svelte Migration Status

## Status Definitions

- `READY`: Svelte implementation and export are complete
- `PLANNED`: API/directory is defined, implementation pending
- `OUT_OF_SCOPE_NOW`: intentionally excluded in the current readiness phase

## app

| Source (QML) | Svelte | Status |
|---|---|---|
| `ApplicationWindow.qml` | `ApplicationWindow.svelte` | READY |
| `AppShell.qml` | `AppShell.svelte` | READY |
| `Window.qml` | None | PLANNED |

## layout

| Source (QML) | Svelte | Status |
|---|---|---|
| `HStack.qml` | `HStack.svelte` | READY |
| `VStack.qml` | `VStack.svelte` | READY |
| `ZStack.qml` | `ZStack.svelte` | READY |
| `Spacer.qml` | `Spacer.svelte` | READY |
| `AppHeader.qml` | None | PLANNED |

## control - buttons

| Source (QML) | Svelte | Status |
|---|---|---|
| `LabelButton.qml` | `LabelButton.svelte` | READY |
| `AbstractButton.qml` | None | PLANNED |
| `IconButton.qml` | None | PLANNED |
| `IconMenuButton.qml` | None | PLANNED |
| `LabelMenuButton.qml` | None | PLANNED |
| `IconSegmentedControl.qml` | None | PLANNED |
| `LabelSegmentedControl.qml` | None | PLANNED |

## control - display/input/check/util

| Source (QML) | Svelte | Status |
|---|---|---|
| `Label.qml` | `Label.svelte` | READY |
| `ProgressBar.qml` | None | PLANNED |
| `Table.qml` | None | PLANNED |
| `TableHeader.qml` | None | PLANNED |
| `TableRow.qml` | None | PLANNED |
| `TableCellItem.qml` | None | PLANNED |
| `InputField.qml` | None | PLANNED |
| `TextEditor.qml` | None | PLANNED |
| `CodeEditor.qml` | None | PLANNED |
| `CheckBox.qml` | None | PLANNED |
| `RadioButton.qml` | None | PLANNED |
| `ToggleSwitch.qml` | None | PLANNED |
| `EventListener.qml` | None | OUT_OF_SCOPE_NOW |
| `InputMethodGuard.qml` | None | OUT_OF_SCOPE_NOW |
| `WheelScrollGuard.qml` | None | OUT_OF_SCOPE_NOW |

## surfaces

| Source (QML) | Svelte | Status |
|---|---|---|
| `AppCard.qml` | `AppCard.svelte` | READY |
| `Alert.qml` | `Alert.svelte` | READY |
| `AlertButton.qml` | Reused `LabelButton.svelte` | READY |

## navigation

| Source (QML) | Svelte | Status |
|---|---|---|
| `Navigator.qml` | None | PLANNED |
| `PageRouter.qml` | None | PLANNED |
| `ContextMenu.qml` | None | PLANNED |
| `Hierarchy.qml` | None | PLANNED |
| `HierarchyItem.qml` | None | PLANNED |
| `HierarchyList.qml` | None | PLANNED |
| `HierarchyToolbar.qml` | None | PLANNED |
| `List.qml` | None | PLANNED |
| `ListItem.qml` | None | PLANNED |
| `ListToolbar.qml` | None | PLANNED |
| `ListFooter.qml` | None | PLANNED |
| `ToolbarButton.qml` | None | PLANNED |
| `MenuItem.qml` | None | PLANNED |
| `MenuDivider.qml` | None | PLANNED |
| `Link.qml` | None | PLANNED |

## Proposed Next Priorities

1. `AbstractButton`, `IconButton`, `CheckBox`, `RadioButton`, `ToggleSwitch`
2. `InputField`, `ProgressBar`, `ContextMenu`
3. `PageRouter`, `Navigator`, `Hierarchy` family
