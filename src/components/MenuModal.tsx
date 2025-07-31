'use client';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchList: () => void;
  onSettings: () => void;
}

export default function MenuModal({ 
  isOpen, 
  onClose, 
  onMatchList, 
  onSettings 
}: MenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4">
      <div className="bg-white rounded-2xl w-64 mt-16 mr-4 shadow-2xl overflow-hidden">
        
        {/* ヘッダー */}
        <div className="bg-orange-500 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">メニュー</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-200 transition-colors"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* メニュー項目 */}
        <div className="p-2">
          <button
            onClick={() => {
              onMatchList();
              onClose();
            }}
            className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-lg">❤️</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">マッチング一覧</h3>
              <p className="text-sm text-gray-500">これまでのマッチング履歴</p>
            </div>
          </button>

          <button
            onClick={() => {
              onSettings();
              onClose();
            }}
            className="w-full text-left p-4 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">⚙️</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">設定</h3>
              <p className="text-sm text-gray-500">プロフィール・アカウント設定</p>
            </div>
          </button>
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            オレンジコネクト v1.0
          </p>
        </div>
      </div>
    </div>
  );
}