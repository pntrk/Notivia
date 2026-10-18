import React from 'react';

export interface MediaViewerModalProps {
  modalImgSrc: string | null;
  onClose: () => void;
}

export const MediaViewerModal: React.FC<MediaViewerModalProps> = ({ modalImgSrc, onClose }) => {
  if (!modalImgSrc) return null;

  return (
    <div
      id="image-modal"
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer transition-opacity duration-200 opacity-100"
      onClick={onClose}
    >
      <img
        id="modal-img"
        src={modalImgSrc}
        alt="Büyütülmüş Görsel"
        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-150"
      />
    </div>
  );
};
