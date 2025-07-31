'use client';

import { Coordinator } from '@/types';

interface CoordinatorCardProps {
  coordinator: Coordinator;
  onSwipe?: (direction: 'left' | 'right') => void;
  isDragging?: boolean;
  dragOffset?: number;
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
  dragOffset = 0 
}: CoordinatorCardProps) {
  const cardOpacity = isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset) / 200) : 1;
  const cardRotation = isDragging ? dragOffset * 0.05 : 0;
  
  return (
    <div 
      className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-200 flex flex-col"
      style={{
        opacity: cardOpacity,
        transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
      }}
    >
      {/* プロフィール写真エリア - コンパクト化 */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-7xl">{coordinator.avatar}</div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(coordinator.serviceType)}`}>
            {coordinator.serviceType}
          </span>
        </div>
      </div>

      {/* プロフィール情報 - スクロール可能 */}
      <div className="flex-1 p-4 overflow-y-auto scrollable">
        {/* 基本情報 */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{coordinator.name}</h2>
          <p className="text-sm text-gray-600">{coordinator.age}歳 • {coordinator.location}</p>
          <p className="text-orange-600 font-medium text-sm">{coordinator.experience}</p>
        </div>

        {/* 趣味 - コンパクト化 */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">趣味</p>
          <div className="flex flex-wrap gap-1">
            {coordinator.hobbies.slice(0, 3).map((hobby, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {hobby}
              </span>
            ))}
            {coordinator.hobbies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{coordinator.hobbies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* 提供可能な支援メニュー - グリッド最適化 */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">提供可能な支援</p>
          <div className="grid grid-cols-2 gap-1">
            {coordinator.supportMenus.slice(0, 4).map((menu, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 text-xs text-gray-700 bg-blue-50 px-2 py-1 rounded"
              >
                <span className="text-sm">{getSupportMenuIcon(menu)}</span>
                <span className="truncate">{menu}</span>
              </div>
            ))}
          </div>
          {coordinator.supportMenus.length > 4 && (
            <p className="text-xs text-gray-500 mt-1">他{coordinator.supportMenus.length - 4}件</p>
          )}
        </div>

        {/* 対応可能時間 - コンパクト化 */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">対応可能時間</p>
          <div className="flex flex-wrap gap-1">
            {coordinator.availableTimes.slice(0, 2).map((time, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {time}
              </span>
            ))}
            {coordinator.availableTimes.length > 2 && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                他{coordinator.availableTimes.length - 2}件
              </span>
            )}
          </div>
        </div>

        {/* 自己紹介 - 文字数制限 */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            {coordinator.description.length > 60 
              ? `${coordinator.description.substring(0, 60)}...` 
              : coordinator.description
            }
          </p>
        </div>
      </div>

      {/* アクションボタン - 固定下部 */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3 mb-2">
          <button 
            onClick={() => onSwipe?.('left')}
            className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            スキップ
          </button>
          <button 
            onClick={() => onSwipe?.('right')}
            className="flex-1 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm"
          >
            マッチング申請
          </button>
        </div>

        {/* プロフィール詳細リンク */}
        <button className="w-full py-1 text-orange-600 text-xs font-medium hover:text-orange-700 transition-colors">
          プロフィール詳細を見る
        </button>
      </div>
    </div>
  );
} 