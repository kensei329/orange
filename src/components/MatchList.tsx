'use client';

import { Coordinator } from '@/types';

interface MatchListProps {
  isOpen: boolean;
  onClose: () => void;
  matches: Coordinator[];
}

export default function MatchList({ isOpen, onClose, matches }: MatchListProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col safe-area-pt safe-area-pb">
      {/* ヘッダー */}
      <div className="bg-orange-500 text-white px-4 py-4 border-b border-orange-600 flex items-center justify-between">
        <h1 className="text-lg font-bold">マッチング一覧</h1>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white hover:bg-orange-700 transition-colors"
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

      {/* コンテンツ */}
      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          // マッチング履歴がない場合
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💔</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">まだマッチングがありません</h2>
              <p className="text-gray-600 text-sm">
                スワイプしてコーディネーターとマッチングしましょう！
              </p>
            </div>
          </div>
        ) : (
          // マッチング履歴がある場合
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                マッチング数: <span className="font-bold text-orange-600">{matches.length}</span> 件
              </p>
            </div>
            
            <div className="space-y-3">
              {matches.map((coordinator, index) => (
                <div 
                  key={coordinator.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {/* 顔写真 */}
                    <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-xl">{coordinator.avatar}</div>
                    </div>
                    
                    {/* 基本情報 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">
                        {coordinator.name}({coordinator.age}歳)
                      </h3>
                      <p className="text-sm text-gray-600 truncate">{coordinator.location}</p>
                      <p className="text-xs text-orange-600">{coordinator.experience}</p>
                    </div>
                    
                    {/* サービスタイプ */}
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        coordinator.serviceType === 'スポット型' 
                          ? 'bg-blue-100 text-blue-800'
                          : coordinator.serviceType === '担当者固定型'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {coordinator.serviceType}
                      </span>
                    </div>
                  </div>

                  {/* 提供支援メニュー */}
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {coordinator.supportMenus.slice(0, 3).map((menu, menuIndex) => (
                        <span 
                          key={menuIndex}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
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

                  {/* アクションボタン */}
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                      チャット
                    </button>
                    <button className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                      電話
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}