import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const defaultTips = [
  // --- ПОПЛАВОК (6 советов) ---
  {
    id: 'p1',
    category: 'поплавок',
    title: 'Правильная огрузка поплавка',
    text: 'Огружайте поплавок дробинками так, чтобы над водой находилась только антенна. Это убирает сопротивление при поклевке.'
  },
  {
    id: 'p2',
    category: 'поплавок',
    title: 'Контроль натяжения лески',
    text: 'Не допускайте провисания лески между кончиком удочки и поплавком, иначе подсечка будет запоздалой.'
  },
  {
    id: 'p3',
    category: 'поплавок',
    title: 'Ловля на падающую насадку',
    text: 'Распределите дробинки по всей длине лески. Приманка будет опускаться медленно, привлекая рыбу во всех слоях воды.'
  },
  {
    id: 'p4',
    category: 'поплавок',
    title: 'Маскировка снасти на мелководье',
    text: 'При ловле на мелководье используйте прозрачные поплавки и тонкие поводки (0.08–0.10 мм), чтобы не отпугнуть крупную рыбу.'
  },
  {
    id: 'p5',
    category: 'поплавок',
    title: 'Плавность прикормочных шаров',
    text: 'Не делайте шары прикормки слишком плотными. Они должны рассыпаться при ударе о воду или в первые 1–2 минуты на дне.'
  },
  {
    id: 'p6',
    category: 'поплавок',
    title: 'Подбор длины поводка под течение',
    text: 'На сильном течении удлиняйте поводок (до 50-70 см), чтобы насадка естественным образом стелилась по дну.'
  },

  // --- СПИННИНГ (6 советов) ---
  {
    id: 's1',
    category: 'спиннинг',
    title: 'Пауза при джиговой проводке',
    text: 'Более 80% поклевок хищника происходят в момент падения приманки на дно на паузе. Держите шнур в натяжении.'
  },
  {
    id: 's2',
    category: 'спиннинг',
    title: 'Флюорокарбоновый поводок',
    text: 'При ловле осторожного судака или окуня всегда привязывайте поводок из флюорокарбона длиной 1-1.5 метра.'
  },
  {
    id: 's3',
    category: 'спиннинг',
    title: 'Контроль фрикциона',
    text: 'Настраивайте фрикционный тормоз катушки до заброса. При резкой поклевке крупной щуки он предотвратит обрыв шнура.'
  },
  {
    id: 's4',
    category: 'спиннинг',
    title: 'Эксперименты с цветом силикона',
    text: 'В мутной воде лучше работают яркие кислотные приманки (машинное масло, желтый), а в прозрачной — естественные цвета.'
  },
  {
    id: 's5',
    category: 'спиннинг',
    title: 'Качественная скрутка на щуку',
    text: 'При ловле твичингом используйте жесткие струнные поводки — они предотвращают захлест крючков воблера за шнур.'
  },
  {
    id: 's6',
    category: 'спиннинг',
    title: 'Смена горизонта ловли',
    text: 'Если хищник не откликается у дна, попробуйте проводит приманку воблером-суспендером в толще воды.'
  },

  // --- КАРПОВОЕ УДИЛИЩЕ (6 советов) ---
  {
    id: 'c1',
    category: 'карповое удилище',
    title: 'Использование лидкора',
    text: 'Применяйте тяжелый лидкор длиною 70-90 см. Он прижимает оснастку к дну и защищает чешую рыбы при вываживании.'
  },
  {
    id: 'c2',
    category: 'карповое удилище',
    title: 'Точечный закорм спомбом',
    text: 'Клипсуйте сподовое и рабочее удилища на одной дистанции по маркерным колышкам для идеальной точности подачи корма.'
  },
  {
    id: 'c3',
    category: 'карповое удилище',
    title: 'Проверка остроты крючка',
    text: 'В карпфишинге крючок должен быть идеально острым. Проверяйте жало о ногтевую пластину перед каждым забросом.'
  },
  {
    id: 'c4',
    category: 'карповое удилище',
    title: 'Плавающие насадки (Pop-Up)',
    text: 'На илистом дне подсаживайте к бойлу половинку Pop-Up, чтобы поднимать насадку над слоем ила.'
  },
  {
    id: 'c5',
    category: 'карповое удилище',
    title: 'Байтраннер и фрикцион',
    text: 'После заброса обязательно включайте байтраннер или ослабляйте быстрый фрикцион, чтобы карп не утащил удилище.'
  },
  {
    id: 'c6',
    category: 'карповое удилище',
    title: 'ПВА-мешки и сетки',
    text: 'Используйте стики с сухой прикормкой и мелким пеллетсом для создания аппетитного пятна прямо вокруг вашей насадки.'
  },

  // --- ДОНКА (6 советов) ---
  {
    id: 'd1',
    category: 'донка',
    title: 'Фидергам для тонких поводков',
    text: 'Вставляйте отрезок фидергама (Feeder Gum) между кормушкой и поводком — он амортизирует рывки крупной рыбы.'
  },
  {
    id: 'd2',
    category: 'донка',
    title: 'Кормушки для течения',
    text: 'На сильном течении применяйте прямоугольные кормушки с грунтозацепами (усами), чтобы снасть не сносило.'
  },
  {
    id: 'd3',
    category: 'донка',
    title: 'Клипсование дистанции',
    text: 'Всегда фиксируйте леску на катушке в резиновой клипсе, чтобы попадать кормушкой строго в одну закормленную точку.'
  },
  {
    id: 'd4',
    category: 'донка',
    title: 'Ритм перезабросов',
    text: 'На старте ловли перезабрасывайте фидер каждые 2-3 минуты, чтобы быстро создать кормовое пятно на дне.'
  },
  {
    id: 'd5',
    category: 'донка',
    title: 'Живой компонент в кормушке',
    text: 'Добавляйте в кормушку пробками резаного опарыша или мотыля — это удерживает крупного леща в точке.'
  },
  {
    id: 'd6',
    category: 'донка',
    title: 'Сменные вершинки (Квивертипы)',
    text: 'Подбирайте мягкость вершины фидера под вес кормушки и ветер: жесткая для волн, мягкая для тихой воды.'
  }
];

export default function TipsPage() {
  const [tips, setTips] = useState(defaultTips);
  const [activeCategory, setActiveCategory] = useState('все');
  
  // Состояние видимости формы (изначально закрыта)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Состояния для формы добавления
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('карповое удилище');
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const q = query(collection(db, 'tips'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const firebaseTips = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (firebaseTips.length > 0) {
          setTips([...firebaseTips, ...defaultTips]);
        }
      } catch (error) {
        console.log("Firebase tips error:", error);
      }
    };
    fetchTips();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    const newTip = {
      title,
      category,
      text,
      createdAt: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, 'tips'), newTip);
      setTips([{ id: docRef.id, ...newTip }, ...tips]);
    } catch (error) {
      console.log("Добавление локально:", error);
      setTips([{ id: Date.now(), ...newTip }, ...tips]);
    }

    setTitle('');
    setText('');
    setCategory('карповое удилище');
    setIsFormOpen(false); // Автоматически скрываем форму после успешной отправки
  };

  const filteredTips = activeCategory === 'все' 
    ? tips 
    : tips.filter(tip => tip.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div>
      <h1 className="page-title">Полезные Советы Рыбакам</h1>

      {/* Кнопка открытия/закрытия формы */}
      <div className="toggle-form-container">
        <button 
          className="toggle-form-btn"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? '✖ Закрыть форму' : '✍️ Хотите поделиться своим рыболовным опытом? Нажмите сюда!'}
        </button>
      </div>

      {/* Форма добавления, которая отображается только при isFormOpen = true */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="upload-form animated-form">
          <h3>💡 Добавить собственный совет</h3>
          
          <input 
            type="text" 
            placeholder="Заголовок совета..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required 
          />

          <div className="select-group">
            <label><strong>Тема совета:</strong></label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              <option value="карповое удилище">Карповое удилище</option>
              <option value="спиннинг">Спиннинг</option>
              <option value="поплавок">Поплавок</option>
              <option value="донка">Донка</option>
            </select>
          </div>

          <textarea 
            placeholder="Опишите ваш совет подробно..." 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            rows="3"
            className="form-textarea"
            required 
          />

          <button type="submit">Опубликовать совет</button>
        </form>
      )}

      {/* Фильтры категорий */}
      <div className="filter-container">
        {['все', 'карповое удилище', 'спиннинг', 'поплавок', 'донка'].map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Сетка карточек советов */}
      <div className="grid-cards">
        {filteredTips.map(tip => (
          <div key={tip.id} className="card">
            <span className="badge">{tip.category}</span>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}