import { Coordinator } from '@/types';

export const coordinators: Coordinator[] = [
  {
    id: '1',
    name: '田中 さやか',
    age: 34,
    avatar: '👩‍⚕️',
    hobbies: ['読書', 'ヨガ', 'カフェ巡り'],
    serviceType: '両方対応',
    supportMenus: ['買い物支援', '外出同行', '継続的相談', 'ケアプラン相談'],
    availableTimes: ['平日9-17時', '土曜9-15時'],
    experience: '介護福祉士 8年',
    description: '認知症ケアの専門家として、お一人お一人に寄り添った支援を心がけています。',
    location: '東京都渋谷区'
  },
  {
    id: '2',
    name: '佐藤 健太',
    age: 28,
    avatar: '👨‍💼',
    hobbies: ['スポーツ観戦', '料理', '音楽'],
    serviceType: 'スポット型',
    supportMenus: ['電車同行', '単発相談', '買い物支援'],
    availableTimes: ['平日18-21時', '休日10-18時'],
    experience: 'ソーシャルワーカー 5年',
    description: '仕事帰りや休日の急な相談にも対応可能です。気軽にお声かけください。',
    location: '東京都新宿区'
  },
  {
    id: '3',
    name: '山田 美智子',
    age: 45,
    avatar: '👩‍🏫',
    hobbies: ['ガーデニング', '映画鑑賞', 'お菓子作り'],
    serviceType: '担当者固定型',
    supportMenus: ['継続的相談', 'ケアプラン相談', '外出同行'],
    availableTimes: ['平日10-16時'],
    experience: 'ケアマネジャー 12年',
    description: '長期的なサポートを通じて、ご本人とご家族の生活の質向上をお手伝いします。',
    location: '東京都世田谷区'
  },
  {
    id: '4',
    name: '鈴木 太郎',
    age: 39,
    avatar: '👨‍⚕️',
    hobbies: ['ランニング', '写真', '温泉巡り'],
    serviceType: '両方対応',
    supportMenus: ['単発相談', '継続的相談', '買い物支援', '電車同行'],
    availableTimes: ['平日14-20時', '土日祝10-16時'],
    experience: '作業療法士 10年',
    description: 'リハビリの専門知識を活かし、日常生活の自立をサポートします。',
    location: '東京都品川区'
  },
  {
    id: '5',
    name: '高橋 ゆかり',
    age: 31,
    avatar: '👩‍💼',
    hobbies: ['旅行', 'ボランティア', '手芸'],
    serviceType: 'スポット型',
    supportMenus: ['外出同行', '買い物支援', '単発相談'],
    availableTimes: ['平日9-15時', '土曜9-12時'],
    experience: '精神保健福祉士 6年',
    description: '心理的なサポートも含めて、安心してお過ごしいただけるよう支援します。',
    location: '東京都杉並区'
  },
  {
    id: '6',
    name: '中村 隆',
    age: 52,
    avatar: '👨‍🎓',
    hobbies: ['将棋', '読書', '散歩'],
    serviceType: '担当者固定型',
    supportMenus: ['ケアプラン相談', '継続的相談', '外出同行'],
    availableTimes: ['平日9-17時'],
    experience: '社会福祉士 20年',
    description: '豊富な経験を活かし、包括的な支援プランを提案いたします。',
    location: '東京都練馬区'
  }
]; 