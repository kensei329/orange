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
  const cardOpacity = isDragging ? Math.max(0.5, 1 - Math.abs(dragOffset) / 150) : 1;
  const cardRotation = isDragging ? dragOffset * 0.1 : 0;
  
  return (
    <div 
      className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200"
      style={{
        opacity: cardOpacity,
        transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
      }}
    >
      {/* プロフィール写真エリア */}
      <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-8xl">{coordinator.avatar}</div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(coordinator.serviceType)}`}>
            {coordinator.serviceType}
          </span>
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="p-6">
        {/* 基本情報 */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{coordinator.name}</h2>
          <p className="text-gray-600">{coordinator.age}歳 • {coordinator.location}</p>
          <p className="text-orange-600 font-medium">{coordinator.experience}</p>
        </div>

        {/* 趣味 */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">趣味</p>
          <div className="flex flex-wrap gap-2">
            {coordinator.hobbies.map((hobby, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* 提供可能な支援メニュー */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">提供可能な支援</p>
          <div className="grid grid-cols-2 gap-2">
            {coordinator.supportMenus.map((menu, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-lg">{getSupportMenuIcon(menu)}</span>
                <span>{menu}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 対応可能時間 */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">対応可能時間</p>
          <div className="flex flex-wrap gap-2">
            {coordinator.availableTimes.map((time, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* 自己紹介 */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {coordinator.description}
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-4">
          <button 
            onClick={() => onSwipe?.('left')}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            スキップ
          </button>
          <button 
            onClick={() => onSwipe?.('right')}
            className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            マッチング申請
          </button>
        </div>

        {/* プロフィール詳細リンク */}
        <button className="w-full mt-3 py-2 text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
          プロフィール詳細を見る
        </button>
      </div>
    </div>
  );
} 