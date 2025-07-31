'use client';

import { useState, useMemo } from 'react';
import { Coordinator, SwipeDirection, FilterOptions } from '@/types';
import { coordinators } from '@/data/coordinators';
import Header from '@/components/Header';
import SwipeArea from '@/components/SwipeArea';
import FilterPanel from '@/components/FilterPanel';
import MatchModal from '@/components/MatchModal';
import MenuModal from '@/components/MenuModal';
import MatchList from '@/components/MatchList';
import Settings from '@/components/Settings';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCoordinators, setSwipedCoordinators] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [matchedCoordinator, setMatchedCoordinator] = useState<Coordinator | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMatchListOpen, setIsMatchListOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const currentCoordinator = filteredCoordinators[currentIndex];

  // マッチしたコーディネーターの情報を取得
  const matchedCoordinators = useMemo(() => {
    return coordinators.filter(coordinator => matches.includes(coordinator.id));
  }, [coordinators, matches]);

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

  const handleSkip = () => {
    if (currentCoordinator) {
      handleSwipe(currentCoordinator, 'left');
    }
  };

  const handleMatch = () => {
    if (currentCoordinator) {
      handleSwipe(currentCoordinator, 'right');
    }
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

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMatchListOpen = () => {
    setIsMatchListOpen(true);
  };

  const handleMatchListClose = () => {
    setIsMatchListOpen(false);
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* 固定ヘッダー */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white">
        <Header 
          onFilterClick={() => setIsFilterOpen(true)}
          hasActiveFilters={hasActiveFilters}
          onMenuClick={handleMenuOpen}
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

      {/* メインコンテンツ - スワイプエリア（フッター縮小分カード領域拡大） */}
      <main className="flex-1 flex flex-col pt-[100px] pb-[100px]" style={{ height: '100vh' }}>
        <div className="flex-1 overflow-hidden">
          <SwipeArea
            coordinators={filteredCoordinators}
            onSwipe={handleSwipe}
            currentIndex={currentIndex}
          />
        </div>
      </main>

      {/* 固定フッター - アクションボタン（高さ50%に縮小） */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-pb">
        {/* マッチ統計 */}
        <div className="px-4 py-1 border-b border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              マッチ数: <span className="font-medium text-orange-600">{matches.length}</span> 件
            </p>
            {hasActiveFilters && (
              <p className="text-xs text-gray-500">
                {filteredCoordinators.length} 件のコーディネーターが見つかりました
              </p>
            )}
          </div>
        </div>

        {/* スキップ・マッチング申請ボタン（高さを50%に縮小） */}
        {currentCoordinator && (
          <div className="px-4 py-2">
            <div className="flex gap-4">
              <button
                onClick={handleSkip}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-2xl font-bold text-base hover:bg-gray-200 transition-colors flex items-center justify-center shadow-sm"
              >
                スキップ
              </button>
              <button
                onClick={handleMatch}
                className="flex-1 py-2 bg-orange-500 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-colors flex items-center justify-center shadow-sm"
              >
                マッチング申請
              </button>
            </div>
          </div>
        )}
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

      {/* メニューモーダル */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onMatchList={handleMatchListOpen}
        onSettings={handleSettingsOpen}
      />

      {/* マッチング一覧 */}
      <MatchList
        isOpen={isMatchListOpen}
        onClose={handleMatchListClose}
        matches={matchedCoordinators}
      />

      {/* 設定 */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={handleSettingsClose}
      />
    </div>
  );
}
