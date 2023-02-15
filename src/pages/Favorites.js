import React from 'react';
import calories from '../assets/images/calories.svg';
import protein from '../assets/images/protein.svg';
import carb from '../assets/images/carb.svg';
import fat from '../assets/images/fat.svg';
import benefit from '../assets/images/benefit.svg';
import recipe1 from '../assets/images/recipe1.png';

const Favorites = () => {
  return (
    <>
      <div className="search">
        <input type="text" className="form-item__input search__input" placeholder="Поиск..." />
        <div className="search__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803V15.803Z" stroke="#019852" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="recipe-grid">
        <div className="recipe">
          <div className="recipe__title">Спагетти с курицей в томатном соусе</div>
          <div className="nutri-value__list">
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={calories} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Калории</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={protein} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Белки</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={fat} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Жиры</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={carb} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Углеводы</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={benefit} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Польза</span>
            </div>
          </div>
          <div className="nutri-value__img">
            <img src={recipe1} alt="" width='322px' height='200px' />
          </div>
          <div className="recipe__btns">
            <div className="btn btn--block">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.75V16.25M16.25 10H3.75" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
              </svg>
              <span>В дневник</span>
            </div>
            <div className="btn btn--block" style={{gridTemplateColumns: '1fr', gridGap: 'none'}}>
              <svg width="20" height="20" style={{stroke: 'none'}} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7386 19.9996C15.6201 19.9996 15.5008 19.9703 15.3937 19.9103L10.0001 16.9289L4.60741 19.9103C4.36813 20.0439 4.07385 20.0267 3.85029 19.8689C3.62672 19.7111 3.51243 19.4396 3.55672 19.1696L4.59384 12.8097L2.33031 10.5212C2.05318 10.2405 2.05532 9.7884 2.33603 9.51127C2.61674 9.23413 3.06887 9.23627 3.34601 9.51693L5.86525 12.0641C6.02596 12.2269 6.09953 12.4562 6.06239 12.6812L5.20312 17.9489L9.65447 15.4883C9.86947 15.3697 10.1309 15.3697 10.3459 15.4883L14.7972 17.9489L13.9379 12.6812C13.9015 12.4576 13.9737 12.2291 14.1315 12.0676L17.8036 8.30413L12.7615 7.53413C12.5265 7.49773 12.3244 7.347 12.223 7.13127L10.0001 2.39567L7.77733 7.13127C7.67593 7.347 7.4738 7.49773 7.2388 7.53413L0.822487 8.51413C0.433923 8.57553 0.068216 8.30627 0.00821718 7.91553C-0.0510674 7.5256 0.216785 7.16127 0.606777 7.10127L6.64595 6.17917L9.35373 0.410706C9.47087 0.159997 9.723 0 10.0001 0C10.2773 0 10.5295 0.159997 10.6466 0.410706L13.3544 6.17917L19.3935 7.10127C19.6579 7.142 19.8778 7.327 19.9628 7.5806C20.0478 7.83413 19.9835 8.11487 19.7971 8.30627L15.4065 12.8062L16.4443 19.1696C16.4886 19.4396 16.3736 19.7111 16.1507 19.8689C16.0272 19.9553 15.8829 19.9996 15.7386 19.9996Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="recipe">
          <div className="recipe__title">Спагетти с курицей в томатном соусе</div>
          <div className="nutri-value__list">
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={calories} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Калории</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={protein} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Белки</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={fat} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Жиры</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={carb} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Углеводы</span>
            </div>
            <div className="nutri-value">
              <div className="nutri-value__info">
                <img src={benefit} alt="Калории" width='20px' height='20px' />
                <div className="nutri-value__sum">16</div>
              </div>
              <span className="nutri-value__name">Польза</span>
            </div>
          </div>
          <div className="nutri-value__img">
            <img src={recipe1} alt="" width='322px' height='200px' />
          </div>
          <div className="recipe__btns">
            <div className="btn btn--block">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.75V16.25M16.25 10H3.75" strokeWidth="1.5" stroke-linecap="round" strokeLinejoin="round"/>
              </svg>
              <span>В дневник</span>
            </div>
            <div className="btn btn--block" style={{gridTemplateColumns: '1fr', gridGap: 'none'}}>
              <svg width="20" height="20" style={{stroke: 'none'}} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7386 19.9996C15.6201 19.9996 15.5008 19.9703 15.3937 19.9103L10.0001 16.9289L4.60741 19.9103C4.36813 20.0439 4.07385 20.0267 3.85029 19.8689C3.62672 19.7111 3.51243 19.4396 3.55672 19.1696L4.59384 12.8097L2.33031 10.5212C2.05318 10.2405 2.05532 9.7884 2.33603 9.51127C2.61674 9.23413 3.06887 9.23627 3.34601 9.51693L5.86525 12.0641C6.02596 12.2269 6.09953 12.4562 6.06239 12.6812L5.20312 17.9489L9.65447 15.4883C9.86947 15.3697 10.1309 15.3697 10.3459 15.4883L14.7972 17.9489L13.9379 12.6812C13.9015 12.4576 13.9737 12.2291 14.1315 12.0676L17.8036 8.30413L12.7615 7.53413C12.5265 7.49773 12.3244 7.347 12.223 7.13127L10.0001 2.39567L7.77733 7.13127C7.67593 7.347 7.4738 7.49773 7.2388 7.53413L0.822487 8.51413C0.433923 8.57553 0.068216 8.30627 0.00821718 7.91553C-0.0510674 7.5256 0.216785 7.16127 0.606777 7.10127L6.64595 6.17917L9.35373 0.410706C9.47087 0.159997 9.723 0 10.0001 0C10.2773 0 10.5295 0.159997 10.6466 0.410706L13.3544 6.17917L19.3935 7.10127C19.6579 7.142 19.8778 7.327 19.9628 7.5806C20.0478 7.83413 19.9835 8.11487 19.7971 8.30627L15.4065 12.8062L16.4443 19.1696C16.4886 19.4396 16.3736 19.7111 16.1507 19.8689C16.0272 19.9553 15.8829 19.9996 15.7386 19.9996Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorites