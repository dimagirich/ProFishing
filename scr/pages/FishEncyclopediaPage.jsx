import React, { useState, useEffect } from 'react';

const INITIAL_FISH_DATA = [
  {
    id: 'pike',
    name: 'Щука',
    category: 'predator',
    image: '/fishs/pike.jpg',
    minSize: '35–40 см',
    habitat: 'Травянистые мелководья, коряжник, бровки, омуты со слабым течением.',
    baits: ['Живец', 'Воблеры', 'Колеблющиеся блесны', 'Крупный силикон'],
    seasons: { spring: 'High', summer: 'Medium', autumn: 'High', winter: 'Medium' },
    description: 'Агрессивный засадный хищник.',
    calcFactor: { a: 0.008, b: 3.05 }, // Коэффициенты для расчёта веса
    tackle: { line: '0.28–0.35 мм (или шнур #1.2–#2.0)', hook: '№2–№2/0 (или тройники №4–№2)', rod: 'Спиннинг (Тест 10–30г)' }
  },
  {
    id: 'chub',
    name: 'Голавль',
    category: 'predator',
    image: '/fishs/голавль.jpg',
    minSize: '20–25 см',
    habitat: 'Реки с быстрым течением, перекаты, участки под нависающими деревьями.',
    baits: ['Волкеры', 'Кренки', 'Майский жук', 'Кузнечик', 'Микроколебалки'],
    seasons: { spring: 'High', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Осторожная и сильная речная рыба, любитель быстрого течения.',
    calcFactor: { a: 0.012, b: 2.98 },
    tackle: { line: 'Шнур #0.6–#0.8 (0.12–0.14 мм)', hook: '№8–№10', rod: 'Лайт спиннинг (Тест 2–10г)' }
  },
  {
    id: 'snakehead',
    name: 'Змейголов',
    category: 'predator',
    image: '/fishs/змейголов.jpg',
    minSize: '40 см',
    habitat: 'Заросшие мелководья, болота, густая растительность.',
    baits: ['Лягушки-незацепляйки', 'Глиссеры', 'Крупный силикон'],
    seasons: { spring: 'Medium', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Мощный и агрессивный хищник, дышащий атмосферным воздухом.',
    calcFactor: { a: 0.009, b: 3.1 },
    tackle: { line: 'Плетенка 0.35–0.40 мм (PE #4–#6)', hook: 'Двойники незацепляйки №3/0–5/0', rod: 'Удилище Heavy/Extra Heavy' }
  },
  {
    id: 'carp',
    name: 'Карп / Сазан',
    category: 'peaceful',
    image: '/fishs/карпсазан.jpg',
    minSize: '30–35 см',
    habitat: 'Прогреваемые участки с подводной растительностью, коряжник, ямы.',
    baits: ['Бойлы', 'Пеллетс', 'Сладкая кукуруза', 'Выползок'],
    seasons: { spring: 'Low', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Сильная рыба, требующая мощных снастей и хорошей прикормки.',
    calcFactor: { a: 0.015, b: 3.0 },
    tackle: { line: 'Леска 0.30–0.35 мм + шок-лидер', hook: 'Карповые №4–№8', rod: 'Карповое удилище 3.5 lb' }
  },
  {
    id: 'bream',
    name: 'Лещ',
    category: 'peaceful',
    image: '/fishs/лещ.jpg',
    minSize: '25–32 см',
    habitat: 'Глубокие участки рек и озер, русловые бровки, илистое дно.',
    baits: ['Пучок опарышей', 'Мотыль', 'Навозный червь', 'Вареный горох'],
    seasons: { spring: 'Medium', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Стайная осторожная рыба, кормящаяся преимущественно со дна.',
    calcFactor: { a: 0.011, b: 3.02 },
    tackle: { line: 'Леска 0.14–0.18 мм (Поводок 0.10–0.12 мм)', hook: 'Фидерные №12–№16', rod: 'Фидер (Тест 60–100г)' }
  },
  {
    id: 'marinka',
    name: 'Маринка',
    category: 'peaceful',
    image: '/fishs/Маринка.jpg',
    minSize: '20–25 см',
    habitat: 'Горные и предгорные реки с быстрым течением и каменистым дном.',
    baits: ['Сверчок', 'Личинка жука', 'Червь', 'Маленькие блесны'],
    seasons: { spring: 'High', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Рыба горно-речных водоемов.',
    calcFactor: { a: 0.010, b: 3.0 },
    tackle: { line: 'Леска 0.20–0.25 мм', hook: '№6–№8', rod: 'Донное/Поплавочное удилище' }
  },
  {
    id: 'burbot',
    name: 'Налим',
    category: 'predator',
    image: '/fishs/налим.jpg',
    minSize: '35–40 см',
    habitat: 'Глубокие ямы с холодной водой, каменистое дно, закоряженные русла.',
    baits: ['Мертвая рыбка', 'Пучок выползков', 'Рыбья печень', 'Живец'],
    seasons: { spring: 'Low', summer: 'Low', autumn: 'High', winter: 'High' },
    description: 'Единственный пресноводный представитель тресковых. Активен ночью.',
    calcFactor: { a: 0.006, b: 3.12 },
    tackle: { line: 'Основная 0.35–0.40 мм', hook: 'Одинарник с длинным цевьем №1–№2/0', rod: 'Мощный фидер/донка' }
  },
  {
    id: 'perch',
    name: 'Окунь',
    category: 'predator',
    image: '/fishs/окунь.jpg',
    minSize: 'Не ограничен',
    habitat: 'Вездесущ: от прибрежных камышей до глубоких бровок.',
    baits: ['Съедобная резина', 'Вертушки', 'Червь', 'Малек'],
    seasons: { spring: 'High', summer: 'High', autumn: 'High', winter: 'High' },
    description: 'Азартный коллективный хищник, активный круглый год.',
    calcFactor: { a: 0.013, b: 3.08 },
    tackle: { line: 'Шнур #0.3–#0.6', hook: 'Офсетники №6–№10', rod: 'Ультралайт/Микроджиг (Тест 0.5–7г)' }
  },
  {
    id: 'catfish',
    name: 'Сом',
    category: 'predator',
    image: '/fishs/сом.jpg',
    minSize: '60–70 см',
    habitat: 'Глубокие омуты, захламленные ямы под корягами и обрывами.',
    baits: ['Крупный выползок', 'Живец', 'Лягушка', 'Перловица'],
    seasons: { spring: 'Medium', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Самый крупный пресноводный хищник наших водоемов.',
    calcFactor: { a: 0.007, b: 3.15 },
    tackle: { line: 'Плетеный шнур 0.50–0.70 мм (100+ lb)', hook: 'Сомовые №8/0–№10/0', rod: 'Сомовый бортовой/троллинговый комплект' }
  },
  {
    id: 'zander',
    name: 'Судак',
    category: 'predator',
    image: '/fishs/судак.jpg',
    minSize: '40–42 см',
    habitat: 'Глубокие ямы с твердым песчаным или каменистым дном.',
    baits: ['Джиг-силикон', 'Узкие блесны', 'Воблеры-минноу'],
    seasons: { spring: 'High', summer: 'Medium', autumn: 'High', winter: 'Medium' },
    description: 'Сумеречный хищник, предпочитающий чистую воду.',
    calcFactor: { a: 0.007, b: 3.12 },
    tackle: { line: 'Шнур #1.0–#1.2 (Флюорокарбон 0.35-0.45 мм)', hook: 'Офсетные №1/0–№3/0', rod: 'Жесткий спиннинг fast/extra fast (Тест 7–28г)' }
  },
  {
    id: 'trout',
    name: 'Форель',
    category: 'salmon',
    image: '/fishs/форель.jpg',
    minSize: '20–25 см',
    habitat: 'Холодные быстрые реки, ручьи, платники.',
    baits: ['Микроколебалки', 'Форелевая паста', 'Силиконовые личинки'],
    seasons: { spring: 'High', summer: 'Low', autumn: 'High', winter: 'Medium' },
    description: 'Быстрая и сильная рыба, требовательная к чистой воде.',
    calcFactor: { a: 0.012, b: 2.95 },
    tackle: { line: 'Монолеска/Флюр 0.14–0.18 мм', hook: 'Безбородые №6–№10', rod: 'Ареа-спиннинг (Тест 0.5–5г)' }
  },
  {
    id: 'ide',
    name: 'Язь',
    category: 'peaceful',
    image: '/fishs/язь.jpg',
    minSize: '25 см',
    habitat: 'Глубокие участки рек с замедленным течением.',
    baits: ['Кузнечик', 'Горох', 'Вертушки', 'Опарыш'],
    seasons: { spring: 'High', summer: 'High', autumn: 'Medium', winter: 'Low' },
    description: 'Всеядная красивая рыба, охотно берущая разные насадки.',
    calcFactor: { a: 0.011, b: 3.01 },
    tackle: { line: 'Леска 0.18–0.22 мм', hook: '№8–№10', rod: 'Проводка / Лайт-спиннинг' }
  }
];

export default function FishEncyclopediaPage() {
  const [fishList, setFishList] = useState(INITIAL_FISH_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedFish, setSelectedFish] = useState(null);
  
  // Состояние калькулятора веса внутри карточки
  const [calcLength, setCalcLength] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState(null);

  useEffect(() => {
    localStorage.removeItem('fish_encyclopedia_data');
  }, []);

  const calculateWeight = (lengthCm, fish) => {
    if (!lengthCm || lengthCm <= 0) {
      setEstimatedWeight(null);
      return;
    }
    const { a, b } = fish.calcFactor;
    // Формула массы: W (граммы) = a * L^b
    const weightGrams = a * Math.pow(Number(lengthCm), b);
    
    if (weightGrams >= 1000) {
      setEstimatedWeight((weightGrams / 1000).toFixed(2) + ' кг');
    } else {
      setEstimatedWeight(Math.round(weightGrams) + ' г');
    }
  };

  const filteredFish = fishList.filter(fish => {
    const matchesSearch = fish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || fish.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="page-title">Атлас и Определитель Рыб</h1>

      <div className="filter-container" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="🔍 Поиск рыбы..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            border: '1px solid var(--primary-blue)',
            width: '100%',
            maxWidth: '300px',
            fontSize: '0.95rem'
          }}
        />
        <div>
          <button className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`} onClick={() => setFilterCategory('all')}>Все</button>
          <button className={`filter-btn ${filterCategory === 'predator' ? 'active' : ''}`} onClick={() => setFilterCategory('predator')}>Хищные</button>
          <button className={`filter-btn ${filterCategory === 'peaceful' ? 'active' : ''}`} onClick={() => setFilterCategory('peaceful')}>Мирные</button>
          <button className={`filter-btn ${filterCategory === 'salmon' ? 'active' : ''}`} onClick={() => setFilterCategory('salmon')}>Лососевые</button>
        </div>
      </div>

      <div className="grid-cards">
        {filteredFish.map(fish => (
          <div key={fish.id} className="card">
            <img src={fish.image} alt={fish.name} />
            <span className="badge">
              {fish.category === 'predator' ? 'Хищник' : fish.category === 'peaceful' ? 'Мирная' : 'Лососевая'}
            </span>
            <h3>{fish.name}</h3>
            <p style={{ fontSize: '0.85rem', margin: '0.5rem 0 1rem 0', opacity: 0.8 }}>
              📏 Норма: <strong>{fish.minSize}</strong>
            </p>
            <button 
              className="control-btn outline"
              style={{ width: '100%' }}
              onClick={() => {
                setSelectedFish(fish);
                setCalcLength('');
                setEstimatedWeight(null);
              }}
            >
              Подробная карточка
            </button>
          </div>
        ))}
      </div>

      {selectedFish && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="upload-form" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2>{selectedFish.name}</h2>
            
            <img 
              src={selectedFish.image} 
              alt={selectedFish.name} 
              style={{ width: '100%', height: '230px', objectFit: 'cover', borderRadius: '8px' }} 
            />

            {/* ВСТРОЕННЫЙ КАЛЬКУЛЯТОР ВЕСА */}
            <div style={{
              background: 'rgba(46, 204, 113, 0.1)',
              padding: '0.8rem',
              borderRadius: '8px',
              marginTop: '1rem',
              border: '1px solid #2ecc71'
            }}>
              <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#27ae60' }}>
                ⚖️ Калькулятор веса ({selectedFish.name}):
              </strong>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input 
                  type="number" 
                  placeholder="Длина в см (напр. 45)"
                  value={calcLength}
                  onChange={(e) => {
                    setCalcLength(e.target.value);
                    calculateWeight(e.target.value, selectedFish);
                  }}
                  style={{ padding: '0.4rem', width: '100%', maxWidth: '200px' }}
                />
                {estimatedWeight && (
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2ecc71' }}>
                    ≈ {estimatedWeight}
                  </span>
                )}
              </div>
            </div>

            {/* РЕКОМЕНДУЕМЫЕ СНАСТИ */}
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.8rem', borderRadius: '8px', margin: '0.8rem 0' }}>
              <strong>🎣 Рекомендуемая снасть:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: '0.4rem 0 0 0', fontSize: '0.88rem' }}>
                <li><strong>Леска/Шнур:</strong> {selectedFish.tackle.line}</li>
                <li><strong>Крючок:</strong> {selectedFish.tackle.hook}</li>
                <li><strong>Удилище:</strong> {selectedFish.tackle.rod}</li>
              </ul>
            </div>

            <p style={{ margin: '0.8rem 0' }}>{selectedFish.description}</p>
            <p><strong>📍 Обитание:</strong> {selectedFish.habitat}</p>

            <div style={{ margin: '0.8rem 0' }}>
              <strong>🪱 Насадки:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                {selectedFish.baits.map((bait, idx) => (
                  <span key={idx} style={{
                    background: 'var(--primary-blue)',
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    {bait}
                  </span>
                ))}
              </div>
            </div>

            <button 
              type="button"
              className="control-btn" 
              onClick={() => setSelectedFish(null)}
              style={{ marginTop: '0.5rem' }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}