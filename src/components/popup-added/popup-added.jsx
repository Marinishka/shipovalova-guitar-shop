import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Routes} from '../../const';

function PopupAdded({closePopup}) {
  const onLinkCkick = () => {
    closePopup();
  };

  const onContinueClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  return <div className="popup__inner">
    <div className="popup__title popup__title--added">Товар успешно добавлен в корзину</div>
    <div className="popup__btns">
      <Link className="popup__link" to={Routes.BASKET} onClick={onLinkCkick}>Перейти в корзину</Link>
      <button className="popup__btn-close" type="button" onClick={onContinueClick}>Продолжить покупки</button>
    </div>
  </div>;
}

PopupAdded.propTypes = {
  closePopup: PropTypes.func.isRequired
};

export default PopupAdded;
