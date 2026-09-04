import { IoMdLogOut } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

interface LogoutModalProps {
    isOpen: boolean;
    userData: any;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const LogoutModal = ({ isOpen, userData, onConfirm, onCancel, isLoading = false }: LogoutModalProps) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div
                className='absolute inset-0 bg-black/25 backdrop-blur-sm'
                onClick={onCancel}
            />

            <div className='relative z-10 w-full max-w-sm rounded-2xl border p-6 shadow-xl
                            bg-[var(--surface)] border-[var(--border)] text-[var(--text)]'>

                <button
                    onClick={onCancel}
                    className='absolute right-4 top-4 rounded-lg p-1 transition
                               text-[var(--text-muted)] hover:bg-[var(--list-hover)]'
                >
                    <MdClose size={20} />
                </button>

                <div className='mb-4 flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/15 text-red-500'>
                        <IoMdLogOut size={20} />
                    </div>
                    <h2 className='text-lg font-semibold'>Confirm Logout</h2>
                </div>

                <div className='mb-6 rounded-xl border p-4 border-[var(--border)] bg-[var(--surface-2)]'>
                    <div className='flex items-center gap-3'>
                        {userData?.avatar ? (
                            <img
                                src={userData.avatar}
                                alt={userData.name}
                                className='h-12 w-12 flex-shrink-0 rounded-full object-cover'
                                crossOrigin='anonymous'
                                referrerPolicy='no-referrer'
                            />
                        ) : (
                            <div className='h-12 w-12 flex-shrink-0 rounded-full bg-slate-400' />
                        )}
                        <div className='min-w-0 flex-1'>
                            <p className='truncate text-sm font-semibold text-[var(--text)]'>{userData?.name}</p>
                            <p className='truncate text-xs text-[var(--text-muted)]'>{userData?.email}</p>
                        </div>
                    </div>
                </div>

                <p className='mb-6 text-sm leading-relaxed text-[var(--text-muted)]'>
                    Are you sure you want to log out? You'll need to sign in again to access your workspace.
                </p>

                <div className='flex items-center gap-3'>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className='flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition
                                   border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--list-hover)] disabled:opacity-50'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className='flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition
                                   bg-red-500/15 text-red-500 hover:bg-red-500/25 disabled:opacity-50'
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
