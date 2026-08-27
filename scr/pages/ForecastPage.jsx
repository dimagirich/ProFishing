import React, { useState } from 'react';

export default function ForecastPage() {
  const [city, setCity] = useState('Москва');
  const [pressure, setPressure] = useState(746);
  const [wind, setWind] = useState('южный');
  const [weather, setWeather] = useState('облачно');
  const [moonPhase, setMoonPhase] = useState('растущая');
  const [forecastResult, setForecastResult] = useState(null);

  const calculateForecast = (e) => {
    e.preventDefault();
    let score = 70;

    if (pressure >= 742 && pressure <= 752) score += 15;
    else if (pressure < 735 || pressure > 760) score -= 25;
    else score -= 10;

    if (wind === 'южный' || wind === 'юго-западный') score += 10;
    if (wind === 'северный' || wind === 'северо-восточный') score -= 15;

    if (weather === 'пасмурно' || weather === 'облачно') score += 10;
    if (weather === 'жара') score -= 20;

    if (moonPhase === 'новолуние' || moonPhase === 'растущая') score += 5;

    const finalScore = Math.min(Math.max(score, 10), 98);

    let status = 'Средний клев 😐';
    let color = '#f39c12';
    let advice = 'Рыба малоактивна. Используйте более тонкие поводки и миниатюрные насадки.';

    if (finalScore >= 75) {
      status = 'Отличный клев! 🎣🔥';
      color = '#2ecc71';
      advice = 'Идеальные условия! Хищник и белая рыба активно кормятся. Не забудьте подсачек!';
    } else if (finalScore < 45) {
      status = 'Плохой клев 😞';
      color = '#e74c3c';
      advice = 'Высокое или резкое падение давления. Лучше поэкспериментировать с дипами и прикормкой.';
    }

    setForecastResult({
      score: finalScore,
      status,
      color,
      advice
    });
  };

  return (
    <div>
      <h1 className="page-title">Прогноз Клёва Рыбы</h1>

      <form onSubmit={calculateForecast} className="upload-form forecast-form">
        <h3>📊 Расчет вероятности успешной рыбалки</h3>

        <div className="form-group-grid">
          <div>
            <label><strong>Город / Регион:</strong></label>
            <input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label><strong>Давление (мм рт. ст.):</strong></label>
            <input 
              type="number" 
              value={pressure} 
              onChange={(e) => setPressure(Number(e.target.value))} 
              required 
            />
          </div>

          <div>
            <label><strong>Направление ветра:</strong></label>
            <select value={wind} onChange={(e) => setWind(e.target.value)} className="form-select">
              <option value="южный">Южный / Юго-Западный (Благоприятный)</option>
              <option value="западный">Западный (Умеренный)</option>
              <option value="восточный">Восточный (Переменный)</option>
              <option value="северный">Северный / Северо-Восточный (Холодный)</option>
            </select>
          </div>

          <div>
            <label><strong>Погодные условия:</strong></label>
            <select value={weather} onChange={(e) => setWeather(e.target.value)} className="form-select">
              <option value="облачно">Облачно с прояснениями</option>
              <option value="пасмурно">Пасмурно / Небольшой дождь</option>
              <option value="ясно">Ясно / Солнечно</option>
              <option value="жара">Сильная жара</option>
            </select>
          </div>

          <div className="full-width">
            <label><strong>Фаза Луны:</strong></label>
            <select value={moonPhase} onChange={(e) => setMoonPhase(e.target.value)} className="form-select">
              <option value="растущая">Растущая Луна</option>
              <option value="полнолуние">Полнолуние</option>
              <option value="убывающая">Убывающая Луна</option>
              <option value="новолуние">Новолуние</option>
            </select>
          </div>
        </div>

        <button type="submit">Рассчитать прогноз</button>
      </form>

      {forecastResult && (
        <div className="forecast-result-card" style={{ borderColor: forecastResult.color }}>
          <h2>Прогноз для г. {city}</h2>
          <div className="score-circle" style={{ backgroundColor: forecastResult.color }}>
            {forecastResult.score}%
          </div>
          <h3 style={{ color: forecastResult.color }}>{forecastResult.status}</h3>
          <p className="forecast-advice"><strong>Совет эксперта:</strong> {forecastResult.advice}</p>
        </div>
      )}
    </div>
  );
}