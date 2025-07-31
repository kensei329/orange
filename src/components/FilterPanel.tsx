'use client';

import { useState } from 'react';
import { FilterOptions } from '@/types';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const serviceTypes = ['スポット型', '担当者固定型', '両方対応'];
const supportMenus = [
  '買い物支援',
  '電車同行', 
  '外出同行',
  '単発相談',
  '継続的相談',
  'ケアプラン相談'
];
const availableTimes = [
  '平日9-17時',
  '平日18-21時',
  '土曜9-15時',
  '土日祝10-16時',
  '休日10-18時'
];

export default function FilterPanel({ isOpen, onClose, onApplyFilter, currentFilters }: FilterPanelProps) {
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>(
    currentFilters.serviceType || []
  );
  const [selectedSupportMenus, setSelectedSupportMenus] = useState<string[]>(
    currentFilters.supportMenus || []
  );
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState<string[]>(
    currentFilters.availableTimes || []
  );

  const toggleSelection = (
    value: string,
    currentSelection: string[],
    setSelection: (values: string[]) => void
  ) => {
    if (currentSelection.includes(value)) {
      setSelection(currentSelection.filter(item => item !== value));
    } else {
      setSelection([...currentSelection, value]);
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      serviceType: selectedServiceTypes.length > 0 ? selectedServiceTypes : undefined,
      supportMenus: selectedSupportMenus.length > 0 ? selectedSupportMenus : undefined,
      availableTimes: selectedAvailableTimes.length > 0 ? selectedAvailableTimes : undefined,
    });
    onClose();
  };

  const handleClearFilter = () => {
    setSelectedServiceTypes([]);
    setSelectedSupportMenus([]);
    setSelectedAvailableTimes([]);
  };

  const hasActiveFilters = selectedServiceTypes.length > 0 || 
                          selectedSupportMenus.length > 0 || 
                          selectedAvailableTimes.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">絞り込み検索</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* サービスタイプ */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">サービスタイプ</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleSelection(type, selectedServiceTypes, setSelectedServiceTypes)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedServiceTypes.includes(type)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 支援メニュー */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">支援メニュー</h3>
            <div className="grid grid-cols-2 gap-2">
              {supportMenus.map((menu) => (
                <button
                  key={menu}
                  onClick={() => toggleSelection(menu, selectedSupportMenus, setSelectedSupportMenus)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    selectedSupportMenus.includes(menu)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {menu}
                </button>
              ))}
            </div>
          </div>

          {/* 対応可能時間 */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">対応可能時間</h3>
            <div className="flex flex-wrap gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleSelection(time, selectedAvailableTimes, setSelectedAvailableTimes)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedAvailableTimes.includes(time)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="space-y-3">
            <button
              onClick={handleApplyFilter}
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              絞り込みを適用
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilter}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                すべてクリア
              </button>
            )}
          </div>

          {/* 選択中のフィルター表示 */}
          {hasActiveFilters && (
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800 mb-2">選択中の条件</h4>
              <div className="space-y-1 text-sm text-orange-700">
                {selectedServiceTypes.length > 0 && (
                  <div>サービスタイプ: {selectedServiceTypes.join(', ')}</div>
                )}
                {selectedSupportMenus.length > 0 && (
                  <div>支援メニュー: {selectedSupportMenus.join(', ')}</div>
                )}
                {selectedAvailableTimes.length > 0 && (
                  <div>対応時間: {selectedAvailableTimes.join(', ')}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 