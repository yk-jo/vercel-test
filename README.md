## 기본 환경

- node : 18.17.0
- next : 13.4.19

## 적용 모듈

```json
{
  // dependencies
  "axios": "^1.6.5",
  "qs": "^6.11.2",
  "@tanstack/react-query": "^4.36.1",
  "zustand": "^4.4.7",
  "sass": "^1.69.7",
  "@svgr/webpack": "^8.1.0",

  // dev dependencies
  "env-cmd": "^10.1.0",
  "prettier": "^3.1.1",
  "scss-reset": "^1.4.2"
}
```

## 스크립트 명령

```bash
# .env.dev 기준 로컬 실행
npm run dev

# .env.dev 기준 빌드
npm run build:dev

# .env.release 기준 빌드
npm run build:release
```
