import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiCalendar, FiCheck, FiCode, FiEdit3, FiFeather, FiGitBranch, FiLayout, FiLock, FiMoon, FiSearch, FiShield, FiStar, FiSun, FiZap } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setTheme, setUserData } from '../redux/userSlice';
import ChatArea from '../components/ChatArea';
import Artifact from '../components/Artifact';
import SideBar from '../components/SideBar';
import LogoutModal from '../components/LogoutModal';
import { clearConversation } from '../redux/conversationSlice';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import endpoint from '../../utils/axios';

const Home = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const { userData, theme } = useSelector((state: any) => state.user);
    const isDarkMode = theme === 'dark';

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

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
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
    const cancelLogout = () => setIsLogoutModalOpen(false);

    if (userData) {
        return (
            <>
                <div className='flex h-screen overflow-hidden bg-[var(--app-bg)] text-[var(--text)]'>
                    <SideBar userData={userData} handleLogout={openLogoutModal} />
                    <main className='flex min-w-0 flex-1 overflow-hidden bg-[var(--app-bg)]'>
                        <div className='flex flex-1 flex-col border-r border-[var(--app-border)] bg-[var(--app-bg)]'>
                            <ChatArea />
                        </div>
                        <div className='flex w-[360px] flex-col bg-[var(--app-panel)]'>
                            <Artifact />
                        </div>
                    </main>
                </div>
                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    userData={userData}
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                    isLoading={isLoggingOut}
                />
            </>
        );
    }

    const featureItems = [
        { icon: FiSearch,   label: 'Research' },
        { icon: FiEdit3,    label: 'Writing'  },
        { icon: FiCode,     label: 'Coding'   },
        { icon: FiCalendar, label: 'Planning' },
    ];

    const featureCards = [
        { icon: FiShield,    title: 'Secure by default', text: 'Private workspaces and thoughtful access controls.' },
        { icon: FiLayout,    title: 'Built for focus',   text: 'One place for research, writing, and execution.' },
        { icon: FiGitBranch, title: 'Multi-agent flow',  text: 'Different agents collaborate on one goal instead of isolated threads.' },
    ];

    return (
        <main
            className='relative min-h-screen overflow-y-auto bg-[var(--bg)] text-[var(--text)]'
            onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 10)}
        >
            {/* Dot grid background */}
            <div
                className='pointer-events-none absolute inset-0 -z-0 opacity-70'
                style={{
                    backgroundImage: 'radial-gradient(var(--dot) 0.7px, transparent 0.7px)',
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Nav */}
            <div
                className={`sticky top-0 z-10 w-full transition-all duration-200 ${isScrolled ? 'border-b backdrop-blur-md' : ''}`}
                style={isScrolled ? {
                    backgroundColor: 'var(--nav-scrolled-bg)',
                    borderColor: 'var(--nav-scrolled-border)',
                } : undefined}
            >
                <nav className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10'>
                    <div className='flex items-center gap-2.5'>
                        <span className='flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--logo-bg)] text-[var(--logo-text)]'>
                            <FiFeather size={15} />
                        </span>
                        <span className='text-[15px] font-semibold tracking-[-0.02em]'>Friday AI</span>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-2 text-[12px] text-[var(--text-subtle)]'>
                            <FiLock size={12} />
                            <span>Private by default</span>
                        </div>
                        <button
                            type='button'
                            onClick={() => dispatch(setTheme(isDarkMode ? 'light' : 'dark'))}
                            className='inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium transition
                                       border-[var(--toggle-border)] bg-[var(--toggle-bg)] text-[var(--toggle-text)] hover:bg-[var(--toggle-hover)]'
                        >
                            {isDarkMode ? <FiSun size={12} /> : <FiMoon size={12} />}
                            {isDarkMode ? 'Light' : 'Dark'}
                        </button>
                    </div>
                </nav>
            </div>

            <section className='relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 pb-12 pt-8 sm:px-10'>
                <div className='grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>

                    {/* Left: copy + CTA */}
                    <div className='max-w-xl'>
                        <div className='mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.17em]
                                        border-[var(--chip-border)] bg-[var(--chip-bg)] text-[var(--chip-text)]'>
                            <FiStar size={12} />
                            Multi-agent workspace
                        </div>

                        <h1 className='text-4xl font-semibold tracking-[-0.06em] sm:text-6xl text-[var(--text-heading)]'>
                            Your AI team for thinking, building, and moving faster.
                        </h1>
                        <p className='mt-5 max-w-lg text-[15px] leading-7 text-[var(--text-muted)]'>
                            Friday brings together research, writing, coding, and planning so you can turn ideas into decisions and execution.
                        </p>

                        <div className='mt-8 flex flex-col items-start gap-2'>
                            <button
                                className='btn-cta flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-[14px] font-medium'
                                onClick={googleLogin}
                            >
                                <FcGoogle size={20} />
                                Continue with Google
                            </button>
                            <p className='pl-1 text-[11px] text-[var(--text-muted)]'>Free to get started · No credit card required</p>
                        </div>

                        {/* Feature pills */}
                        <div className='mt-8 flex flex-wrap gap-2'>
                            {featureItems.map(({ icon: Icon, label }) => (
                                <span
                                    key={label}
                                    className='inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px]
                                               border-[var(--pill-border)] bg-[var(--pill-bg)] text-[var(--pill-text)]'
                                >
                                    <Icon size={11} />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: animated demo card */}
                    <div className='relative'>
                        <div
                            className='rounded-[28px] border p-3 border-[var(--demo-outer-border)] bg-[var(--demo-outer-bg)]'
                            style={{ boxShadow: 'var(--demo-shadow)' }}
                        >
                            <div className='rounded-[22px] border p-3 border-[var(--demo-inner-border)] bg-[var(--demo-inner-bg)]'>
                                <div className='mb-4 flex items-center justify-between rounded-xl px-3 py-2 text-[11px]
                                                bg-[var(--surface-3)] text-[var(--demo-header-text)]'>
                                    <span className='flex items-center gap-2'>
                                        <span className='h-2 w-2 animate-pulse rounded-full bg-[#6d9f7d]' />
                                        Agent workflow
                                    </span>
                                    <span>Live</span>
                                </div>

                                <div className='space-y-3'>
                                    <div
                                        className='animate-fade-in-up rounded-2xl p-3 shadow-sm ring-1
                                                   bg-[var(--agent-light-bg)] ring-[var(--agent-light-ring)]'
                                        style={{ animationDelay: '0.1s' }}
                                    >
                                        <div className='mb-2 flex items-center gap-2 text-[11px] text-[var(--agent-light-label)]'>
                                            <FiZap size={12} />
                                            Research agent
                                        </div>
                                        <p className='text-[13px] leading-6 text-[var(--agent-light-body)]'>
                                            Summarize the market landscape and identify the strongest opportunities for a new AI product launch.
                                        </p>
                                    </div>

                                    <div
                                        className='animate-fade-in-up rounded-2xl p-3 shadow-sm bg-[var(--agent-dark-bg)]'
                                        style={{ animationDelay: '0.35s' }}
                                    >
                                        <div className='mb-2 flex items-center gap-2 text-[11px] text-[var(--agent-dark-label)]'>
                                            <FiStar size={12} />
                                            Writing agent
                                        </div>
                                        <p className='text-[13px] leading-6 text-[var(--agent-dark-body)]'>
                                            Draft a launch brief with positioning, messaging, and a 3-step content plan for product marketing.
                                        </p>
                                    </div>

                                    <div
                                        className='animate-fade-in-up rounded-2xl p-3 shadow-sm ring-1
                                                   bg-[var(--agent-light-bg)] ring-[var(--agent-light-ring)]'
                                        style={{ animationDelay: '0.6s' }}
                                    >
                                        <div className='mb-2 flex items-center gap-2 text-[11px] text-[var(--agent-light-label)]'>
                                            <FiCheck size={12} />
                                            Execution agent
                                        </div>
                                        <p className='text-[13px] leading-6 text-[var(--agent-light-body)]'>
                                            Turn the plan into tasks, risks, and a crisp next-week roadmap for the team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature cards */}
                <div className='mt-16 grid gap-4 border-t pt-8 sm:grid-cols-3 border-[var(--border)]'>
                    {featureCards.map(({ icon: Icon, title, text }) => (
                        <div key={title} className='rounded-2xl border p-5 border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'>
                            <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--icon-bg)] text-[var(--icon-text)]'>
                                <Icon size={15} />
                            </div>
                            <p className='text-[13px] font-semibold text-[var(--text-heading)]'>{title}</p>
                            <p className='mt-2 text-[13px] leading-6 text-[var(--text-muted)]'>{text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
