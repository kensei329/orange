'use client';

import { useState, useRef, useEffect } from 'react';
import { Coordinator, SwipeDirection } from '@/types';
import CoordinatorCard from './CoordinatorCard';

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
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCoordinator = coordinators[currentIndex];

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
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

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
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

  const handleSwipeAction = (direction: SwipeDirection) => {
    if (currentCoordinator) {
      onSwipe(currentCoordinator, direction);
    }
  };

  if (!currentCoordinator) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">すべてのコーディネーターを確認しました</h2>
          <p className="text-gray-600">新しいコーディネーターが追加されたら通知します</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
      {/* スワイプガイド */}
      {Math.abs(dragOffset) > 50 && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className={`px-4 py-2 rounded-full text-white font-medium ${
            dragOffset > 0 ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {dragOffset > 0 ? '👍 マッチング申請' : '👎 スキップ'}
          </div>
        </div>
      )}

      {/* メインカード */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <CoordinatorCard
          coordinator={currentCoordinator}
          onSwipe={handleSwipeAction}
          isDragging={isDragging}
          dragOffset={dragOffset}
        />
      </div>

      {/* 次のカードプレビュー */}
      {coordinators[currentIndex + 1] && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-sm transform scale-95 opacity-50 -z-10">
            <CoordinatorCard
              coordinator={coordinators[currentIndex + 1]}
            />
          </div>
        </div>
      )}

      {/* カード情報 */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} / {coordinators.length}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          左右にスワイプするか、ボタンをタップしてください
        </p>
      </div>
    </div>
  );
} 