import { useState } from 'react';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import endpoint from '../../utils/axios';
import { FcGoogle } from 'react-icons/fc';
import { FiCheck, FiFeather, FiLock, FiMoon, FiStar, FiSun, FiZap } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setTheme, setUserData } from '../redux/userSlice';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';
import SideBar from '../components/SideBar';
import LogoutModal from '../components/LogoutModal';
import { clearConversation } from '../redux/conversationSlice';

const Home = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const { userData, theme } = useSelector((state: any) => state.user);
    const isDarkTheme = theme === 'dark';

    const handleApiCall = async (token: string) => {
        try {
            const { data } = await endpoint.post('/api/auth/login', { token });
            dispatch(setUserData(data));
        } catch (error) {
            console.error(error);
        }
    };

    const googleLogin = async () => {
        try {
            const data = await signInWithPopup(auth, googleProvider);
            const token = await data.user.getIdToken();
            await handleApiCall(token);
        } catch (error) {
            console.error(error);
        }
    };

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            console.log('Logout initiated...');
            await endpoint.get('/api/auth/logout');
            dispatch(clearUserData());
            dispatch(clearConversation());
            setIsLogoutModalOpen(false);
        } catch (error: any) {
            dispatch(clearUserData());
            dispatch(clearConversation());
            setIsLogoutModalOpen(false);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const cancelLogout = () => {
        setIsLogoutModalOpen(false);
    };

    if (userData) {
        return (
            <>
                <div className={`flex h-screen overflow-hidden ${isDarkTheme ? 'bg-[#0d0f14] text-white' : 'bg-[#f7f7f5] text-[#1f1d1a]'}`}>
                    <SideBar userData={userData} handleLogout={openLogoutModal} />

                    <main className={`flex min-w-0 flex-1 ${isDarkTheme ? 'bg-[#0d0f14]' : 'bg-[#f7f7f5]'}`}>
                        <div className={`flex-1 border-r ${isDarkTheme ? 'border-white/10 bg-[#0d0f14]' : 'border-[#ebe5df] bg-[#f7f7f5]'}`}>
                            <ChatArea />
                        </div>
                        <div className={isDarkTheme ? 'w-[360px] bg-[#0f131a]' : 'w-[360px] bg-[#f4f2ee]'}>
                            <Artifact />
                        </div>
                    </main>
                </div>
                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    userData={userData}
                    isDarkTheme={isDarkTheme}
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                    isLoading={isLoggingOut}
                />
            </>
        );
    }

    const featurePills = ['Research', 'Writing', 'Coding', 'Planning'];
    const isDarkMode = isDarkTheme;
    const appShellClass = isDarkMode
        ? 'bg-[#1a1d24] text-[#eaf1f7] selection:bg-[#2d3848]'
        : 'bg-[#f7f7f5] text-[#262522] selection:bg-[#e8e1d3]';
    const surfaceClass = isDarkMode
        ? 'border-[#2b3440] bg-[#202834] text-[#dfe8f4]'
        : 'border-[#e6e1d9] bg-[#fbfaf8] text-[#262522]';
    const mutedTextClass = isDarkMode ? 'text-[#b7c3d3]' : 'text-[#6d6b66]';
    const softBadgeClass = isDarkMode
        ? 'border-[#2d3a4a] bg-[#202a36] text-[#dfeaf8]'
        : 'border-[#e5e0d7] bg-[#faf9f6] text-[#6d6b66]';
        
    return (
        <main className={`relative min-h-screen overflow-hidden ${appShellClass}`}>
            <div
                className='absolute inset-0 -z-0 opacity-70'
                style={{
                    backgroundImage: isDarkMode
                        ? 'radial-gradient(#1b2432 0.7px, transparent 0.7px)'
                        : 'radial-gradient(#d8d5cd 0.7px, transparent 0.7px)',
                    backgroundSize: '20px 20px',
                }}
            />

            <nav className='relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10'>
                <div className='flex items-center gap-2.5'>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${isDarkMode ? 'bg-[#e5edf8] text-[#171b22]' : 'bg-[#252522] text-[#f7f7f5]'}`}>
                        <FiFeather size={15} />
                    </span>
                    <span className='text-[15px] font-semibold tracking-[-0.02em]'>Friday AI</span>
                </div>

                <div className='flex items-center gap-3'>
                    <div className={`flex items-center gap-2 text-[12px] ${isDarkMode ? 'text-[#c3cedd]' : 'text-[#77756e]'}`}>
                        <FiLock size={12} />
                        <span>Private by default</span>
                    </div>

                    <button
                        type='button'
                        onClick={() => dispatch(setTheme(isDarkMode ? 'light' : 'dark'))}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium transition ${isDarkMode
                                ? 'border-[#36475d] bg-[#232d38] text-[#edf2f9] hover:bg-[#2a3644]'
                                : 'border-[#d7d2c9] bg-white text-[#292824] hover:bg-[#faf8f5]'
                            }`}
                    >
                        {isDarkMode ? <FiSun size={12} /> : <FiMoon size={12} />}
                        {isDarkMode ? 'Light' : 'Dark'}
                    </button>
                </div>
            </nav>

            <section className='relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-12 pt-8 sm:px-10'>
                <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
                    <div className='max-w-xl'>
                        <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.17em] ${softBadgeClass}`}>
                            <FiStar size={12} />
                            Multi-agent workspace
                        </div>

                        <h1 className={`text-4xl font-semibold tracking-[-0.06em] sm:text-6xl ${isDarkMode ? 'text-[#ebf1f7]' : 'text-[#1f1d1a]'}`}>Your AI team for thinking, building, and moving faster.</h1>
                        <p className={`mt-5 max-w-lg text-[15px] leading-7 ${mutedTextClass}`}>Friday brings together research, writing, coding, and planning so you can turn ideas into decisions and execution.</p>

                        <div className='mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
                            <button
                                className={`flex items-center justify-center gap-3 rounded-xl px-5 py-3 text-[14px] font-medium transition ${isDarkMode
                                        ? 'bg-[#2d3743] text-[#edf3fa] hover:bg-[#3a4657]'
                                        : 'bg-[#1f1d1a] text-white hover:bg-[#3a3631]'
                                    }`}
                                onClick={googleLogin}
                            >
                                <FcGoogle size={16} />
                                Continue with Google
                            </button>

                        </div>

                        <div className='mt-8 flex flex-wrap gap-2'>
                            {featurePills.map((pill) => (
                                <span
                                    key={pill}
                                    className={`rounded-full border px-3 py-1.5 text-[12px] ${isDarkMode
                                            ? 'border-[#2f3d4d] bg-[#202a36] text-[#dfeaf8]'
                                            : 'border-[#e0dbd2] bg-[#fbfaf8] text-[#5d5a54]'
                                        }`}
                                >
                                    {pill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='relative'>
                        <div className={`rounded-[28px] border p-3 shadow-[0_28px_80px_rgba(31,29,26,0.10)] ${isDarkMode ? 'border-[#2a3342] bg-[#202834]' : 'border-[#e2ddd3] bg-[#fbfaf8]'}`}>
                            <div className={`rounded-[22px] border p-3 ${isDarkMode ? 'border-[#2b3a4b] bg-[#262f3b]' : 'border-[#e6e0d7] bg-[#f3f1ee]'}`}>
                                <div className={`mb-4 flex items-center justify-between rounded-xl px-3 py-2 text-[11px] ${isDarkMode ? 'bg-[#1d2734] text-[#d7e3f3]' : 'bg-[#faf8f5] text-[#7b7873]'}`}>
                                    <span className='flex items-center gap-2'>
                                        <span className='h-2 w-2 rounded-full bg-[#6d9f7d]' />
                                        Agent workflow
                                    </span>
                                    <span>Live</span>
                                </div>

                                <div className='space-y-3'>
                                    <div className={`rounded-2xl p-3 shadow-sm ring-1 ${isDarkMode ? 'bg-[#171f2d] ring-[#233149]' : 'bg-[#fffdfb] ring-[#eee7dd]'}`}>
                                        <div className={`mb-2 flex items-center gap-2 text-[11px] ${isDarkMode ? 'text-[#dce5f1]' : 'text-[#7d7a73]'}`}>
                                            <FiZap size={12} />
                                            Research agent
                                        </div>
                                        <p className={`text-[13px] leading-6 ${isDarkMode ? 'text-[#dfeaf8]' : 'text-[#38352f]'}`}>Summarize the market landscape and identify the strongest opportunities for a new AI product launch.</p>
                                    </div>

                                    <div className={`rounded-2xl p-3 shadow-sm ${isDarkMode ? 'bg-[#242d39] text-[#eef4fb]' : 'bg-[#1c1b1a] text-white'}`}>
                                        <div className={`mb-2 flex items-center gap-2 text-[11px] ${isDarkMode ? 'text-[#dfeaf8]' : 'text-[#d8d1cb]'}`}>
                                            <FiStar size={12} />
                                            Writing agent
                                        </div>
                                        <p className='text-[13px] leading-6 text-[#f1ece8]'>Draft a launch brief with positioning, messaging, and a 3-step content plan for product marketing.</p>
                                    </div>

                                    <div className={`rounded-2xl p-3 shadow-sm ring-1 ${isDarkMode ? 'bg-[#1b2431] ring-[#2f3d4d]' : 'bg-[#fffdfb] ring-[#eee7dd]'}`}>
                                        <div className={`mb-2 flex items-center gap-2 text-[11px] ${isDarkMode ? 'text-[#dfeaf8]' : 'text-[#7d7a73]'}`}>
                                            <FiCheck size={12} />
                                            Execution agent
                                        </div>
                                        <p className={`text-[13px] leading-6 ${isDarkMode ? 'text-[#dfeaf8]' : 'text-[#38352f]'}`}>Turn the plan into tasks, risks, and a crisp next-week roadmap for the team.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-16 grid gap-4 border-t pt-8 sm:grid-cols-3 ${isDarkMode ? 'border-[#1d2a3a]' : 'border-[#e6e1d9]'}`}>
                    {[
                        ['Secure by default', 'Private workspaces and thoughtful access controls.'],
                        ['Built for focus', 'One place for research, writing, and execution.'],
                        ['Multi-agent flow', 'Different agents collaborate on one goal instead of isolated threads.'],
                    ].map(([title, text]) => (
                        <div key={title} className={`rounded-2xl border p-4 ${surfaceClass}`}>
                            <p className={`text-[13px] font-semibold ${isDarkMode ? 'text-[#edf3fb]' : 'text-[#262522]'}`}>{title}</p>
                            <p className={`mt-2 text-[13px] leading-6 ${mutedTextClass}`}>{text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
