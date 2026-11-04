/**
 * Módulo de Segurança e Higienização Client-Side para o Taskly.
 * Previne Stored XSS, valida integridade de uploads, elimina metadados maliciosos
 * e protege o armazenamento local (localStorage) contra estouro de quota.
 */

export const MAX_USER_NAME_LENGTH = 25;
export const MAX_AVATAR_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
export const DEFAULT_USER_NAME = 'Convidado';

/**
 * Higieniza o nome de utilizador:
 * - Remove quebras de linha (\r, \n) e tabulações (\t)
 * - Remove tags HTML para neutralizar injeções
 * - Condensa múltiplos espaços em branco
 * - Aplica .trim() e limita rigidamente ao máximo de 25 caracteres
 */
export function sanitizeUserName(input: string | null | undefined): string {
  if (!input) return DEFAULT_USER_NAME;

  // 1. Remove tags HTML
  const withoutTags = input.replace(/<\/?[^>]+(>|$)/g, '');

  // 2. Remove quebras de linha e caracteres de controlo
  const withoutControlChars = withoutTags.replace(/[\r\n\t\x00-\x1F\x7F]/g, ' ');

  // 3. Condensa espaços consecutivos e remove espaços nas pontas
  const cleaned = withoutControlChars.replace(/\s+/g, ' ').trim();

  // 4. Limita rigorosamente aos 25 caracteres
  const truncated = cleaned.slice(0, MAX_USER_NAME_LENGTH);

  return truncated || DEFAULT_USER_NAME;
}

/**
 * Validação rigorosa e higienização de imagem de avatar via HTML5 Canvas:
 * 1. Valida tamanho do ficheiro (limite máximo de 2 MB).
 * 2. Não confia apenas no tipo MIME/extensão: descodifica a imagem com `new Image()`.
 * 3. Captura ficheiros corrompidos ou ataques poliglota no evento `onerror`.
 * 4. Redesenha num `<canvas>` invisível redimensionado para no máximo 256x256 píxeis.
 * 5. Exporta limpo via `canvas.toDataURL('image/jpeg', 0.85)`, descartando metadados EXIF,
 *    neutralizando scripts camuflados e impedindo o esgotamento do localStorage.
 */
export async function sanitizeAvatarImage(
  file: File
): Promise<{ success: boolean; dataUrl?: string; error?: string }> {
  // 1. Verificação rígida de tamanho (máximo 2 MB)
  if (file.size > MAX_AVATAR_FILE_SIZE_BYTES) {
    return {
      success: false,
      error: 'O ficheiro excede o limite máximo permitido de 2 MB.',
    };
  }

  // 2. Verificação de tipo de conteúdo aceitável
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return {
      success: false,
      error: 'Formato não suportado. Por favor, envie uma imagem PNG, JPG ou WEBP.',
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const rawDataUrl = readerEvent.target?.result;
      if (typeof rawDataUrl !== 'string') {
        resolve({
          success: false,
          error: 'Falha na leitura do ficheiro.',
        });
        return;
      }

      const img = new Image();

      // Captura tentativas com ficheiros poliglota, corrompidos ou maliciosos
      img.onerror = () => {
        resolve({
          success: false,
          error: 'Ficheiro de imagem inválido ou corrompido.',
        });
      };

      img.onload = () => {
        try {
          const maxDimension = 256;
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          if (width === 0 || height === 0) {
            resolve({
              success: false,
              error: 'Dimensões de imagem inválidas.',
            });
            return;
          }

          // Redimensionamento proporcional para no máximo 256x256 píxeis
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          // Cria elemento canvas isolado
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve({
              success: false,
              error: 'Não foi possível inicializar o contexto gráfico.',
            });
            return;
          }

          // Preenche fundo branco para evitar transparência preta em conversão para JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);

          // Redesenha os píxeis limpos (descarta EXIF e scripts embutidos)
          ctx.drawImage(img, 0, 0, width, height);

          // Exporta JPEG seguro e compacto
          const sanitizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          resolve({
            success: true,
            dataUrl: sanitizedDataUrl,
          });
        } catch (canvasError) {
          console.error('Erro na higienização do canvas:', canvasError);
          resolve({
            success: false,
            error: 'Erro no processamento de segurança da imagem.',
          });
        }
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Erro ao aceder ao ficheiro selecionado.',
      });
    };

    reader.readAsDataURL(file);
  });
}
