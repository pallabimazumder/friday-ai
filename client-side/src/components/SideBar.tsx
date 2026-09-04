import { useEffect, useState } from 'react';
import { GoSidebarCollapse } from 'react-icons/go';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { IoMdLogOut } from 'react-icons/io';
import { FiFeather, FiMoon, FiSun, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { BsPin, BsPinFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/userSlice';
import getConversations from '../features/getConversations';
import { addConversation, setConversation, setSelectedConversation } from '../redux/conversationSlice';
import createConversation from '../features/createConversation';

const PINNED_KEY = 'friday_pinned_conversations';

const SideBar = (props: any) => {
    const { userData, handleLogout } = props;
    const dispatch = useDispatch();
    const { theme } = useSelector((state: any) => state.user);
    const isDarkTheme = theme === 'dark';
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isRecentCollapsed, setIsRecentCollapsed] = useState(false);
    const [isPinnedCollapsed, setIsPinnedCollapsed] = useState(false);
    const [pinnedIds, setPinnedIds] = useState<Set<string>>(() => {
        try {
            const stored = localStorage.getItem(PINNED_KEY);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    });
    const { conversations, selectedConversation } = useSelector((state: any) => state.conversation);

    useEffect(() => {
        const getConv = async () => {
            const data = await getConversations();
            dispatch(setConversation(data));
        };
        getConv();
    }, []);

    useEffect(() => {
        localStorage.setItem(PINNED_KEY, JSON.stringify([...pinnedIds]));
    }, [pinnedIds]);

    const handleCreateConversation = async () => {
        const newChat = await createConversation();
        dispatch(addConversation(newChat));
        dispatch(setSelectedConversation(newChat));
    };

    const togglePin = (id: string) => {
        setPinnedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const renderAvatar = () =>
        userData?.avatar ? (
            <img
                src={userData.avatar}
                alt={userData.name}
                className='h-5 w-5 rounded-full object-cover flex-shrink-0'
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
                onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
            />
        ) : (
            <div className='h-5 w-5 rounded-full bg-slate-400 flex-shrink-0' />
        );

    const pinnedConversations = Array.isArray(conversations)
        ? conversations.filter((c: any) => pinnedIds.has(c._id))
        : [];
    const recentConversations = Array.isArray(conversations)
        ? conversations.filter((c: any) => !pinnedIds.has(c._id))
        : [];

    const renderConversationItem = (conversation: any, isPinned: boolean) => {
        const isActive = selectedConversation?._id === conversation._id;
        return (
            <div
                key={conversation._id}
                className={`group/item relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition
                            ${isActive ? 'bg-[var(--list-active)]' : 'hover:bg-[var(--list-hover)]'}`}
                onClick={() => dispatch(setSelectedConversation(conversation))}
            >
                <span className='flex-1 truncate text-sm'>{conversation.title}</span>
                <button
                    type='button'
                    onClick={(e) => { e.stopPropagation(); togglePin(conversation._id); }}
                    className='ml-1 flex-shrink-0 rounded p-0.5 opacity-0 transition
                               group-hover/item:opacity-100 text-[var(--text-muted)] hover:text-[var(--text)]'
                    title={isPinned ? 'Unpin' : 'Pin'}
                >
                    {isPinned ? <BsPinFill size={11} /> : <BsPin size={11} />}
                </button>
            </div>
        );
    };

    const renderSectionHeader = (label: string, isCollapsedSection: boolean, onToggle: () => void) => (
        <button
            type='button'
            onClick={onToggle}
            className='flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition
                       bg-[var(--list-header-bg)] text-[var(--text)] hover:bg-[var(--list-hover)]'
        >
            <span>{label}</span>
            {isCollapsedSection ? <FiChevronRight size={12} /> : <FiChevronDown size={12} />}
        </button>
    );

    return (
        <aside className={`group flex ${isCollapsed ? 'w-[84px]' : 'w-[260px]'} shrink-0 flex-col border-r px-3 py-4 transition-all duration-200
                           bg-[var(--sidebar-bg)] text-[var(--text)] border-[var(--sidebar-border)]`}>

            {/* Header */}
            <div className={`mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2 px-2 pt-2`}>
                {isCollapsed ? (
                    <div className='relative flex h-9 w-9 items-center justify-center'>
                        <div className='absolute inset-0 flex items-center justify-center rounded-xl shadow-sm transition-opacity duration-150
                                        bg-[var(--surface)] text-[var(--text)] opacity-100 group-hover:opacity-0 pointer-events-none'>
                            <FiFeather size={16} />
                        </div>
                        <button
                            type='button'
                            onClick={() => setIsCollapsed(false)}
                            className='absolute inset-0 flex items-center justify-center rounded-xl border transition-all duration-150
                                       border-[var(--toggle-border)] bg-[var(--toggle-bg)] text-[var(--toggle-text)] hover:bg-[var(--toggle-hover)]
                                       opacity-0 group-hover:opacity-100'
                        >
                            <GoSidebarCollapse size={10} />
                        </button>
                    </div>
                ) : (
                    <>
                        <div>
                            <p className='text-[13px] font-semibold tracking-[-0.03em] text-[var(--text)]'>Friday AI</p>
                            <p className='text-[11px] text-[var(--text-muted)]'>Multi-agent workspace</p>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <button
                                type='button'
                                onClick={() => dispatch(setTheme(isDarkTheme ? 'light' : 'dark'))}
                                className='inline-flex items-center justify-center rounded-full border px-2 py-1.5 text-[10px] font-medium transition
                                           border-[var(--toggle-border)] bg-[var(--toggle-bg)] text-[var(--toggle-text)] hover:bg-[var(--toggle-hover)]'
                            >
                                {isDarkTheme ? <FiSun size={10} /> : <FiMoon size={10} />}
                            </button>
                            <button
                                type='button'
                                onClick={() => setIsCollapsed(true)}
                                className='inline-flex items-center justify-center rounded-full border px-2 py-1.5 transition
                                           border-[var(--toggle-border)] bg-[var(--toggle-bg)] text-[var(--toggle-text)] hover:bg-[var(--toggle-hover)]'
                            >
                                <GoSidebarCollapse size={10} />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* New chat */}
            <button
                className={`mb-4 flex items-center gap-2 rounded-lg border text-sm font-medium transition
                            border-[var(--border)] text-[var(--text)] hover:bg-[var(--list-hover)]
                            ${isCollapsed ? 'w-10 self-center justify-center py-2 px-2' : 'px-3 py-2'}`}
                onClick={handleCreateConversation}
            >
                <HiOutlineChatAlt2 size={16} />
                {!isCollapsed && 'New chat'}
            </button>

            {/* Conversation list */}
            {!isCollapsed && (
                <div className='mt-2 flex-1 space-y-2 overflow-y-auto'>
                    {/* Pinned section */}
                    {pinnedConversations.length > 0 && (
                        <div className='space-y-1'>
                            {renderSectionHeader('Pinned', isPinnedCollapsed, () => setIsPinnedCollapsed(v => !v))}
                            {!isPinnedCollapsed && (
                                <div className='space-y-1 text-[var(--text-muted)]'>
                                    {pinnedConversations.map((c: any) => renderConversationItem(c, true))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Recent section */}
                    <div className='space-y-1'>
                        {renderSectionHeader(
                            recentConversations.length === 0 && pinnedConversations.length === 0
                                ? 'No Recent Conversations'
                                : 'Recents',
                            isRecentCollapsed,
                            () => setIsRecentCollapsed(v => !v)
                        )}
                        {!isRecentCollapsed && recentConversations.length > 0 && (
                            <div className='space-y-1 text-[var(--text-muted)]'>
                                {recentConversations.map((c: any) => renderConversationItem(c, false))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isCollapsed && <div className='flex-1' />}

            {/* User profile — expanded */}
            {!isCollapsed && userData && (
                <div className='flex items-center gap-3 rounded-xl border p-3 border-[var(--sidebar-border)] bg-[var(--surface)]'>
                    {renderAvatar()}
                    <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium text-[var(--text)]'>{userData.name}</p>
                    </div>
                    <button
                        type='button'
                        onClick={handleLogout}
                        className='inline-flex items-center justify-center rounded-lg p-1.5 transition
                                   text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--list-hover)]'
                        title='Logout'
                    >
                        <IoMdLogOut size={16} />
                    </button>
                </div>
            )}

            {/* User profile — collapsed */}
            {isCollapsed && userData && (
                <div className='relative flex items-center justify-center rounded-lg border p-2 group
                                border-[var(--sidebar-border)] bg-[var(--surface)]'>
                    {renderAvatar()}
                    <button
                        type='button'
                        onClick={handleLogout}
                        className='absolute right-0 top-0 translate-x-[calc(100%+4px)] rounded-lg border p-2 opacity-0 transition
                                   group-hover:opacity-100 border-[var(--sidebar-border)] bg-[var(--surface)]
                                   text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--list-hover)]'
                        title='Logout'
                    >
                        <IoMdLogOut size={16} />
                    </button>
                </div>
            )}
        </aside>
    );
};

export default SideBar;
