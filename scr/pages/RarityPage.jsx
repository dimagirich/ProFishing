import React, { useState } from 'react';

const waterbodiesData = {
  ishim: {
    name: 'Река Ишим',
    fishes: [
      { id: 1, fish: 'Щука', rarity: 75, category: 'Частая', description: 'Главный хищник Ишима. Активно клюет на спиннинг вдоль коряжников.', badgeColor: '#2ecc71' },
      { id: 2, fish: 'Судак', rarity: 40, category: 'Необычная', description: 'Предпочитает глубокие участки реки с песчано-галечным дном.', badgeColor: '#f1c40f' },
      { id: 3, fish: 'Окунь', rarity: 85, category: 'Обычная', description: 'Встречается повсеместно крупными стаями. Отлично откликается на вертушки.', badgeColor: '#27ae60' },
      { id: 4, fish: 'Карась серебряный', rarity: 80, category: 'Обычная', description: 'Массовая рыба в тихих заводях и старицах Ишима.', badgeColor: '#2ecc71' },
      { id: 5, fish: 'Плотва (Чебак)', rarity: 90, category: 'Очень частая', description: 'Самая распространенная мирная рыба реки.', badgeColor: '#1abc9c' },
      { id: 6, fish: 'Лещ', rarity: 60, category: 'Частая', description: 'Излюбленный объект фидерной ловли на средних глубинах.', badgeColor: '#3498db' },
      { id: 7, fish: 'Язь', rarity: 35, category: 'Необычная', description: 'Осторожная сильная рыба. Клюет на кузнечика и мелкие блесны.', badgeColor: '#f1c40f' },
      { id: 8, fish: 'Линь', rarity: 25, category: 'Редкая', description: 'Обитает в сильно заросших участках с илистым дном.', badgeColor: '#e67e22' },
      { id: 9, fish: 'Налим', rarity: 30, category: 'Редкая', description: 'Проявляет активность осенью и зимой в холодную погоду.', badgeColor: '#e67e22' },
      { id: 10, fish: 'Сом (Обыкновенный)', rarity: 10, category: 'Очень редкая', description: 'Крупнейший обитатель донных ям Ишима.', badgeColor: '#e74c3c' }
    ]
  },
  talas: {
    name: 'Река Талас',
    fishes: [
      { id: 1, fish: 'Маринка обыкновенная', rarity: 65, category: 'Частая', description: 'Типичный обитатель быстрого течения Таласа. Требует осторожности при кулинарной обработке.', badgeColor: '#2ecc71' },
      { id: 2, fish: 'Осман горный', rarity: 50, category: 'Необычная', description: 'Небольшая рыба, предпочитающая прохладные участки с чистой водой и каменистым дном.', badgeColor: '#f1c40f' },
      { id: 3, fish: 'Сазан (Дикий)', rarity: 40, category: 'Необычная', description: 'Встречается в глубоких заваленных корягами плесах реки.', badgeColor: '#f1c40f' },
      { id: 4, fish: 'Туркестанский усач', rarity: 15, category: 'Редкая', description: 'Сильный стремительный обитатель придонных слоев на сильном течении.', badgeColor: '#e67e22' },
      { id: 5, fish: 'Голец Таласский', rarity: 70, category: 'Частая', description: 'Небольшая донная рыбка, служащая кормом для более крупных хищников.', badgeColor: '#3498db' },
      { id: 6, fish: 'Карась', rarity: 75, category: 'Обычная', description: 'Заселяет тихие заводи, разливы и каналы бассейна Таласа.', badgeColor: '#2ecc71' },
      { id: 7, fish: 'Бычок-Таласский', rarity: 80, category: 'Обычная', description: 'Мелкий донный обитатель, держится среди камней.', badgeColor: '#1abc9c' }
    ]
  },
  balkhash: {
    name: 'Озеро Балхаш',
    fishes: [
      { id: 1, fish: 'Сазан', rarity: 75, category: 'Частая', description: 'Славятся крупными экземплярами, обитает в камышовых зарослях.', badgeColor: '#2ecc71' },
      { id: 2, fish: 'Сом Балхашский', rarity: 45, category: 'Необычная', description: 'Ловится на квок и донные снасти на больших глубинах.', badgeColor: '#f1c40f' },
      { id: 3, fish: 'Жерех', rarity: 65, category: 'Частая', description: 'Активный хищник верхних слоев воды.', badgeColor: '#3498db' },
      { id: 4, fish: 'Судак', rarity: 60, category: 'Частая', description: 'Один из главных промысловых хищников Балхаша.', badgeColor: '#2ecc71' },
      { id: 5, fish: 'Вобла балхашская', rarity: 85, category: 'Обычная', description: 'Клюет массово на любые поплавочные и донные снасти.', badgeColor: '#1abc9c' },
      { id: 6, fish: 'Лещ', rarity: 70, category: 'Частая', description: 'Держится многочисленными стаями в опресненной части озера.', badgeColor: '#3498db' },
      { id: 7, fish: 'Балхашский окунь', rarity: 15, category: 'Редкая', description: 'Эндемик водоема, численность строго контролируется.', badgeColor: '#e67e22' },
      { id: 8, fish: 'Шип', rarity: 5, category: 'Легендарная', description: 'Краснокнижная редчайшая рыба осетровых пород.', badgeColor: '#e74c3c' }
    ]
  },
  ural: {
    name: 'Река Урал (Жайык)',
    fishes: [
      { id: 1, fish: 'Чехонь', rarity: 80, category: 'Частая', description: 'Держится на быстром течении, клюет на поплавок и бомбарду.', badgeColor: '#2ecc71' },
      { id: 2, fish: 'Лещ', rarity: 85, category: 'Обычная', description: 'Основной объект фидерной ловли на реке.', badgeColor: '#27ae60' },
      { id: 3, fish: 'Судак', rarity: 55, category: 'Частая', description: 'Обитает на свалах и песчаных косах реки.', badgeColor: '#3498db' },
      { id: 4, fish: 'Сом', rarity: 35, category: 'Необычная', description: 'Хорошо откликается на троллинг и крупные силиконовые приманки.', badgeColor: '#f1c40f' },
      { id: 5, fish: 'Жерех', rarity: 60, category: 'Частая', description: 'Охотится у поверхности вдоль струй течения.', badgeColor: '#3498db' },
      { id: 6, fish: 'Севрюга', rarity: 12, category: 'Очень редкая', description: 'Ценная проходная рыба, идущая на нерест из моря.', badgeColor: '#e74c3c' },
      { id: 7, fish: 'Осетр русский', rarity: 8, category: 'Очень редкая', description: 'Редкий представитель осетровых бассейна Урала.', badgeColor: '#e74c3c' },
      { id: 8, fish: 'Белуга', rarity: 3, category: 'Легендарная', description: 'Крайне редкий гигант Каспийско-Уральского бассейна.', badgeColor: '#9b59b6' }
    ]
  },
  alakol: {
    name: 'Озеро Алаколь',
    fishes: [
      { id: 1, fish: 'Сазан Алакольский', rarity: 70, category: 'Частая', description: 'Отлично приспособился к условиям солоноватого озера.', badgeColor: '#2ecc71' },
      { id: 2, fish: 'Маринка', rarity: 45, category: 'Необычная', description: 'Всеядная сильная рыба солоноватых водоемов.', badgeColor: '#f1c40f' },
      { id: 3, fish: 'Голый осман', rarity: 30, category: 'Редкая', description: 'Уникальная горно-степная рыба, обитающая в чистых притоках.', badgeColor: '#e67e22' },
      { id: 4, fish: 'Судак', rarity: 50, category: 'Необычная', description: 'Успешно акклиматизирован, держится глубин.', badgeColor: '#f1c40f' },
      { id: 5, fish: 'Окунь', rarity: 65, category: 'Частая', description: 'Охотится на прибрежных мелководьях и в камышах.', badgeColor: '#3498db' },
      { id: 6, fish: 'Карась', rarity: 75, category: 'Обычная', description: 'Встречается у устьев рек, впадающих в Алаколь.', badgeColor: '#2ecc71' }
    ]
  },
  caspian: {
    name: 'Каспийское море',
    fishes: [
      { id: 1, fish: 'Бычок-кругляк', rarity: 95, category: 'Очень частая', description: 'Встречается повсеместно на прибрежных камнях.', badgeColor: '#1abc9c' },
      { id: 2, fish: 'Кефаль (Сингиль)', rarity: 75, category: 'Частая', description: 'Стайная морская рыба, активна у побережья.', badgeColor: '#2ecc71' },
      { id: 3, fish: 'Воза (Морской судок)', rarity: 40, category: 'Необычная', description: 'Морская разновидность судака, держится глубин.', badgeColor: '#f1c40f' },
      { id: 4, fish: 'Кутум', rarity: 25, category: 'Редкая', description: 'Ценная ценнейшая рыба семейства карповых с мощными зубами.', badgeColor: '#e67e22' },
      { id: 5, fish: 'Каспийская сельдь', rarity: 65, category: 'Частая', description: 'Пелагическая стайная рыба, идет вдоль берегов.', badgeColor: '#3498db' },
      { id: 6, fish: 'Осетр персидский', rarity: 10, category: 'Очень редкая', description: 'Находится под строгой охраной государства.', badgeColor: '#e74c3c' },
      { id: 7, fish: 'Белуга каспийская', rarity: 4, category: 'Легендарная', description: 'Самый большой представитель осетровых в море.', badgeColor: '#9b59b6' }
    ]
  }
};

export default function RarityPage() {
  const [activeTab, setActiveTab] = useState('ishim');

  const currentWaterbody = waterbodiesData[activeTab];

  return (
    <div className="rarity-page">
      <h1 className="page-title">💎 Редкость Рыб в Водоёмах Казахстана</h1>

      <div className="waterbody-tabs">
        {Object.keys(waterbodiesData).map(key => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {waterbodiesData[key].name}
          </button>
        ))}
      </div>

      <div className="grid-cards">
        {currentWaterbody.fishes.map(item => (
          <div className="card rarity-card" key={item.id}>
            <div className="rarity-header">
              <span className="badge" style={{ backgroundColor: item.badgeColor }}>
                {item.category}
              </span>
              <span className="location-tag">📍 {currentWaterbody.name}</span>
            </div>

            <h3 className="fish-title">{item.fish}</h3>
            <p className="fish-desc">{item.description}</p>

            <div className="rarity-progress-container">
              <div className="rarity-labels">
                <span>Шанс встречи:</span>
                <strong>{item.rarity}%</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${item.rarity}%`,
                    backgroundColor: item.badgeColor
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}