export type HStackAlignment = 'top' | 'center' | 'bottom';
export type VStackAlignment = 'leading' | 'center' | 'trailing';
export type ZStackAlignment =
	| 'topLeading'
	| 'top'
	| 'topTrailing'
	| 'leading'
	| 'center'
	| 'trailing'
	| 'bottomLeading'
	| 'bottom'
	| 'bottomTrailing';
export type SpacerAxis = 'horizontal' | 'vertical' | 'both';

export type LabelVariant = 'title' | 'title2' | 'header' | 'header2' | 'body' | 'description' | 'caption' | 'disabled';
export type LabelAlign = 'left' | 'center' | 'right';
export type LabelButtonTone = 'primary' | 'default' | 'danger';
export type AbstractButtonTone = 'primary' | 'default' | 'borderless' | 'destructive' | 'disabled';

export type NavItem = string | { label: string; subtitle?: string; path?: string; id?: string };
export type LayoutMode = 'auto' | 'mobile' | 'desktop';
export type LayoutProfile = 'mobile-compact' | 'mobile-wide' | 'desktop-compact' | 'desktop-wide';
export type NavigationMode = 'none' | 'rail' | 'drawer' | 'bottom';
