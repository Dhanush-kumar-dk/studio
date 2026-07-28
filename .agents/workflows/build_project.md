# Build Project Workflow

Follow these steps to install dependencies, typecheck, and build the application.

## 1. Environment Verification
Ensure Node.js (version >= 20) is installed.
```bash
node --version
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Typecheck Code
Run TypeScript static analysis:
```bash
node ./node_modules/typescript/bin/tsc --noEmit
```

## 4. Build Application
Compile Next.js production build:
```bash
node ./node_modules/next/dist/bin/next build
```
