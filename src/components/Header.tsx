'use client';

interface HeaderProps {
  onFilterClick: () => void;
  hasActiveFilters: boolean;
}

export default function Header({ onFilterClick, hasActiveFilters }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* ロゴ */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🍊</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">オレンジコネクト</h1>
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center gap-3">
          {/* フィルターボタン */}
          <button
            onClick={onFilterClick}
            className={`p-2 rounded-lg transition-colors relative ${
              hasActiveFilters 
                ? 'bg-orange-100 text-orange-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" 
              />
            </svg>
            
            {/* フィルター有効インジケーター */}
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
            )}
          </button>

          {/* メニューボタン */}
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* サブタイトル */}
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          あなたにぴったりのコーディネーターを見つけましょう
        </p>
      </div>
    </header>
  );
} 