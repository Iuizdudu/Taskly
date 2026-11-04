import React, { useState, useEffect, useRef } from 'react';
import { X, User, Check, Camera, Trash2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fileToBase64Optimized } from '../utils/image';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentAvatar: string | null;
  onSaveName: (newName: string) => void;
  onSaveAvatar: (newAvatar: string | null) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentAvatar,
  onSaveName,
  onSaveAvatar,
}) => {
  const [name, setName] = useState(currentName === 'Visitante' ? '' : currentName);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(currentAvatar);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(currentName === 'Visitante' ? '' : currentName);
      setAvatarPreview(currentAvatar);
      setImageError('');
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, currentName, currentAvatar]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
      setImageError('Formato não suportado. Por favor, use PNG, JPG ou WEBP.');
      return;
    }

    try {
      setIsProcessingImage(true);
      setImageError('');
      const base64 = await fileToBase64Optimized(file, 280, 0.85);
      setAvatarPreview(base64);
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      setImageError('Falha ao processar a foto. Tente outra imagem.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveName(name.trim() || 'Visitante');
    onSaveAvatar(avatarPreview);
    onClose();
  };

  const getInitials = (val: string) => {
    if (!val || val === 'Visitante') return 'V';
    const parts = val.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fundo escurecido com desfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
          />

          {/* Modal elevado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#181A1F] p-6 shadow-2xl border border-slate-200/80 dark:border-white/10 z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Editar Perfil
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              {/* Seção de Upload de Foto */}
              <div className="flex flex-col items-center text-center">
                <div className="relative group mb-3">
                  <div className="w-20 h-20 rounded-full p-1 bg-linear-to-tr from-slate-200 via-indigo-100 to-slate-100 dark:from-white/10 dark:via-indigo-900/30 dark:to-white/5 shadow-md">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Pré-visualização do perfil"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(name || 'V')}</span>
                      )}
                    </div>
                  </div>

                  {/* Botão de Câmera sobreposto */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-[#181A1F] cursor-pointer transition-transform hover:scale-110"
                    title="Carregar foto"
                    aria-label="Selecionar imagem do dispositivo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessingImage}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs font-semibold text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{avatarPreview ? 'Trocar foto' : 'Enviar foto'}</span>
                  </button>

                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>

                {imageError && (
                  <p className="mt-2 text-xs text-red-500 dark:text-red-400">
                    {imageError}
                  </p>
                )}
              </div>

              {/* Seção de Nome */}
              <div>
                <label
                  htmlFor="user-name-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5"
                >
                  Seu nome ou apelido
                </label>
                <input
                  id="user-name-input"
                  ref={inputRef}
                  type="text"
                  maxLength={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Eduardo, Hideki, Maria..."
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-indigo-500/20 focus:border-slate-900 dark:focus:border-indigo-500 transition-all font-medium"
                />
                <p className="mt-1 text-[11px] text-slate-400 dark:text-gray-500">
                  Deixe em branco para usar o padrão &ldquo;Visitante&rdquo;.
                </p>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-slate-900/10 transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
