import { IoMdLogOut } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

interface LogoutModalProps {
    isOpen: boolean;
    userData: any;
    isDarkTheme: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const LogoutModal = ({ isOpen, userData, isDarkTheme, onConfirm, onCancel, isLoading = false }: LogoutModalProps) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className={`absolute inset-0 backdrop-blur-sm ${isDarkTheme ? 'bg-black/40' : 'bg-white/40'}`}
                onClick={onCancel}
            />

            <div className={`relative z-10 w-full max-w-sm rounded-2xl border shadow-xl p-6 ${isDarkTheme ? 'border-white/10 bg-[#151b25] text-[#e5e7eb]' : 'border-[#e5e1d9] bg-[#fbfaf8] text-[#1f1d1a]'}`}>
                <button
                    onClick={onCancel}
                    className={`absolute top-4 right-4 p-1 rounded-lg transition ${isDarkTheme ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-black/5 text-slate-600'}`}
                >
                    <MdClose size={20} />
                </button>

                <div className='flex items-center gap-3 mb-4'>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDarkTheme ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
                        <IoMdLogOut size={20} />
                    </div>
                    <h2 className='text-lg font-semibold'>Confirm Logout</h2>
                </div>

                <div className={`mb-6 rounded-xl border p-4 ${isDarkTheme ? 'border-white/5 bg-white/5' : 'border-[#e5e1d9] bg-[#f3f1ee]'}`}>
                    <div className='flex items-center gap-3'>
                        {userData?.avatar ? (
                            <img
                                src={userData.avatar}
                                alt={userData.name}
                                className='h-12 w-12 rounded-full object-cover flex-shrink-0'
                                crossOrigin='anonymous'
                                referrerPolicy='no-referrer'
                            />
                        ) : (
                            <div className='h-12 w-12 rounded-full bg-slate-400 flex-shrink-0' />
                        )}
                        <div className='min-w-0 flex-1'>
                            <p className={`text-sm font-semibold truncate ${isDarkTheme ? 'text-slate-100' : 'text-slate-900'}`}>{userData?.name}</p>
                            <p className={`text-xs truncate ${isDarkTheme ? 'text-slate-400' : 'text-slate-600'}`}>{userData?.email}</p>
                        </div>
                    </div>
                </div>

                <p className={`mb-6 text-sm leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-slate-700'}`}>
                    Are you sure you want to log out? You'll need to sign in again to access your workspace.
                </p>

                <div className='flex items-center gap-3'>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition ${isDarkTheme
                            ? 'border-white/10 text-slate-300 hover:bg-white/5 disabled:opacity-50'
                            : 'border-[#e5e1d9] text-slate-700 hover:bg-[#f6f4f1] disabled:opacity-50'
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${isDarkTheme
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 disabled:opacity-50'
                            : 'bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50'
                            }`}
                    >
                        <IoMdLogOut size={16} />
                        {isLoading ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
