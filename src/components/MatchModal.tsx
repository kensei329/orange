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
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
        {/* 成功アニメーション */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl">🎉</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">マッチング成立！</h2>
          <p className="text-gray-600">
            {coordinator.name}さんとマッチングしました
          </p>
        </div>

        {/* コーディネーター情報 */}
        <div className="bg-orange-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{coordinator.avatar}</div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">{coordinator.name}</h3>
              <p className="text-sm text-gray-600">{coordinator.experience}</p>
            </div>
          </div>
          
          <div className="text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🏷️</span>
              <span>{coordinator.serviceType}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍</span>
              <span>{coordinator.location}</span>
            </div>
          </div>
        </div>

        {/* メッセージ */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            これから{coordinator.name}さんとチャットや電話で相談することができます。
            お気軽にお声かけください！
          </p>
        </div>

        {/* アクションボタン */}
        <div className="space-y-3">
          <button
            onClick={onStartChat}
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            💬 チャットを開始
          </button>
          
          <button
            onClick={onMakeCall}
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            📞 電話をかける
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            後で連絡する
          </button>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
          <p className="text-xs text-yellow-800">
            ⚠️ 相談内容によっては、コーディネーターから返信に時間がかかる場合があります。
            緊急時は最寄りの医療機関にご相談ください。
          </p>
        </div>
      </div>
    </div>
  );
} 