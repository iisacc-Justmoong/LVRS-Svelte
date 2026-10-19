# LVRS-Svelte: Windows 빌드 및 실행

Svelte 5용 LVRS 시각 컴포넌트·theme·motion 패키지와 catalog이다.

검증 기록 갱신: `2026-10-20T02:45:37+09:00`. 변경 전 소스 기준 commit: `22069fc8e4006183a1e7631095dd97b7a56074c6`. 아래 결과는 이번 변경을 포함한 작업 트리의 검증이다.

## 현재 검증 상태

Node 실행 검사 5개, Svelte 검사, 패키지·catalog 빌드, loopback preview HTTP 200 응답 및 사용자 SDK prefix의 로컬 패키지 설치를 완료하였다. 브라우저의 모든 상호작용을 검증한 결과는 아니다.

## 이 프로젝트의 의존성과 실행 범위

필수 workspace SDK의 선행 설치는 없다.

- Node.js 20 이상과 npm이 필요하다. 이번 머신의 검증 runtime은 Node.js 24.21.0이다.
- CMake·Qt·MSVC를 사용하지 않는다. `package-lock.json`을 사용하여 의존성을 재현한다.

## 환경과 빌드

PowerShell에서 LVRS-Svelte 프로젝트 루트로 이동하여 실행한다. npm의 PowerShell 실행 정책 문제를 피하도록 `npm.cmd`를 명시한다.

```powershell
$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path -LiteralPath '../..').Path
$env:PATH = 'C:/Program Files/nodejs;' + $env:PATH
$env:NPM_CONFIG_CACHE = Join-Path $workspace 'build/npm-cache'
node.exe --version
npm.cmd ci --no-audit --no-fund
if ($LASTEXITCODE -ne 0) { throw '의존성 설치 실패' }
npm.cmd run test
if ($LASTEXITCODE -ne 0) { throw 'Node 실행 테스트 실패' }
npm.cmd run check
if ($LASTEXITCODE -ne 0) { throw 'Svelte 검사 실패' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw '패키지 및 catalog 빌드 실패' }
```

SvelteKit 중간 파일은 `build/kit`, 배포 패키지는 `build/package`, 정적 catalog는 `build/catalog`에 생성된다. `prepack`에는 theme 생성, svelte-package와 publint가 포함된다.

## 실행

빌드한 catalog를 loopback 주소에서 제공한다. 아래 프로세스는 PowerShell에서 Ctrl+C로 종료한다.

```powershell
npm.cmd run preview -- --host 127.0.0.1 --port 4179 --strictPort
```

브라우저에서 `http://127.0.0.1:4179/`를 열어 컴포넌트 catalog를 확인한다. 다른 PowerShell에서 다음 응답 검사도 수행할 수 있다.

```powershell
(Invoke-WebRequest -Uri 'http://127.0.0.1:4179/' -UseBasicParsing).StatusCode
```

정상 응답은 200이다. HTTP 응답과 모든 컴포넌트 상호작용 검증은 범위가 다르다.

## 로컬 패키지 설치

앞의 테스트·검사·빌드를 통과한 뒤 pack하고 현재 사용자의 SDK prefix에 설치한다. registry publish는 수행하지 않는다.

```powershell
npm.cmd pack --ignore-scripts --pack-destination build
if ($LASTEXITCODE -ne 0) { throw '패키지 생성 실패' }
$package = Get-ChildItem -LiteralPath build -Filter 'lvrs-svelte-*.tgz' | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if (-not $package) { throw '생성된 패키지가 없음' }
npm.cmd install --global --ignore-scripts --no-audit --no-fund --prefix "$env:USERPROFILE/.local/SDK" $package.FullName
if ($LASTEXITCODE -ne 0) { throw '로컬 패키지 설치 실패' }
```

설치 위치는 `~/.local/SDK/node_modules/lvrs-svelte`이다. 실제 Svelte 앱 소비자는 Svelte 5 peer dependency를 함께 갖추어야 한다.

## 검증 근거

- 빌드 정의: [package.json](../package.json), svelte.config.js 및 Vite 설정이다.
- 이번 실행 결과: [Windows SDK 전체 검증 기록](https://github.com/iisacc-Justmoong/SDK/blob/main/Windows/Verification-20261020.md)이다.
- 프로젝트별 실행 로그와 JUnit은 같은 검증 디렉터리에 보관한다. 로그의 종료 코드, 실패·skip 목록과 실제 실행 범위를 함께 확인한다.

전체 SDK의 실행·설치와 커밋 조건은 [공통 Windows 검증 도구](https://github.com/iisacc-Justmoong/SDK/blob/main/Windows/README.md)에서 재현한다. 원본 JSON·JUnit·상세 로그는 로컬 `Workspace/build/maintenance/20261019-221920-sdk-recovery/final/`에 보관하며 Git에는 포함하지 않는다. 이 프로젝트의 성공은 제품·다른 플랫폼·별도 계정 및 물리 장치의 실연동을 대신하지 않는다.
