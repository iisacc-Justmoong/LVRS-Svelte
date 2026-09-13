import { readFile, writeFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/lib/theme/tokens.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { createLvrsCssVariables } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const declarations = Object.entries(createLvrsCssVariables()).map(([key, value]) => `  ${key}: ${value};`).join('\n');
await writeFile(new URL('../src/lib/theme.css', import.meta.url), `/* Generated from theme/tokens.ts. Run npm run sync:theme. */\n:root {\n${declarations}\n}\n`);
