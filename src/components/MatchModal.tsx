'use client';

import { Coordinator } from '@/types';

interface MatchModalProps {
  isOpen: boolean;
  coordinator: Coordinator | null;
  onClose: () => void;
  onStartChat: () => void;
  onMakeCall: () => void;
}

export default function MatchModal({ 
  isOpen, 
  coordinator, 
  onClose, 
  onStartChat, 
  onMakeCall 
}: MatchModalProps) {
  if (!isOpen || !coordinator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm mx-auto text-center modal-enter overflow-hidden shadow-2xl" 
           style={{ maxHeight: '80vh' }}>
        
        {/* ヘッダー - 成功アニメーション */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 border-b border-green-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="text-4xl">🎉</div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">マッチング成立！</h2>
          <p className="text-sm text-gray-600">
            {coordinator.name}さんとマッチングしました
          </p>
        </div>

        {/* スクロール可能なコンテンツ */}
        <div className="max-h-[50vh] overflow-y-auto scrollable">
          {/* コーディネーター情報 */}
          <div className="p-4">
            <div className="bg-orange-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
                  <div className="text-2xl">{coordinator.avatar}</div>
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">{coordinator.name}</h3>
                  <p className="text-xs text-gray-600">{coordinator.experience}</p>
                </div>
              </div>
              
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>🏷️</span>
                  <span>{coordinator.serviceType}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>📍</span>
                  <span>{coordinator.location}</span>
                </div>
              </div>
            </div>

            {/* メッセージ */}
            <div className="mb-4 p-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-800 leading-relaxed">
                これから{coordinator.name}さんとチャットや電話で相談することができます。
                お気軽にお声かけください！
              </p>
            </div>

            {/* 提供支援の簡易表示 */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">提供可能な支援</h4>
              <div className="flex flex-wrap gap-1">
                {coordinator.supportMenus.slice(0, 3).map((menu, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {menu}
                  </span>
                ))}
                {coordinator.supportMenus.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    他{coordinator.supportMenus.length - 3}件
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="p-4 bg-gray-50 space-y-3">
          <button
            onClick={onStartChat}
            className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            チャットを開始
          </button>
          
          <button
            onClick={onMakeCall}
            className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            電話をかける
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            後で連絡する
          </button>
          
          {/* ホームに戻るボタンを最下部に追加 */}
          <button
            onClick={onClose}
            className="w-full py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors text-sm"
          >
            ホームに戻る
          </button>
        </div>

        {/* 注意事項 */}
        <div className="px-4 pb-4">
          <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800">
              ⚠️ 相談内容によっては、コーディネーターから返信に時間がかかる場合があります。
              緊急時は最寄りの医療機関にご相談ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 