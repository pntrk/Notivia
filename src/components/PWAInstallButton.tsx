import React, { useState } from 'react';
import { Download, Share2, PlusSquare, CheckCircle, Smartphone, Monitor } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showGeneralGuide, setShowGeneralGuide] = useState(false);

  // App is already opened in standalone installed PWA window
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable ? (
        <button
          id="btn-pwa-install"
          onClick={install}
          title="Notivia uygulamasını cihazına yükle"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg shadow-xs transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-amber-700 animate-bounce" />
          <span className="hidden sm:inline">Uygulamayı</span> Yükle
        </button>
      ) : isIOS ? (
        <button
          id="btn-pwa-ios-install"
          onClick={() => setShowIOSGuide(true)}
          title="iPhone / iPad Ana Ekrana Ekle"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-stone-600" />
          <span>Yükle (iOS)</span>
        </button>
      ) : (
        <button
          id="btn-pwa-general-install"
          onClick={() => setShowGeneralGuide(true)}
          title="Cihaza Uygulama Olarak Yükle"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 border border-stone-200/90 rounded-lg transition-all active:scale-95"
        >
          <Download className="w-3.5 h-3.5 text-stone-500" />
          <span className="hidden sm:inline">Uygulama Olarak</span> Yükle
        </button>
      )}

      {/* iOS Safari Installation Modal */}
      {showIOSGuide && (
        <div 
          id="modal-ios-pwa-guide"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowIOSGuide(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 text-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">iPhone / iPad'e Yükle</h3>
                <p className="text-xs text-stone-500">Tam ekran ve internetsiz kullanım</p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-150">
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold">1</span>
                <div>
                  Safari'nin altındaki <Share2 className="inline-block w-4 h-4 text-blue-600 mx-0.5 align-text-bottom" /> <strong>Paylaş</strong> simgesine dokunun.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold">2</span>
                <div>
                  Menüyü aşağı kaydırıp <PlusSquare className="inline-block w-4 h-4 text-stone-800 mx-0.5 align-text-bottom" /> <strong>Ana Ekrana Ekle</strong> seçeneğini seçin.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-200 text-stone-800 flex items-center justify-center text-xs font-bold">3</span>
                <div>
                  Sağ üstteki <strong>Ekle</strong> butonuna basın. Notivia tıpkı App Store uygulaması gibi ana ekranınıza yerleşecektir!
                </div>
              </div>
            </div>

            <button
              id="btn-close-ios-guide"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl transition"
            >
              Anladım
            </button>
          </div>
        </div>
      )}

      {/* Desktop / Android General Guide Modal */}
      {showGeneralGuide && (
        <div 
          id="modal-general-pwa-guide"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowGeneralGuide(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 text-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Uygulamayı Cihaza Yükle</h3>
                <p className="text-xs text-stone-500">Masaüstü ve Android cihazlar için</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-150">
              <p>
                <strong>Bilgisayarda (Chrome / Edge):</strong> Adres çubuğunun en sağındaki <Download className="inline-block w-4 h-4 text-stone-700 mx-0.5 align-text-bottom" /> <strong>"Yükle"</strong> simgesine tıklayın.
              </p>
              <div className="border-t border-stone-200 my-2" />
              <p>
                <strong>Android Telefonda:</strong> Tarayıcı menüsünü (üç nokta) açıp <strong>"Uygulamayı Yükle"</strong> veya <strong>"Ana Ekrana Ekle"</strong> seçeneğine dokunun.
              </p>
            </div>

            <button
              id="btn-close-general-guide"
              onClick={() => setShowGeneralGuide(false)}
              className="mt-5 w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl transition"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </>
  );
};
