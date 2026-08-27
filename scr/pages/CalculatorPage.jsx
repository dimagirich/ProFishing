import React, { useState } from 'react';

// База данных рыб для подбора снастей
const FISH_DATABASE = {
  crucian: {
    name: 'Карась (серебряный / золотой)',
    category: 'peaceful',
    methods: {
      float: { main: '0.14–0.18 мм (Монофил)', leader: '0.10–0.12 мм (Флюорокарбон/Нейлон)', hook: '№12–16', detail: 'Легкий поплавок 1.5–3г, чувствительная огрузка.' },
      feeder: { main: '0.20–0.22 мм (Монофил) или Плетенка 0.10 мм', leader: '0.12–0.14 мм', hook: '№10–14', detail: 'Кормушки 20–40г, патерностер или инлайн.' },
      flat: { main: '0.22–0.25 мм (Монофил)', leader: '0.14–0.16 мм (Плетеный поводочный)', hook: '№10–12 (Hair rig)', detail: 'Флэт-кормушка 30г, волосяная оснастка, насадка 8–10мм.' }
    }
  },
  bream: {
    name: 'Лещ / Густера',
    category: 'peaceful',
    methods: {
      feeder: { main: '0.10–0.12 мм (Плетеный шнур + шок-лидер)', leader: '0.12–0.14 мм (50–100 см)', hook: '№12–14', detail: 'Длинный поводок для осторожной рыбы, кормушки 40–80г.' },
      float: { main: '0.18–0.20 мм (Монофил)', leader: '0.12–0.14 мм', hook: '№12–14', detail: 'Матчевая или маховая удочка, ловля строго со дна.' },
      flat: { main: '0.24–0.26 мм (Монофил)', leader: '0.14 мм', hook: '№10–12', detail: 'Пылящие бойлы 10–12мм, пеллетс в кормушку.' }
    }
  },
  carp: {
    name: 'Карп / Сазан / Амур',
    category: 'peaceful',
    methods: {
      flat: { main: '0.26–0.30 мм (Монофил)', leader: '15–25 lb (Плетеный поводочный материал)', hook: '№6–8', detail: 'Флэт 40–60г, волосяная оснастка с поп-апом или дамбелсом.' },
      feeder: { main: '0.28–0.32 мм (Монофил со средним растяжением)', leader: '0.18–0.22 мм', hook: '№8–10', detail: 'Мощный фидер (Heavy/Extra-Heavy), фрикцион ослаблен!' },
      float: { main: '0.22–0.25 мм (Монофил)', leader: '0.16–0.20 мм', hook: '№8–10', detail: 'Карповое маховое или матчевое удилище с крепким комлем.' }
    }
  },
  roach: {
    name: 'Плотва / Красноперка / Елец',
    category: 'peaceful',
    methods: {
      float: { main: '0.12–0.14 мм (Монофил)', leader: '0.08–0.10 мм', hook: '№16–18', detail: 'Микро-поплавки, легкая огрузка для ловли в толще воды.' },
      feeder: { main: '0.08–0.10 мм (Плетенка)', leader: '0.10–0.12 мм (70–120 см)', hook: '№14–16', detail: 'Быстрый темп перезаброса (каждые 2-3 минуты), активная кормушка.' }
    }
  },
  tench: {
    name: 'Линь',
    category: 'peaceful',
    methods: {
      float: { main: '0.20–0.22 мм (Монофил)', leader: '0.14–0.16 мм', hook: '№10–12', detail: 'Ловля в окнах растительности, прочная леска обязательна.' },
      feeder: { main: '0.22–0.25 мм (Монофил)', leader: '0.14–0.16 мм', hook: '№10–12', detail: 'Кормушки-пули, насадка: червь, опарыш, кукуруза.' }
    }
  },
  pike: {
    name: 'Щука',
    category: 'predator',
    methods: {
      spinning: { main: '0.15–0.19 мм (Плетенка PE #1.0–#1.5)', leader: 'Титан / Струна / Флюр 0.55–0.80 мм (30 см)', hook: 'Офсет №3/0-5/0 / Тройники №2-4', detail: 'Обязателен металлической поводок! Воблеры, силикон 10-15см, блесны.' },
      trolling: { main: '0.20–0.25 мм (Плетенка)', leader: 'Стальной / Титановый поводок 40 см', hook: 'Тройники №1/0–2/0', detail: 'Упористые воблеры с большим заглублением (3-6м).' }
    }
  },
  zander: {
    name: 'Судак / Берш',
    category: 'predator',
    methods: {
      spinning: { main: '0.12–0.15 мм (Плетенка PE #0.8–#1.0)', leader: 'Флюорокарбон 0.35–0.45 мм (0.5–1 м)', hook: 'Джиг-головка / Офсет №2/0–4/0', detail: 'Жесткий бланковый строй (Extra Fast) для пробития костистой пасти.' },
      trolling: { main: '0.16–0.20 мм (Плетенка)', leader: 'Флюорокарбон 0.40–0.50 мм', hook: 'Тройники №4–6', detail: 'Воблеры-минноу с чётким контактом со дном.' }
    }
  },
  perch: {
    name: 'Окунь (Микроджиг / Лайт)',
    category: 'predator',
    methods: {
      spinning: { main: '0.06–0.10 мм (Плетенка PE #0.3–#0.6)', leader: 'Флюорокарбон 0.16–0.20 мм (50-70 см)', hook: 'Офсет №6–10 / Мягкие крючки №8', detail: 'Ультралайт/Лайт, съедобная резина 1.5–3 дюйма, отводной поводок.' }
    }
  },
  trout: {
    name: 'Форель (Прудовая / Дикая)',
    category: 'predator',
    methods: {
      spinning: { main: 'Эстер 0.12 мм / Эстер или Шнур PE #0.2–#0.4', leader: 'Флюорокарбон 0.14–0.18 мм', hook: 'Одинарники без бороды №6–8', detail: 'Колеблющиеся блесны 1–3.5г, силиконовые личинки.' },
      fly: { main: 'Нахлыстовый шнур WF3F–WF5F', leader: 'Конический подлесок 9ft + Флюр 0.12–0.14 мм', hook: 'Мушки №12–16', detail: 'Сухие мушки, нимфы, стримеры.' }
    }
  }
};

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState('bait');

  //КАЛЬКУЛЯТОР ПРИКОРМКИ
  const [waterType, setWaterType] = useState('stagnant_shallow');
  const [hours, setHours] = useState(5);
  const [targetFish, setTargetFish] = useState('bream');
  const [density, setDensity] = useState('medium');

  //  ПОДБОР СНАСТЕЙ
  const [selectedFishKey, setSelectedFishKey] = useState('bream');
  const [selectedMethod, setSelectedMethod] = useState('feeder');

  // Расчет прикормочной смеси
  const calculateBait = () => {
    let baseKgPerHour = 0.6;

    if (waterType === 'stagnant_deep') baseKgPerHour = 0.8;
    if (waterType === 'river_medium') baseKgPerHour = 1.1;
    if (waterType === 'river_fast') baseKgPerHour = 1.5;

    // Поправка на рыбу
    if (targetFish === 'carp') baseKgPerHour *= 1.4;
    if (targetFish === 'roach') baseKgPerHour *= 0.85;

    // Плотность закармливания
    if (density === 'high') baseKgPerHour *= 1.25;
    if (density === 'low') baseKgPerHour *= 0.75;

    const dryBait = (baseKgPerHour * hours).toFixed(1);
    const waterLiters = (dryBait * 0.5).toFixed(1);
    const aromaMl = Math.round(dryBait * 45);
    const liveComponentGrams = Math.round(dryBait * 80);

    let additives = [];
    if (waterType.includes('river')) additives.push('Глина / Глинозем для утяжеления и связывания');
    if (targetFish === 'carp') additives.push('Вареная кукуруза, крупный пеллетс, резаные бойлы');
    if (targetFish === 'bream') additives.push('Пастончино, пареный горох, меласса');
    if (targetFish === 'roach') additives.push('Конопля (жареная/молотая), мелкий мотыль');

    return { dryBait, waterLiters, aromaMl, liveComponentGrams, additives };
  };

  const baitResult = calculateBait();
  const currentFish = FISH_DATABASE[selectedFishKey];
  const availableMethods = Object.keys(currentFish.methods);
  
  // Коррекция метода, если выбранный недоступен для текущей рыбы
  const activeMethodKey = availableMethods.includes(selectedMethod) ? selectedMethod : availableMethods[0];
  const tackleResult = currentFish.methods[activeMethodKey];

  return (
    <div>
      <h1 className="page-title">Универсальный Рыболовный Калькулятор</h1>

      {/* Навигация по вкладкам */}
      <div className="filter-container">
        <button 
          className={`filter-btn ${activeTab === 'bait' ? 'active' : ''}`}
          onClick={() => setActiveTab('bait')}
        >
          🥣 Расчет Прикормки и Замеса
        </button>
        <button 
          className={`filter-btn ${activeTab === 'tackle' ? 'active' : ''}`}
          onClick={() => setActiveTab('tackle')}
        >
          🎣 Подбор Снастей и Оснастки
        </button>
      </div>

      {/*ВКЛАДКА 1: ПРИКОРМКА */}
      {activeTab === 'bait' && (
        <div className="upload-form">
          <h3>🥣 Калькулятор объема и пропорций прикормки</h3>
          
          <div className="form-group-grid">
            <div>
              <label><strong>Тип водоема и глубина:</strong></label>
              <select value={waterType} onChange={(e) => setWaterType(e.target.value)} className="form-select">
                <option value="stagnant_shallow">Озеро / Пруд (Мелководье до 2м)</option>
                <option value="stagnant_deep">Озеро / Затопленный карьер (Глубина 2m+)</option>
                <option value="river_medium">Река (Умеренное течение)</option>
                <option value="river_fast">Река (Сильное течение / Днепр, Волга)</option>
              </select>
            </div>

            <div>
              <label><strong>Целевая рыба:</strong></label>
              <select value={targetFish} onChange={(e) => setTargetFish(e.target.value)} className="form-select">
                <option value="bream">Лещ / Густера</option>
                <option value="carp">Карп / Сазан / Амур</option>
                <option value="crucian">Карась / Карась-буффало</option>
                <option value="roach">Плотва / Красноперка</option>
              </select>
            </div>

            <div>
              <label><strong>Активность рыбы / Плотность:</strong></label>
              <select value={density} onChange={(e) => setDensity(e.target.value)} className="form-select">
                <option value="low">Низкая (Холодная вода / Осторожный клёв)</option>
                <option value="medium">Средняя (Стандартная рыбалка)</option>
                <option value="high">Высокая (Летний жор / Жаркая погода)</option>
              </select>
            </div>

            <div>
              <label><strong>Время рыбалки: {hours} ч.</strong></label>
              <input 
                type="range" 
                min="2" 
                max="14" 
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))} 
              />
            </div>
          </div>

          <div className="calc-result-box highlight">
            <h4>📋 Точный рецепт замеса:</h4>
            <ul>
              <li>🌾 <strong>Сухая база:</strong> ~{baitResult.dryBait} кг</li>
              <li>💧 <strong>Вода для увлажнения:</strong> ~{baitResult.waterLiters} л (замешивать в 2-3 этапа!)</li>
              <li>🧪 <strong>Ароматизатор (ликвид/бустер):</strong> ~{baitResult.aromaMl} мл</li>
              <li>🪱 <strong>Живой компонент (мотыль/опарыш/червь):</strong> ~{baitResult.liveComponentGrams} г</li>
            </ul>

            {baitResult.additives.length > 0 && (
              <div style={{ marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px dashed #fff' }}>
                <strong>💡 Рекомендуемые добавки в корм:</strong>
                <ul style={{ marginTop: '0.3rem' }}>
                  {baitResult.additives.map((add, idx) => (
                    <li key={idx}>• {add}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ВКЛАДКА 2: ПОДБОР СНАСТЕЙ */}
      {activeTab === 'tackle' && (
        <div className="upload-form">
          <h3>🎣 Экспертный подбор снастей и элементов оснастки</h3>

          <div className="form-group-grid">
            <div>
              <label><strong>Выберите рыбу:</strong></label>
              <select 
                value={selectedFishKey} 
                onChange={(e) => setSelectedFishKey(e.target.value)} 
                className="form-select"
              >
                {Object.keys(FISH_DATABASE).map((key) => (
                  <option key={key} value={key}>
                    {FISH_DATABASE[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label><strong>Способ ловли:</strong></label>
              <select 
                value={activeMethodKey} 
                onChange={(e) => setSelectedMethod(e.target.value)} 
                className="form-select"
              >
                {availableMethods.map((m) => {
                  const labels = {
                    feeder: 'Фидер / Донка',
                    float: 'Поплавочная снасть',
                    flat: 'Флэт-Фидер (Flat Method)',
                    spinning: 'Спиннинг',
                    trolling: 'Троллинг',
                    fly: 'Нахлыст'
                  };
                  return <option key={m} value={m}>{labels[m] || m}</option>;
                })}
              </select>
            </div>
          </div>

          {/* Карточка результатов */}
          <div className="calc-result-box highlight">
            <h4>⚙️ Рекомендуемые параметры монтажа:</h4>
            <p><strong>🧵 Основная леска / Шнур:</strong> {tackleResult.main}</p>
            <p><strong>📏 Поводок:</strong> {tackleResult.leader}</p>
            <p><strong>🪝 Размер и тип крючка:</strong> {tackleResult.hook}</p>
            
            <div style={{ marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px dashed #fff', fontSize: '0.9rem' }}>
              <strong>💬 Совет по тактике:</strong> {tackleResult.detail}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}