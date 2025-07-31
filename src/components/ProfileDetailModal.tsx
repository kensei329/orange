'use client';

import { Coordinator } from '@/types';

interface ProfileDetailModalProps {
  isOpen: boolean;
  coordinator: Coordinator | null;
  onClose: () => void;
}

export default function ProfileDetailModal({ 
  isOpen, 
  coordinator, 
  onClose 
}: ProfileDetailModalProps) {
  if (!isOpen || !coordinator) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col safe-area-pt safe-area-pb">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-4 border-b border-orange-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-xl flex items-center justify-center">
            <div className="text-2xl">{coordinator.avatar}</div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{coordinator.name}</h2>
            <p className="text-sm text-gray-600">{coordinator.experience}</p>
          </div>
        </div>
        
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
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

      {/* コンテンツエリア - スクロール可能 */}
      <div className="flex-1 overflow-y-auto scrollable">
        <div className="p-6 space-y-6">
          
          {/* 基本情報 */}
          <div className="bg-orange-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">👤</span>基本情報
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">年齢:</span>
                <span className="font-medium">{coordinator.age}歳</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">所在地:</span>
                <span className="font-medium">{coordinator.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">サービスタイプ:</span>
                <span className="font-medium">{coordinator.serviceType}</span>
              </div>
            </div>
          </div>

          {/* 趣味 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🎨</span>趣味・興味
            </h3>
            <div className="flex flex-wrap gap-2">
              {coordinator.hobbies.map((hobby, index) => (
                <span 
                  key={index}
                  className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* 自己紹介 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">💭</span>自己紹介
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed text-base">
                {coordinator.description}
              </p>
            </div>
          </div>

          {/* 提供サービス詳細 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🤝</span>提供可能な支援サービス
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {coordinator.supportMenus.map((menu, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="text-2xl">
                    {menu === '買い物支援' && '🛒'}
                    {menu === '電車同行' && '🚃'}
                    {menu === '外出同行' && '🚶‍♀️'}
                    {menu === '単発相談' && '💬'}
                    {menu === '継続的相談' && '📋'}
                    {menu === 'ケアプラン相談' && '📝'}
                  </span>
                  <span className="text-gray-800 font-medium">{menu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 対応可能時間詳細 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">⏰</span>対応可能時間
            </h3>
            <div className="space-y-2">
              {coordinator.availableTimes.map((time, index) => (
                <div 
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <span className="text-blue-800 font-medium">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">📝 ご利用にあたって</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 実際の相談場所は、マッチング後に相談して決定いたします</li>
              <li>• 相談内容によっては、返信に時間がかかる場合があります</li>
              <li>• 緊急時は最寄りの医療機関にご相談ください</li>
            </ul>
          </div>

        </div>
      </div>

      {/* フッター */}
      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          カード画面に戻る
        </button>
      </div>
    </div>
  );
} 