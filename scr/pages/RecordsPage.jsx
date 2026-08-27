import React from 'react';

// Импортируем 20 ваших скачанных фотографий из папки src/assets/records/
import rec1 from '../assets/records/record1.jpg';
import rec2 from '../assets/records/record2.jpg';
import rec3 from '../assets/records/record3.jpg';
import rec4 from '../assets/records/record4.jpg';
import rec5 from '../assets/records/record5.jpg';
import rec6 from '../assets/records/record6.jpg';
import rec7 from '../assets/records/record7.jpg';
import rec8 from '../assets/records/record8.jpg';
import rec9 from '../assets/records/record9.jpg';
import rec10 from '../assets/records/record10.jpg';
import rec11 from '../assets/records/record11.jpg';

const recordsData = [
  { id: 1, title: 'Судак', weight: '2.1 кг', fisher: 'рыбак', location: 'Ишим', image: rec1 },
  { id: 2, title: 'Серебрянный Карась', weight: '1.7 кг', fisher: 'Алексей Х.', location: 'Загородный Ишим', image: rec2 },
  { id: 3, title: 'Тропический Карп', weight: '38.0 кг', fisher: 'Дмитрий Г.', location: 'Тайланд', image: rec3 },
  { id: 4, title: 'Тропический Карп', weight: '40.0 кг', fisher: 'Дмитрий Г.', location: 'Тайланд', image: rec4 },
  { id: 5, title: 'Змейголова', weight: '1.0 кг', fisher: 'Дмитрий Г.', location: 'Талас', image: rec5 },
  { id: 6, title: 'Налим', weight: '1.2 кг', fisher: 'Мухамед К.', location: 'Загородный Ишим', image: rec6 },
  { id: 7, title: 'Солнечный окунь', weight: '0.9 кг', fisher: 'Дмитрий Г.', location: 'Китай', image: rec7 },
  { id: 8, title: 'Сазан', weight: '1.0 кг', fisher: 'Артем П.', location: 'Талас', image: rec8 },
  { id: 9, title: 'Судак', weight: '2.7 кг', fisher: 'Дмитрий Г.', location: 'Ишим', image: rec9 },
  { id: 10, title: 'Сазан', weight: '1.5 кг', fisher: 'Дмитрий Г.', location: 'Китай', image: rec10 },
  { id: 11, title: 'Лещ', weight: '3.1 кг', fisher: 'Темный Друн.', location: 'Загородный Ишим', image: rec11 },

];

export default function RecordsPage() {
  return (
    <div>
      <h1 className="page-title">Галерея Рыболовных Уловов</h1>

      {/* Сетка карточек с рекордами */}
      <div className="grid-cards">
        {recordsData.map(record => (
          <div key={record.id} className="card">
            <img src={record.image} alt={record.title} />
            <span className="badge">Вес: {record.weight}</span>
            <h3>{record.title}</h3>
            <p><strong>Рыбак:</strong> {record.fisher}</p>
            <p><strong>Водоем:</strong> {record.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}