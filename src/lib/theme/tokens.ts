export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

export const lvrsWebCalibration = {
	fontScale: 1.5,
	iconSmPx: 22
} as const;

function scaled(value: number, factor: number): number {
	return Number((value * factor).toFixed(2));
}

export interface LvrsThemeTokens {
	colors: {
		window: string;
		panel: {
			background01: string;
			background02: string;
			background03: string;
			background04: string;
			background05: string;
			background06: string;
			background07: string;
			background08: string;
			background09: string;
			background10: string;
			background11: string;
			background12: string;
		};
		surface: {
			windowAlt: string;
			subSurface: string;
			surfaceSolid: string;
			surfaceAlt: string;
			surfaceGhost: string;
		};
		text: {
			titleHeader: string;
			body: string;
			description: string;
			caption: string;
			disabled: string;
		};
		semantic: {
			primary: string;
			accent: string;
			success: string;
			warning: string;
			danger: string;
		};
		overlay: {
			backdrop: string;
			primary: string;
			danger: string;
		};
		contextMenu: {
			surface: string;
			divider: string;
			itemSelectedBackground: string;
			itemInactiveBackground: string;
		};
	};
	radius: {
		hairline: number;
		xs: number;
		sm: number;
		base: number;
		md: number;
		lg: number;
		xl: number;
		control: number;
	};
	spacing: {
		gapNone: number;
		gap2: number;
		gap3: number;
		gap4: number;
		gap5: number;
		gap6: number;
		gap7: number;
		gap8: number;
		gap10: number;
		gap12: number;
		gap14: number;
		gap16: number;
		gap18: number;
		gap20: number;
		gap24: number;
	};
	stroke: {
		hairline: number;
		thin: number;
		regular: number;
	};
	control: {
		heightSm: number;
		heightMd: number;
		inputMinWidth: number;
		inputWidthMd: number;
		buttonMinWidth: number;
		dialogMinWidth: number;
		dialogMaxWidth: number;
		iconSm: number;
		indicatorSize: number;
		toggleTrackWidth: number;
		toggleTransitionDuration: number;
		headerMinHeight: number;
		headerExtraHeight: number;
	};
	typography: {
		fontBody: string;
		fontDisplay: string;
		title: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		title2: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		header: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		header2: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		body: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		description: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		caption: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
		disabled: {
			size: number;
			weight: number;
			lineHeight: number;
			letterSpacing: number;
		};
	};
}

export const lvrsTheme: LvrsThemeTokens = {
	colors: {
		window: '#141414',
		panel: {
			background01: '#1B1B1C',
			background02: '#1D1D1D',
			background03: '#1F1F20',
			background04: '#212223',
			background05: '#242525',
			background06: '#262728',
			background07: '#292A2B',
			background08: '#2C2E2F',
			background09: '#303232',
			background10: '#343536',
			background11: '#373A3B',
			background12: '#3C3E3F'
		},
		surface: {
			windowAlt: '#1F1F20',
			subSurface: '#212223',
			surfaceSolid: '#242525',
			surfaceAlt: '#262728',
			surfaceGhost: '#1D1D1D'
		},
		text: {
			titleHeader: '#E5FFFFFF',
			body: '#CCFFFFFF',
			description: '#99FFFFFF',
			caption: '#80FFFFFF',
			disabled: '#4DFFFFFF'
		},
		semantic: {
			primary: '#0A84FF',
			accent: '#0A84FF',
			success: '#32D74B',
			warning: '#FFD60A',
			danger: '#FF453A'
		},
		overlay: {
			backdrop: '#59000000',
			primary: '#400A84FF',
			danger: '#59FF453A'
		},
		contextMenu: {
			surface: '#1F1F20',
			divider: '#2C2E2F',
			itemSelectedBackground: '#0A84FF',
			itemInactiveBackground: '#2C2E2F'
		}
	},
	radius: {
		hairline: 0.5,
		xs: 2,
		sm: 4,
		base: 6,
		md: 8,
		lg: 12,
		xl: 16,
		control: 5
	},
	spacing: {
		gapNone: 0,
		gap2: 2,
		gap3: 3,
		gap4: 4,
		gap5: 5,
		gap6: 6,
		gap7: 7,
		gap8: 8,
		gap10: 10,
		gap12: 12,
		gap14: 14,
		gap16: 16,
		gap18: 18,
		gap20: 20,
		gap24: 24
	},
	stroke: {
		hairline: 0.5,
		thin: 1.0,
		regular: 1.5
	},
	control: {
		heightSm: 28,
		heightMd: 44,
		inputMinWidth: 180,
		inputWidthMd: 206,
		buttonMinWidth: 100,
		dialogMinWidth: 280,
		dialogMaxWidth: 360,
		iconSm: lvrsWebCalibration.iconSmPx,
		indicatorSize: lvrsWebCalibration.iconSmPx,
		toggleTrackWidth: 38,
		toggleTransitionDuration: 140,
		headerMinHeight: 56,
		headerExtraHeight: 32
	},
	typography: {
		fontBody: '"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
		fontDisplay: '"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
		title: {
			size: scaled(26, lvrsWebCalibration.fontScale),
			weight: 700,
			lineHeight: scaled(26, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		title2: {
			size: scaled(22, lvrsWebCalibration.fontScale),
			weight: 700,
			lineHeight: scaled(22, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		header: {
			size: scaled(17, lvrsWebCalibration.fontScale),
			weight: 600,
			lineHeight: scaled(17, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		header2: {
			size: scaled(15, lvrsWebCalibration.fontScale),
			weight: 600,
			lineHeight: scaled(15, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		body: {
			size: scaled(12, lvrsWebCalibration.fontScale),
			weight: 500,
			lineHeight: scaled(12, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		description: {
			size: scaled(12, lvrsWebCalibration.fontScale),
			weight: 600,
			lineHeight: scaled(12, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		caption: {
			size: scaled(11, lvrsWebCalibration.fontScale),
			weight: 400,
			lineHeight: scaled(11, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		},
		disabled: {
			size: scaled(11, lvrsWebCalibration.fontScale),
			weight: 400,
			lineHeight: scaled(11, lvrsWebCalibration.fontScale),
			letterSpacing: 0
		}
	}
};

export function mergeLvrsTheme(overrides: DeepPartial<LvrsThemeTokens> = {}): LvrsThemeTokens {
	return {
		...lvrsTheme,
		colors: {
			...lvrsTheme.colors,
			...overrides.colors,
			panel: { ...lvrsTheme.colors.panel, ...overrides.colors?.panel },
			surface: { ...lvrsTheme.colors.surface, ...overrides.colors?.surface },
			text: { ...lvrsTheme.colors.text, ...overrides.colors?.text },
			semantic: { ...lvrsTheme.colors.semantic, ...overrides.colors?.semantic },
			overlay: { ...lvrsTheme.colors.overlay, ...overrides.colors?.overlay },
			contextMenu: { ...lvrsTheme.colors.contextMenu, ...overrides.colors?.contextMenu }
		},
		radius: { ...lvrsTheme.radius, ...overrides.radius },
		spacing: { ...lvrsTheme.spacing, ...overrides.spacing },
		stroke: { ...lvrsTheme.stroke, ...overrides.stroke },
		control: { ...lvrsTheme.control, ...overrides.control },
		typography: {
			...lvrsTheme.typography,
			...overrides.typography,
			title: { ...lvrsTheme.typography.title, ...overrides.typography?.title },
			title2: { ...lvrsTheme.typography.title2, ...overrides.typography?.title2 },
			header: { ...lvrsTheme.typography.header, ...overrides.typography?.header },
			header2: { ...lvrsTheme.typography.header2, ...overrides.typography?.header2 },
			body: { ...lvrsTheme.typography.body, ...overrides.typography?.body },
			description: { ...lvrsTheme.typography.description, ...overrides.typography?.description },
			caption: { ...lvrsTheme.typography.caption, ...overrides.typography?.caption },
			disabled: { ...lvrsTheme.typography.disabled, ...overrides.typography?.disabled }
		}
	};
}

function px(value: number): string {
	return `${value}px`;
}

export function createLvrsCssVariables(tokens: LvrsThemeTokens = lvrsTheme): Record<string, string> {
	return {
		'--lvrs-color-window': tokens.colors.window,
		'--lvrs-color-panel-bg01': tokens.colors.panel.background01,
		'--lvrs-color-panel-bg02': tokens.colors.panel.background02,
		'--lvrs-color-panel-bg03': tokens.colors.panel.background03,
		'--lvrs-color-panel-bg04': tokens.colors.panel.background04,
		'--lvrs-color-panel-bg05': tokens.colors.panel.background05,
		'--lvrs-color-panel-bg06': tokens.colors.panel.background06,
		'--lvrs-color-panel-bg07': tokens.colors.panel.background07,
		'--lvrs-color-panel-bg08': tokens.colors.panel.background08,
		'--lvrs-color-panel-bg09': tokens.colors.panel.background09,
		'--lvrs-color-panel-bg10': tokens.colors.panel.background10,
		'--lvrs-color-panel-bg11': tokens.colors.panel.background11,
		'--lvrs-color-panel-bg12': tokens.colors.panel.background12,
		'--lvrs-color-surface-window-alt': tokens.colors.surface.windowAlt,
		'--lvrs-color-surface-sub': tokens.colors.surface.subSurface,
		'--lvrs-color-surface-solid': tokens.colors.surface.surfaceSolid,
		'--lvrs-color-surface-alt': tokens.colors.surface.surfaceAlt,
		'--lvrs-color-surface-ghost': tokens.colors.surface.surfaceGhost,
		'--lvrs-color-text-primary': tokens.colors.text.titleHeader,
		'--lvrs-color-text-body': tokens.colors.text.body,
		'--lvrs-color-text-description': tokens.colors.text.description,
		'--lvrs-color-text-caption': tokens.colors.text.caption,
		'--lvrs-color-text-disabled': tokens.colors.text.disabled,
		'--lvrs-color-primary': tokens.colors.semantic.primary,
		'--lvrs-color-accent': tokens.colors.semantic.accent,
		'--lvrs-color-success': tokens.colors.semantic.success,
		'--lvrs-color-warning': tokens.colors.semantic.warning,
		'--lvrs-color-danger': tokens.colors.semantic.danger,
		'--lvrs-color-overlay-backdrop': tokens.colors.overlay.backdrop,
		'--lvrs-color-overlay-primary': tokens.colors.overlay.primary,
		'--lvrs-color-overlay-danger': tokens.colors.overlay.danger,
		'--lvrs-color-context-surface': tokens.colors.contextMenu.surface,
		'--lvrs-color-context-divider': tokens.colors.contextMenu.divider,
		'--lvrs-color-context-selected': tokens.colors.contextMenu.itemSelectedBackground,
		'--lvrs-color-context-inactive': tokens.colors.contextMenu.itemInactiveBackground,
		'--lvrs-radius-xs': px(tokens.radius.xs),
		'--lvrs-radius-sm': px(tokens.radius.sm),
		'--lvrs-radius-base': px(tokens.radius.base),
		'--lvrs-radius-md': px(tokens.radius.md),
		'--lvrs-radius-lg': px(tokens.radius.lg),
		'--lvrs-radius-xl': px(tokens.radius.xl),
		'--lvrs-radius-control': px(tokens.radius.control),
		'--lvrs-gap-0': px(tokens.spacing.gapNone),
		'--lvrs-gap-2': px(tokens.spacing.gap2),
		'--lvrs-gap-3': px(tokens.spacing.gap3),
		'--lvrs-gap-4': px(tokens.spacing.gap4),
		'--lvrs-gap-5': px(tokens.spacing.gap5),
		'--lvrs-gap-6': px(tokens.spacing.gap6),
		'--lvrs-gap-7': px(tokens.spacing.gap7),
		'--lvrs-gap-8': px(tokens.spacing.gap8),
		'--lvrs-gap-10': px(tokens.spacing.gap10),
		'--lvrs-gap-12': px(tokens.spacing.gap12),
		'--lvrs-gap-14': px(tokens.spacing.gap14),
		'--lvrs-gap-16': px(tokens.spacing.gap16),
		'--lvrs-gap-18': px(tokens.spacing.gap18),
		'--lvrs-gap-20': px(tokens.spacing.gap20),
		'--lvrs-gap-24': px(tokens.spacing.gap24),
		'--lvrs-stroke-thin': px(tokens.stroke.thin),
		'--lvrs-control-height-sm': px(tokens.control.heightSm),
		'--lvrs-control-height-md': px(tokens.control.heightMd),
		'--lvrs-control-button-min-width': px(tokens.control.buttonMinWidth),
		'--lvrs-control-dialog-min-width': px(tokens.control.dialogMinWidth),
		'--lvrs-control-dialog-max-width': px(tokens.control.dialogMaxWidth),
		'--lvrs-control-icon-sm': px(tokens.control.iconSm),
		'--lvrs-control-indicator-size': px(tokens.control.indicatorSize),
		'--lvrs-font-body': tokens.typography.fontBody,
		'--lvrs-font-display': tokens.typography.fontDisplay,
		'--lvrs-text-title-size': px(tokens.typography.title.size),
		'--lvrs-text-title-weight': String(tokens.typography.title.weight),
		'--lvrs-text-title-line-height': px(tokens.typography.title.lineHeight),
		'--lvrs-text-title2-size': px(tokens.typography.title2.size),
		'--lvrs-text-title2-weight': String(tokens.typography.title2.weight),
		'--lvrs-text-title2-line-height': px(tokens.typography.title2.lineHeight),
		'--lvrs-text-header-size': px(tokens.typography.header.size),
		'--lvrs-text-header-weight': String(tokens.typography.header.weight),
		'--lvrs-text-header-line-height': px(tokens.typography.header.lineHeight),
		'--lvrs-text-header2-size': px(tokens.typography.header2.size),
		'--lvrs-text-header2-weight': String(tokens.typography.header2.weight),
		'--lvrs-text-header2-line-height': px(tokens.typography.header2.lineHeight),
		'--lvrs-text-body-size': px(tokens.typography.body.size),
		'--lvrs-text-body-weight': String(tokens.typography.body.weight),
		'--lvrs-text-body-line-height': px(tokens.typography.body.lineHeight),
		'--lvrs-text-description-size': px(tokens.typography.description.size),
		'--lvrs-text-description-weight': String(tokens.typography.description.weight),
		'--lvrs-text-description-line-height': px(tokens.typography.description.lineHeight),
		'--lvrs-text-caption-size': px(tokens.typography.caption.size),
		'--lvrs-text-caption-weight': String(tokens.typography.caption.weight),
		'--lvrs-text-caption-line-height': px(tokens.typography.caption.lineHeight)
	};
}

export function cssVariablesToStyle(variables: Record<string, string>): string {
	return Object.entries(variables)
		.map(([key, value]) => `${key}: ${value}`)
		.join('; ');
}
