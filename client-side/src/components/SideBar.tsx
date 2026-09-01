import { useState } from 'react';
import { GoSidebarCollapse } from 'react-icons/go';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { IoMdLogOut } from 'react-icons/io';
import { FiFeather, FiMoon, FiSun } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/userSlice';

const SideBar = (props: any) => {
    const { userData, handleLogout } = props;

    const dispatch = useDispatch();
    const { theme } = useSelector((state: any) => state.user);
    const isDarkTheme = theme === 'dark';
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarBg = isDarkTheme ? 'bg-[#111827] text-[#e5e7eb]' : 'bg-[#f4f3f1] text-[#1f1d1a]';
    const mutedText = isDarkTheme ? 'text-slate-400' : 'text-slate-500';
    const secondaryText = isDarkTheme ? 'text-slate-300' : 'text-slate-700';
    const borderClass = isDarkTheme ? 'border-white/10' : 'border-[#e5e1d9]';

    const retrieveUserAvater = () => {
        return userData?.avatar ? (
            <img
                src={userData.avatar}
                alt={userData.name}
                className='h-5 w-5 rounded-full object-cover flex-shrink-0'
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
                onError={(event: any) => {
                    console.error('Avatar image failed to load:', userData.avatar);
                    event.currentTarget.style.display = 'none';
                }}
            />
        ) : (
            <div className='h-5 w-5 rounded-full bg-slate-400 flex-shrink-0' />
        )
    };

    return (
        <aside className={`flex ${isCollapsed ? 'w-[84px]' : 'w-[260px]'} shrink-0 flex-col border-r px-3 py-4 transition-all duration-200 ${sidebarBg} ${borderClass}`}>
            <div className={`mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2 px-2 pt-2`}>
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    {isCollapsed && (
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${isDarkTheme ? 'bg-[#1f2937] text-[#f3f4f6]' : 'bg-[#ffffff] text-[#1f1d1a]'}`}>
                            <FiFeather size={16} />
                        </div>
                    )}

                    {!isCollapsed && (
                        <div>
                            <p className={`text-[13px] font-semibold tracking-[-0.03em] ${secondaryText}`}>Friday AI</p>
                            <p className={`text-[11px] ${mutedText}`}>Multi-agent workspace</p>
                        </div>
                    )}
                </div>

                <div className='flex items-center gap-1.5'>
                    {!isCollapsed && (
                        <button
                            type='button'
                            onClick={() => dispatch(setTheme(isDarkTheme ? 'light' : 'dark'))}
                            className={`inline-flex items-center justify-center rounded-full border px-2 py-1.5 text-[10px] font-medium ${isDarkTheme
                                ? 'border-[#394a5d] bg-[#1f2936] text-[#edf3fa] hover:bg-[#263244]'
                                : 'border-[#d7d2c9] bg-white text-[#292824] hover:bg-[#faf8f5]'
                                }`}
                        >
                            {isDarkTheme ? <FiSun size={10} /> : <FiMoon size={10} />}
                        </button>
                    )}

                    <button
                        type='button'
                        onClick={() => setIsCollapsed((prev) => !prev)}
                        className={`inline-flex items-center justify-center rounded-full border px-2 py-1.5 ${isDarkTheme
                            ? 'border-[#394a5d] bg-[#1f2936] text-[#edf3fa] hover:bg-[#263244]'
                            : 'border-[#d7d2c9] bg-white text-[#292824] hover:bg-[#faf8f5]'
                            }`}
                    >
                        <GoSidebarCollapse size={10} />
                    </button>
                </div>
            </div>

            <button
                className={`mb-4 flex items-center gap-2 rounded-lg border text-sm font-medium transition ${isDarkTheme
                    ? 'border-white/10 text-slate-100 hover:bg-white/5'
                    : 'border-[#e5e1d9] text-[#1f1d1a] hover:bg-[#f6f4f1]'
                    } ${isCollapsed ? 'w-10 self-center justify-center py-2 px-2' : 'px-3 py-2'}`}
            >
                <HiOutlineChatAlt2 size={16} />
                {!isCollapsed && 'New chat'}
            </button>

            {/** Hard-coded for now - needs to be api integrated */}
            {!isCollapsed && (
                <div className='mt-2 flex-1 space-y-2 overflow-hidden'>
                    <div className={`rounded-xl px-3 py-2 text-sm ${isDarkTheme ? 'bg-white/5 text-slate-200' : 'bg-[#f3f1ee] text-slate-700'}`}>Recent</div>
                    <div className={`space-y-1 text-sm ${mutedText}`}>
                        <div className={`rounded-lg px-3 py-2 ${isDarkTheme ? 'hover:bg-white/5' : 'hover:bg-[#f0eee9]'}`}>Product strategy</div>
                        <div className={`rounded-lg px-3 py-2 ${isDarkTheme ? 'hover:bg-white/5' : 'hover:bg-[#f0eee9]'}`}>Research synthesis</div>
                        <div className={`rounded-lg px-3 py-2 ${isDarkTheme ? 'hover:bg-white/5' : 'hover:bg-[#f0eee9]'}`}>Launch planning</div>
                    </div>
                </div>
            )}

            {isCollapsed && <div className='flex-1' />}

            {!isCollapsed && userData && (
                <div className={`rounded-xl border p-3 flex items-center gap-3 ${isDarkTheme ? 'border-white/10 bg-[#151b25]' : 'border-[#e7e2d9] bg-[#f9f7f4]'}`}>
                    {retrieveUserAvater()}
                    <div className='min-w-0 flex-1'>
                        <p className={`text-sm font-medium truncate ${secondaryText}`}>{userData.name}</p>
                    </div>
                    <button
                        type='button'
                        onClick={handleLogout}
                        className={`inline-flex items-center justify-center rounded-lg p-1.5 transition ${isDarkTheme
                            ? 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-[#f0eee9]'
                            }`}
                        title='Logout'
                    >
                        <IoMdLogOut size={16} />
                    </button>
                </div>
            )}

            {isCollapsed && userData && (
                <div className={`rounded-lg border p-2 flex items-center justify-center group relative ${isDarkTheme ? 'border-white/10 bg-[#151b25]' : 'border-[#e7e2d9] bg-[#f9f7f4]'}`}>
                    {retrieveUserAvater()}
                    <button
                        type='button'
                        onClick={handleLogout}
                        className={`absolute right-0 top-0 translate-x-[calc(100%+4px)] p-2 rounded-lg transition opacity-0 group-hover:opacity-100 ${isDarkTheme
                            ? 'bg-[#151b25] border border-white/10 text-slate-400 hover:text-slate-100 hover:bg-white/5'
                            : 'bg-[#f9f7f4] border border-[#e7e2d9] text-slate-600 hover:text-slate-900 hover:bg-[#f0eee9]'
                            }`}
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
