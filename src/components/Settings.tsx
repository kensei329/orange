'use client';

import { useState } from 'react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [userName, setUserName] = useState('田中 太郎');
  const [userRole, setUserRole] = useState('当事者');
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsEditing(false);
    // 実際の実装では、ここでサーバーに保存処理を行う
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col safe-area-pt safe-area-pb">
      {/* ヘッダー */}
      <div className="bg-blue-500 text-white px-4 py-4 border-b border-blue-600 flex items-center justify-between">
        <h1 className="text-lg font-bold">設定</h1>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
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
        <div className="p-6">
          
          {/* プロフィール情報 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">プロフィール情報</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                {isEditing ? '編集完了' : '編集'}
              </button>
            </div>

            <div className="space-y-4">
              {/* 名前 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お名前
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{userName}</span>
                  </div>
                )}
              </div>

              {/* 役割 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  役割
                </label>
                {isEditing ? (
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="当事者">当事者</option>
                    <option value="家族">家族</option>
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      userRole === '当事者' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {userRole}
                    </span>
                  </div>
                )}
              </div>

              {/* 保存ボタン（編集中のみ表示） */}
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  保存
                </button>
              )}
            </div>
          </div>

          {/* アプリ情報 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">アプリ情報</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">バージョン</span>
                <span className="text-gray-800 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">最終更新</span>
                <span className="text-gray-800 font-medium">2024年1月</span>
              </div>
            </div>
          </div>

          {/* サポート */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">サポート</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">ヘルプ・使い方</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">お問い合わせ</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">プライバシーポリシー</span>
                  <span className="text-gray-400">›</span>
                </div>
              </button>
            </div>
          </div>

        </div>
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