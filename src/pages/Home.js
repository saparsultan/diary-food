import React from 'react'

const Home = () => {
  return (
    <>
      <div className="tabs">
        <div className="tab tab--active">
          Состав
        </div>
        <div className="tab">
          Описание
        </div>
      </div>

      <div className="form-block">
        <div className="form-item">
          <label className="form-item__label">
            Название:
          </label>
          <input type="text" className="form-item__input" placeholder="Введите название блюда"/>
        </div>
        <div className="form-item">
          <label className="form-item__label">
            Категория:
          </label>
          <select name="" id="" className="form-item__input form-item__select">
            <option disabled>Выбрать</option>
            <option value="value1">Значение 1</option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>
        </div>
      </div>

      <div className="form-block">
        <div className="form-title">
          Ингредиенты
        </div>
        <div className="form-item">
          <label className="form-item__label">
            Название:
          </label>
          <select name="" id="" className="form-item__input form-item__select">
            <option disabled>Выбрать</option>
            <option value="value1">Значение 1</option>
            <option value="value2" selected>Значение 2</option>
            <option value="value3">Значение 3</option>
          </select>
        </div>
        <div className="form-footer">
          <button className="btn btn--add">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3.75V16.25M16.25 10H3.75" strokeOpacity="0.64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>
              Добавить ещё
            </span>
          </button>
        </div>
      </div>
      <div className="footer">
        <button className="btn">
          Сохранить
        </button>
      </div>
    </>
  )
}

export default Home