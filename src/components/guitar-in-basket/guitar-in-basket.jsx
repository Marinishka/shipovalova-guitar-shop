import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {getCapitalizedWord, numberFormatter} from '../../utils/common';
import {addGuitars, addOneGuitar, deleteOneGuitar} from '../../store/action';
import {GuitarTypes} from '../../const';

function GuitarInBasket({guitarInBasket, item, onSetPopupOpen}) {
  const dispatch = useDispatch();

  const quantity = useRef(null);

  const onIncrementClick = (art) => {
    dispatch(addOneGuitar(art));
    quantity.current.value = item.quantity + 1;
  };

  const onDecrementClick = (art) => {
    if (item.quantity <= 1) {
      onSetPopupOpen([`delete`, guitarInBasket]);
    } else {
      dispatch(deleteOneGuitar(art));
      quantity.current.value = item.quantity - 1;
    }
  };

  const onQuantityInput = (art, value) => {
    if (value === 0) {
      onSetPopupOpen([`delete`, guitarInBasket]);
      quantity.current.value = item.quantity;
    } else {
      dispatch(addGuitars({art, quantity: Number(value)}));
      quantity.current.value = value;
    }
  };

  const onCloseClick = (evt) => {
    evt.preventDefault();
    onSetPopupOpen([`delete`, guitarInBasket]);
  };

  return <li className="basket__item" key={guitarInBasket.art}>
    <section className="basket__section">
      <div className="basket__info">
        <button className="basket__btn-close" onClick={onCloseClick}></button>
        <img className="basket__img"
          width="60"
          height="124"
          src={`./img/${GuitarTypes[guitarInBasket.type][0]}-mini.png`}
          alt={`${guitarInBasket.strings} струнная ${guitarInBasket.type} ${guitarInBasket.name}`}></img>
        <div className="basket__specifications">
          <h3 className="basket__title">{getCapitalizedWord(guitarInBasket.type)} {guitarInBasket.name}</h3>
          <div className="basket__characteristic">Артикул: {guitarInBasket.art}</div>
          <div className="basket__characteristic">{getCapitalizedWord(guitarInBasket.type)}, {guitarInBasket.strings} струнная</div>
        </div>
      </div>
      <div className="basket__price">{numberFormatter.format(guitarInBasket.price)} &#8381;</div>
      <div className="basket__btns">
        <button className="basket__btn basket__btn--decrement" type="button" onClick={(evt) => {
          evt.preventDefault();
          onDecrementClick(item.art);
        }}>-</button>
        <input type="number" min="0" className="basket__amount" ref={quantity} defaultValue={Number(item.quantity)} onBlur={(evt) => {
          evt.preventDefault();
          onQuantityInput(item.art, Math.abs(evt.target.value));
        }}></input>
        <button className="basket__btn basket__btn--increment" type="button" onClick={(evt) => {
          evt.preventDefault();
          onIncrementClick(item.art);
        }}>+</button>
      </div>
      <div className="basket__item-sum">{numberFormatter.format(guitarInBasket.price * item.quantity)} &#8381;</div>
    </section>
  </li>;
}

GuitarInBasket.propTypes = {
  guitarInBasket: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onSetPopupOpen: PropTypes.func.isRequired
};

export default GuitarInBasket;
