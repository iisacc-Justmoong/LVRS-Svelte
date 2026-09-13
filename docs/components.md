# Component reference

Use `import { ComponentName } from 'lvrs-svelte'`. Button variants share PushButton's props
(`text`, `tone`, `href`, `disabled`, `checkable`, `checked`, `size`, `iconName`, `iconSource`)
and `on:click` / `on:change`; PushButton also accepts an `onclick` callback.

Inputs expose `bind:text`; checkbox/switch expose `bind:checked`; RadioButton uses
`bind:group` plus `value`; Slider, Stepper, ComboBox and ColorPicker expose `bind:value`.
Pass native attributes (name, required, autocomplete, aria-label) to inputs. Segments expose
`bind:activeIndex`, `items: {text, iconName?, disabled?}[]` and `label`.

Card supports eight `type` values: file, filePreview, folder, project, device, model, member, link.
Use `size="small|medium|large"`, `detail="brief|detailed"`, title, description, metadata,
statusText, previewSource, previewAlt, iconName, rows, progress and actionText.
`href` makes a link, `selectable` a selection button, otherwise it is an article.
Put independent interactive child controls inside an article card, so links/buttons do not nest.
Use preview, icon and default slots to supply content.

Modal, Sheet and Alert accept `bind:open` and title. Modal/Sheet expose default/actions slots
and `on:closed`; Alert adds message, primaryText, secondaryText, tertiaryText and
`on:primaryClicked` / `on:secondaryClicked` / `on:tertiaryClicked`. The owning application
decides when a primary action completes and closes the alert.

ContextMenu accepts bind:open, x, y, items and on:itemTriggered. It clamps to the viewport,
skips disabled items and restores focus on keyboard dismissal/selection. Popover uses a
trigger slot or text and a default content slot. Tooltip wraps a focusable control.

TextEditor and CodeEditor are plain text editors; the native Qt rich-text engine, syntax
services and code execution are not included. CSS materials approximate LVRS backdrop blur;
there is no native-window integration. Icons accept the bundled general-control/card name
subset or an application-supplied SVG source.

| Component | Family |
| --- | --- |
| `AbstractButton` | control |
| `AbstractInputBar` | control |
| `Alert` | surfaces |
| `AlertButton` | surfaces |
| `AppCard` | surfaces |
| `Card` | surfaces |
| `CheckBox` | control |
| `CodeEditor` | control |
| `ColorPicker` | control |
| `ColorPickerButton` | control |
| `ComboBox` | control |
| `ContextMenu` | navigation |
| `ContextMenuDivider` | navigation |
| `ContextMenuItem` | navigation |
| `DropdownButton` | control |
| `HelpButton` | control |
| `Hierarchy` | navigation |
| `HierarchyItem` | navigation |
| `HierarchyList` | navigation |
| `HierarchyToolbar` | navigation |
| `Icon` | control |
| `IconButton` | control |
| `IconMenuButton` | control |
| `IconSegmentedControl` | control |
| `InputField` | control |
| `Label` | control |
| `LabelButton` | control |
| `LabelMenuButton` | control |
| `LabelSegmentedControl` | control |
| `Link` | navigation |
| `List` | navigation |
| `ListFooter` | navigation |
| `ListItem` | navigation |
| `ListItemComposite` | navigation |
| `ListItemSelector` | navigation |
| `ListToolbar` | navigation |
| `LvrsThemeProvider` | theme |
| `MaterialSurface` | surfaces |
| `Menu` | navigation |
| `MenuDivider` | navigation |
| `MenuItem` | navigation |
| `Modal` | surfaces |
| `PanelMaterial` | surfaces |
| `Popover` | surfaces |
| `ProgressBar` | control |
| `PushButton` | control |
| `RadioButton` | control |
| `Sheet` | surfaces |
| `Slider` | control |
| `Stepper` | control |
| `Table` | control |
| `TableCellItem` | control |
| `TableHeader` | control |
| `TableRow` | control |
| `TextEditor` | control |
| `ToggleSwitch` | control |
| `ToolbarButton` | navigation |
| `Tooltip` | surfaces |
| `WindowMaterial` | surfaces |
