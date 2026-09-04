import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

// Apply theme before first render to avoid a flash of the wrong theme
if (localStorage.getItem('friday-theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
