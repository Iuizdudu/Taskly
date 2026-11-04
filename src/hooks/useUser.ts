import { useState, useCallback, useRef, useEffect } from 'react';
import { sanitizeUserName, DEFAULT_USER_NAME } from '../utils/security';

const USER_NAME_STORAGE_KEY = 'taskly_user_name';
const USER_AVATAR_STORAGE_KEY = 'taskly_user_avatar';

/**
 * Hook para gerir o perfil local do utilizador (nome higienizado e avatar sanitizado)
 * com persistência exclusiva no LocalStorage e proteção contra XSS e estouro de memória.
 */
export function useUser() {
  // Inicialização segura do nome sanitizado
  const [userName, setUserNameState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(USER_NAME_STORAGE_KEY);
      if (stored) {
        return sanitizeUserName(stored);
      }
    } catch (e) {
      console.warn('Falha ao ler o nome do utilizador do LocalStorage:', e);
    }
    return DEFAULT_USER_NAME;
  });

  // Inicialização segura do avatar (apenas data:image/ seguro)
  const [userAvatar, setUserAvatarState] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(USER_AVATAR_STORAGE_KEY);
      if (stored && stored.startsWith('data:image/')) {
        return stored;
      }
    } catch (e) {
      console.warn('Falha ao ler avatar do utilizador do LocalStorage:', e);
    }
    return null;
  });

  // Referência para controlo de debounce de 400ms
  const debounceTimerRef = useRef<number | null>(null);

  // Limpa o temporizador no desmonte
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  /**
   * Atualização com sanitização imediata no estado e escrita segura
   * (suporta gravação imediata ou com debounce de 400ms para evitar escritas desnecessárias).
   */
  const updateUserName = useCallback((newName: string, withDebounce: boolean = false) => {
    const sanitized = sanitizeUserName(newName);
    setUserNameState(sanitized);

    const persist = () => {
      try {
        localStorage.setItem(USER_NAME_STORAGE_KEY, sanitized);
      } catch (e) {
        console.warn('Falha ao gravar nome do utilizador no LocalStorage:', e);
      }
    };

    if (withDebounce) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(persist, 400);
    } else {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      persist();
    }
  }, []);

  /**
   * Grava o avatar sanitizado em Base64 no LocalStorage
   */
  const updateUserAvatar = useCallback((base64: string | null) => {
    setUserAvatarState(base64);
    try {
      if (base64) {
        localStorage.setItem(USER_AVATAR_STORAGE_KEY, base64);
      } else {
        localStorage.removeItem(USER_AVATAR_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Falha ao gravar avatar do utilizador no LocalStorage:', e);
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
    isGuest: userName.toLowerCase() === DEFAULT_USER_NAME.toLowerCase(),
  };
}
