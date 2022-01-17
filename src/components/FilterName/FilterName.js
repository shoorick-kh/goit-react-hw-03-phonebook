import PropTypes from 'prop-types';
import s from './FilterName.module.css';

export default function FilterName({ value, onChange }) {
  return (
    <label className={s.filter}>
      Find contacts by name:
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

FilterName.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
