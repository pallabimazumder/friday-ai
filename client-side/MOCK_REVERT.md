# Mock Integration — Revert Guide

Created: 2026-09-04  
Purpose: UI development session (Firebase + backend unavailable)

All live API and Firebase calls are currently replaced with mock data. **Revert these before pushing to production.**

---

## What was mocked

| File | What changed |
|---|---|
| `src/features/getCurrentUser.ts` | Returns mock user instead of `GET /api/currentUser` |
| `src/features/getConversations.ts` | Returns mock conversations instead of `GET /api/chat/conversation/get` |
| `src/features/createConversation.ts` | Returns generated object instead of `POST /api/chat/conversation/create` |
| `src/pages/Home.tsx` | `googleLogin` dispatches mock user directly; `confirmLogout` clears state directly; Firebase + axios imports removed |
| `src/mocks/index.ts` | **New file** — delete after revert |

> `src/type/Conversation.ts` also had `_id?: string` added. **Keep this change** — it was a real type bug.

---

## How to revert

### `src/features/getCurrentUser.ts`
```ts
import endpoint from "../../utils/axios";

const getCurrentUser = async () => {
  try {
    const { data } = await endpoint.get('/api/currentUser');
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export default getCurrentUser;
```

### `src/features/getConversations.ts`
```ts
import endpoint from "../../utils/axios";

const getConversations = async () => {
  try {
    const { data } = await endpoint.get('/api/chat/conversation/get');
    return data;
  } catch (error) {
    console.error("Error getting conversation:", error);
    return [];
  }
};

export default getConversations;
```

### `src/features/createConversation.ts`
```ts
import endpoint from "../../utils/axios";

const createConversation = async () => {
  try {
    const { data } = await endpoint.post('/api/chat/conversation/create');
    return data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return [];
  }
};

export default createConversation;
```

### `src/pages/Home.tsx`
Restore the imports at the top:
```ts
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import endpoint from '../../utils/axios';
```

Remove: `import { mockUser } from '../mocks';`

Restore the functions inside `Home`:
```ts
const [isLoggingOut, setIsLoggingOut] = useState(false);

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
```

Restore on `<LogoutModal>`: `isLoading={isLoggingOut}`

### Cleanup
```bash
rm -rf src/mocks
```
