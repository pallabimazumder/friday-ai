# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Deferred Landing Page

The following `Home.tsx` design is kept here for use after the basic integration is complete:

```tsx
import { useState } from 'react';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import endpoint from '../../utils/axios';
import { FiArrowUp, FiFeather, FiLock, FiPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Home = () => {
  const [error, setError] = useState('');

  const handleLogin = async (token: any) => {
    try {
      const { data } = await endpoint.post('/auth/login', { token });
      console.log("Login Response: ", data);
    } catch (error) {
      console.error(error);
      setError('We could not sign you in. Please try again.');
    }
  };

  const googleLogin = async () => {
    setError('');
    try {
      const data = await signInWithPopup(auth, googleProvider);
      const token = await data.user.getIdToken();
      await handleLogin(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='min-h-screen overflow-hidden bg-[#f7f7f5] text-[#262522] selection:bg-[#e8e1d3]'>
      <div className='absolute inset-0 -z-0 opacity-70' style={{ backgroundImage: 'radial-gradient(#d8d5cd 0.7px, transparent 0.7px)', backgroundSize: '20px 20px' }} />
      <nav className='relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10'>
        <div className='flex items-center gap-2.5'>
          <span className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#252522] text-[#f7f7f5]'><FiFeather size={15} /></span>
          <span className='text-[15px] font-semibold tracking-[-0.02em]'>Friday AI</span>
        </div>
        <div className='flex items-center gap-2 text-[12px] text-[#77756e]'><FiLock size={12} /><span>Private by default</span></div>
      </nav>
      <section className='relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-3xl flex-col items-center px-6 pb-12 pt-[12vh] text-center sm:px-10'>
        <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#dedbd4] bg-[#fbfbf9] shadow-[0_8px_30px_rgba(50,47,38,0.06)]'><FiFeather size={22} strokeWidth={1.5} /></div>
        <p className='mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#96938a]'>Your thoughtful AI companion</p>
        <h1 className='max-w-xl text-4xl font-semibold tracking-[-0.055em] text-[#292824] sm:text-5xl'>What will we work on today?</h1>
        <p className='mt-5 max-w-md text-[15px] leading-7 text-[#77756e]'>A calm space to think, create, and get things done.</p>
        <div className='mt-11 w-full max-w-xl rounded-[18px] border border-[#d9d6ce] bg-[#fcfcfa] p-2 text-left shadow-[0_14px_45px_rgba(50,47,38,0.08)]'>
          <div className='flex min-h-14 items-center gap-3 rounded-xl bg-[#f5f4f0] px-4 text-[14px] text-[#aaa79f]'><FiPlus size={18} /><span className='flex-1'>Ask Friday anything...</span><span className='hidden rounded-md border border-[#dfdcd4] bg-[#fcfcfa] px-2 py-1 text-[10px] text-[#aaa79f] sm:inline'>Sign in to begin</span></div>
          <div className='flex items-center justify-between px-2 pt-3'><span className='text-[11px] text-[#aaa79f]'>Your conversations stay yours.</span><FiArrowUp size={16} className='text-[#c3c0b8]' /></div>
        </div>
        <div className='mt-5 flex flex-wrap justify-center gap-2'>{['Help me write', 'Explore an idea', 'Plan my day'].map((prompt) => <span key={prompt} className='rounded-full border border-[#dedbd4] bg-[#fbfbf9]/80 px-3.5 py-2 text-[12px] text-[#858279]'>{prompt}</span>)}</div>
        <div className='mt-10 flex w-full max-w-[260px] flex-col items-center gap-3'>
          <button className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#292824] py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#44413a]' onClick={googleLogin}><FcGoogle size={16} />Continue with Google</button>
          {error && <p className='text-[12px] text-[#b35d50]'>{error}</p>}
        </div>
        <p className='mt-auto pt-14 text-[11px] text-[#aaa79f]'>By continuing, you agree to use Friday AI responsibly.</p>
      </section>
    </main>
  );
};

export default Home;
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
