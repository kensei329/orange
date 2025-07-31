'use client';

import { useState } from 'react';
import { Coordinator } from '@/types';

interface CoordinatorCardProps {
  coordinator: Coordinator;
  onSwipe?: (direction: 'left' | 'right') => void;
  isDragging?: boolean;
  dragOffset?: number;
  onProfileDetail?: () => void;
}

const getServiceTypeColor = (serviceType: string) => {
  switch (serviceType) {
    case 'スポット型':
      return 'bg-blue-100 text-blue-800';
    case '担当者固定型':
      return 'bg-green-100 text-green-800';
    case '両方対応':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSupportMenuIcon = (menu: string) => {
  switch (menu) {
    case '買い物支援':
      return '🛒';
    case '電車同行':
      return '🚃';
    case '外出同行':
      return '🚶‍♀️';
    case '単発相談':
      return '💬';
    case '継続的相談':
      return '📋';
    case 'ケアプラン相談':
      return '📝';
    default:
      return '🤝';
  }
};

export default function CoordinatorCard({ 
  coordinator, 
  onSwipe, 
  isDragging = false, 
  dragOffset = 0,
  onProfileDetail
}: CoordinatorCardProps) {
  const [isDetailView, setIsDetailView] = useState(false);
  
  const cardOpacity = isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset) / 200) : 1;
  const cardRotation = isDragging ? dragOffset * 0.05 : 0;

  const handleProfileDetail = () => {
    setIsDetailView(!isDetailView);
    onProfileDetail?.();
  };
  
  return (
    <div 
      className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-200 flex flex-col"
      style={{
        opacity: cardOpacity,
        transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
      }}
    >
      {/* ヘッダー部分 - 基本情報と顔写真 */}
      <div className="relative p-4 bg-gradient-to-r from-orange-50 to-orange-100">
        {/* 顔写真 - 右上に小さく表示 */}
        <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-md">
          <div className="text-3xl">{coordinator.avatar}</div>
        </div>

        {/* サービスタイプタグ - 左上 */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(coordinator.serviceType)}`}>
            {coordinator.serviceType}
          </span>
        </div>

        {/* 基本情報 - 左側メイン */}
        <div className="pr-20 pt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{coordinator.name}</h2>
          <p className="text-sm text-gray-600 mb-1">{coordinator.age}歳 • {coordinator.location}</p>
          <p className="text-orange-600 font-medium text-sm">{coordinator.experience}</p>
        </div>
      </div>

      {/* メインコンテンツ - スクロール可能 */}
      <div className="flex-1 p-4 overflow-y-auto scrollable">
        {/* 趣味 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🎨</span>趣味
          </h3>
          <div className="flex flex-wrap gap-2">
            {(isDetailView ? coordinator.hobbies : coordinator.hobbies.slice(0, 3)).map((hobby, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {hobby}
              </span>
            ))}
            {!isDetailView && coordinator.hobbies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{coordinator.hobbies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* 提供可能な支援メニュー - 全て表示 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">🤝</span>提供可能な支援
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {coordinator.supportMenus.map((menu, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-xs text-gray-700 bg-green-50 px-2 py-2 rounded-lg"
              >
                <span className="text-base">{getSupportMenuIcon(menu)}</span>
                <span className="flex-1">{menu}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 対応可能時間 - 全て表示 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">⏰</span>対応可能時間
          </h3>
          <div className="space-y-2">
            {coordinator.availableTimes.map((time, index) => (
              <div 
                key={index}
                className="px-3 py-2 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-200"
              >
                {time}
              </div>
            ))}
          </div>
        </div>

        {/* 自己紹介 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">💭</span>自己紹介
          </h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              {isDetailView 
                ? coordinator.description 
                : coordinator.description.length > 80 
                  ? `${coordinator.description.substring(0, 80)}...` 
                  : coordinator.description
              }
            </p>
          </div>
        </div>

        {/* 詳細表示時のみ表示される追加情報 */}
        {isDetailView && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="mr-2">📍</span>所在地詳細
            </h3>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">{coordinator.location}</p>
              <p className="text-xs text-gray-500 mt-1">
                ※ 実際の相談場所は、マッチング後に相談して決定いたします
              </p>
            </div>
          </div>
        )}
      </div>

      {/* プロフィール詳細ボタン - カード内下部 */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleProfileDetail}
          className="w-full py-2 text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          {isDetailView ? (
            <>
              <span>📝</span>
              <span>基本情報に戻る</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>プロフィール詳細を見る</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 