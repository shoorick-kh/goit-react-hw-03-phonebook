import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

export default function ContactItem({ contact, onDelete }) {
  return (
    <li className={s.item}>
      <span className={s.name}>{contact.name}</span>
      <span className={s.number}>{contact.number}</span>
      <button
        className={s.button}
        type="button"
        onClick={() => onDelete(contact.id)}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired,
};
