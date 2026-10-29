/**
 * Preferência de tema do usuário
 * - 'light': força tema claro
 * - 'dark': força tema escuro
 * - 'system': segue a configuração do sistema operacional
 */
export type ThemePreference = 'light' | 'dark' | 'system';

/**
 * Tema visual efetivamente aplicado ao documento
 */
export type AppliedTheme = 'light' | 'dark';
