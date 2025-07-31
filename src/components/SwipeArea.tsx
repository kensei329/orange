'use client';

import { useState, useRef, useEffect } from 'react';
import { Coordinator, SwipeDirection } from '@/types';
import CoordinatorCard from './CoordinatorCard';
import ProfileDetailModal from './ProfileDetailModal';

interface SwipeAreaProps {
  coordinators: Coordinator[];
  onSwipe: (coordinator: Coordinator, direction: SwipeDirection) => void;
  currentIndex: number;
}

export default function SwipeArea({ coordinators, onSwipe, currentIndex }: SwipeAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCoordinator = coordinators[currentIndex];

  // スワイプヒントを3秒後に非表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // カードが変わったらヒントを再表示
  useEffect(() => {
    if (currentCoordinator) {
      setShowSwipeHint(true);
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentCoordinator?.id]);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setShowSwipeHint(false);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    
    setCurrentX(clientX);
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleEnd = () => {
    if (!isDragging || !currentCoordinator) return;
    
    const offset = currentX - startX;
    const threshold = 100;
    
    if (Math.abs(offset) > threshold) {
      const direction: SwipeDirection = offset > 0 ? 'right' : 'left';
      onSwipe(currentCoordinator, direction);
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  // Global mouse events
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
      };

      const handleGlobalMouseUp = () => {
        handleEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startX, currentX]);

  const handleShowDetail = () => {
    setIsDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
  };

  if (!currentCoordinator) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">すべてのコーディネーターを確認しました</h2>
          <p className="text-gray-600 text-sm">新しいコーディネーターが追加されたら通知します</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-full flex flex-col justify-center p-4 pt-8">
        {/* スワイプヒント - 初回表示時のみ */}
        {showSwipeHint && !isDragging && (
          <div className="absolute top-8 left-0 right-0 z-20">
            <div className="flex justify-between items-center px-8">
              {/* 左スワイプヒント (スキップ) */}
              <div className="flex flex-col items-center animate-bounce">
                <div className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                  スキップ
                </div>
                <div className="text-red-500 text-2xl mt-1">←</div>
              </div>
              
              {/* 右スワイプヒント (マッチング) */}
              <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                  マッチング
                </div>
                <div className="text-green-500 text-2xl mt-1">→</div>
              </div>
            </div>
          </div>
        )}

        {/* スワイプガイド - ドラッグ中 */}
        {Math.abs(dragOffset) > 50 && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
            <div className={`px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-200 ${
              dragOffset > 0 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-red-500 animate-pulse'
            }`}>
              {dragOffset > 0 ? 'マッチング申請' : 'スキップ'}
            </div>
          </div>
        )}

        {/* メインカード - 表示領域を最大化、ヘッダーとの間隔を調整 */}
        <div
          ref={cardRef}
          className={`relative w-full max-w-sm mx-auto cursor-grab active:cursor-grabbing ${
            showSwipeHint && !isDragging ? 'animate-wiggle' : ''
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            touchAction: 'none',
            height: 'calc(100vh - 240px)', // フッターボタンを小さくした分、カード領域を拡大
            maxHeight: '700px',
            minHeight: '500px'
          }}
        >
          <CoordinatorCard
            coordinator={currentCoordinator}
            isDragging={isDragging}
            dragOffset={dragOffset}
            onShowDetail={handleShowDetail}
          />
        </div>

        {/* 次のカードプレビュー */}
        {coordinators[currentIndex + 1] && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="w-full max-w-sm transform scale-95 opacity-30">
              <CoordinatorCard
                coordinator={coordinators[currentIndex + 1]}
              />
            </div>
          </div>
        )}

        {/* カード情報 */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {currentIndex + 1} / {coordinators.length}
            </p>
            {!showSwipeHint && (
              <p className="text-xs text-gray-400">
                左右にスワイプするか、下のボタンをタップ
              </p>
            )}
          </div>
        </div>
      </div>

      {/* プロフィール詳細モーダル */}
      <ProfileDetailModal
        isOpen={isDetailModalOpen}
        coordinator={currentCoordinator}
        onClose={handleCloseDetail}
      />
    </>
  );
} 