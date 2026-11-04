import { useState, useCallback } from 'react';

const USER_NAME_STORAGE_KEY = 'taskly_user_name';
const USER_AVATAR_STORAGE_KEY = 'taskly_user_avatar';

/**
 * Hook para gerenciar o perfil do usuário (nome e foto de avatar)
 * armazenados localmente no LocalStorage com zero autenticação externa.
 */
export function useUser() {
  // Inicialização segura do nome
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(USER_NAME_STORAGE_KEY);
      if (stored && stored.trim()) {
        return stored.trim();
      }
    } catch (e) {
      console.warn('Falha ao ler nome do usuário do LocalStorage:', e);
    }
    return 'Visitante';
  });

  // Inicialização segura do avatar (Base64)
  const [userAvatar, setUserAvatarState] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(USER_AVATAR_STORAGE_KEY);
      if (stored && stored.startsWith('data:image/')) {
        return stored;
      }
    } catch (e) {
      console.warn('Falha ao ler avatar do usuário do LocalStorage:', e);
    }
    return null;
  });

  const updateUserName = useCallback((newName: string) => {
    const trimmed = newName.trim();
    const finalName = trimmed || 'Visitante';
    setUserNameState(finalName);
    try {
      localStorage.setItem(USER_NAME_STORAGE_KEY, finalName);
    } catch (e) {
      console.warn('Falha ao salvar nome do usuário no LocalStorage:', e);
    }
  }, []);

  const updateUserAvatar = useCallback((base64: string | null) => {
    setUserAvatarState(base64);
    try {
      if (base64) {
        localStorage.setItem(USER_AVATAR_STORAGE_KEY, base64);
      } else {
        localStorage.removeItem(USER_AVATAR_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Falha ao salvar avatar do usuário no LocalStorage:', e);
    }
  }, []);

  const removeUserAvatar = useCallback(() => {
    updateUserAvatar(null);
  }, [updateUserAvatar]);

  return {
    userName,
    userAvatar,
    updateUserName,
    updateUserAvatar,
    removeUserAvatar,
    isVisitor: userName.toLowerCase() === 'visitante',
  };
}
