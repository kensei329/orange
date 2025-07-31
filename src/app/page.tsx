'use client';

import { useState, useMemo } from 'react';
import { Coordinator, SwipeDirection, FilterOptions } from '@/types';
import { coordinators } from '@/data/coordinators';
import Header from '@/components/Header';
import SwipeArea from '@/components/SwipeArea';
import FilterPanel from '@/components/FilterPanel';
import MatchModal from '@/components/MatchModal';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCoordinators, setSwipedCoordinators] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [matchedCoordinator, setMatchedCoordinator] = useState<Coordinator | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  // フィルター適用されたコーディネーターリスト
  const filteredCoordinators = useMemo(() => {
    return coordinators.filter(coordinator => {
      // 既にスワイプされたコーディネーターを除外
      if (swipedCoordinators.has(coordinator.id)) {
        return false;
      }

      // サービスタイプフィルター
      if (currentFilters.serviceType && currentFilters.serviceType.length > 0) {
        if (!currentFilters.serviceType.includes(coordinator.serviceType)) {
          return false;
        }
      }

      // 支援メニューフィルター
      if (currentFilters.supportMenus && currentFilters.supportMenus.length > 0) {
        const hasMatchingMenu = currentFilters.supportMenus.some(menu => 
          coordinator.supportMenus.includes(menu)
        );
        if (!hasMatchingMenu) {
          return false;
        }
      }

      // 対応可能時間フィルター
      if (currentFilters.availableTimes && currentFilters.availableTimes.length > 0) {
        const hasMatchingTime = currentFilters.availableTimes.some(time => 
          coordinator.availableTimes.includes(time)
        );
        if (!hasMatchingTime) {
          return false;
        }
      }

      return true;
    });
  }, [coordinators, swipedCoordinators, currentFilters]);

  const handleSwipe = (coordinator: Coordinator, direction: SwipeDirection) => {
    // スワイプされたコーディネーターを記録
    setSwipedCoordinators(prev => new Set([...prev, coordinator.id]));

    if (direction === 'right') {
      // マッチング成立
      setMatches(prev => [...prev, coordinator.id]);
      setMatchedCoordinator(coordinator);
      setIsMatchModalOpen(true);
    }

    // 次のカードに進む
    setCurrentIndex(0); // フィルターされたリストの最初に戻る
  };

  const handleApplyFilter = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    setCurrentIndex(0); // フィルター適用後は最初のカードに戻る
  };

  const hasActiveFilters = useMemo(() => {
    return !!(
      (currentFilters.serviceType && currentFilters.serviceType.length > 0) ||
      (currentFilters.supportMenus && currentFilters.supportMenus.length > 0) ||
      (currentFilters.availableTimes && currentFilters.availableTimes.length > 0)
    );
  }, [currentFilters]);

  const handleStartChat = () => {
    setIsMatchModalOpen(false);
    // チャット機能の実装（将来実装）
    alert('チャット機能は今後実装予定です');
  };

  const handleMakeCall = () => {
    setIsMatchModalOpen(false);
    // 電話機能の実装（将来実装）
    alert('電話機能は今後実装予定です');
  };

  const handleCloseMatchModal = () => {
    setIsMatchModalOpen(false);
    setMatchedCoordinator(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* 固定ヘッダー */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white">
        <Header 
          onFilterClick={() => setIsFilterOpen(true)}
          hasActiveFilters={hasActiveFilters}
        />
        
        {/* アクティブフィルター表示 */}
        {hasActiveFilters && (
          <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-orange-800">
                🔍 絞り込み条件が適用されています
              </div>
              <button
                onClick={() => setCurrentFilters({})}
                className="text-xs text-orange-600 hover:text-orange-700 font-medium"
              >
                クリア
              </button>
            </div>
          </div>
        )}
      </div>

      {/* メインコンテンツ - ヘッダー分の上マージンを追加 */}
      <main className="flex-1 flex flex-col pt-[120px] pb-[80px]" style={{ height: '100vh' }}>
        {/* スワイプエリア - iPhone 12 Pro最適化 */}
        <div className="flex-1 overflow-hidden">
          <SwipeArea
            coordinators={filteredCoordinators}
            onSwipe={handleSwipe}
            currentIndex={currentIndex}
          />
        </div>
      </main>

      {/* 固定フッター - マッチ統計 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 safe-area-pb">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            マッチ数: <span className="font-medium text-orange-600">{matches.length}</span> 件
          </p>
          {hasActiveFilters && (
            <p className="text-xs text-gray-500 mt-1">
              {filteredCoordinators.length} 件のコーディネーターが見つかりました
            </p>
          )}
        </div>
      </div>

      {/* フィルターパネル */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilter={handleApplyFilter}
        currentFilters={currentFilters}
      />

      {/* マッチモーダル */}
      <MatchModal
        isOpen={isMatchModalOpen}
        coordinator={matchedCoordinator}
        onClose={handleCloseMatchModal}
        onStartChat={handleStartChat}
        onMakeCall={handleMakeCall}
      />
    </div>
  );
}
