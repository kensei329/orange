'use client';

import { Coordinator } from '@/types';

interface CoordinatorCardProps {
  coordinator: Coordinator;
  onSwipe?: (direction: 'left' | 'right') => void;
  isDragging?: boolean;
  dragOffset?: number;
  onShowDetail?: () => void;
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
  onShowDetail
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
      {/* 氏名・年齢・住所を指定形式で表示、顔写真を左上に配置 */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-3 border-b border-orange-200">
        <div className="flex items-center justify-between">
          {/* 顔写真 - 左上に配置 */}
          <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-md mr-3 flex-shrink-0">
            <div className="text-xl">{coordinator.avatar}</div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {coordinator.name}({coordinator.age}歳){coordinator.location}
            </h2>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-4">
        {/* 経歴とサービスタイプ */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-orange-600 font-medium text-sm flex-1">{coordinator.experience}</p>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${getServiceTypeColor(coordinator.serviceType)}`}>
            {coordinator.serviceType}
          </span>
        </div>

        {/* 提供可能な支援メニュー */}
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
                <span className="flex-1 truncate">{menu}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 対応可能時間 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <span className="mr-2">⏰</span>対応可能時間
          </h3>
          <div className="flex flex-wrap gap-1">
            {coordinator.availableTimes.map((time, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded-md border border-blue-200 whitespace-nowrap"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* 詳細ボタン - 対応時間直下に配置 */}
        <button 
          onClick={onShowDetail}
          className="w-full py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">📋</span>
          <span>詳細プロフィールを見る</span>
        </button>
      </div>
    </div>
  );
} 