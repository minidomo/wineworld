import './FilterInput.css';

import { isDigits, isNumber } from '../../../util/number';

export function FilterInput(props) {
  const { check, parse, setFilter, placeholder } = props;

  return (
    <input
      type="text"
      className="form-control filter-input"
      placeholder={placeholder}
      onChange={e => {
        const classList = e.currentTarget.classList;
        const inputValue = e.currentTarget.value.trim();
        if (check(inputValue)) {
          setFilter(parse(inputValue));
          classList.remove('invalid');
        } else if (inputValue === '') {
          setFilter(undefined);
          classList.remove('invalid');
        } else {
          setFilter(undefined);
          classList.add('invalid');
        }
      }}
    />
  );
}

export function FilterIntegerInput(props) {
  return <FilterInput check={isDigits} parse={parseInt} setFilter={props.setFilter} placeholder={props.placeholder} />;
}

export function FilterNumberInput(props) {
  return (
    <FilterInput check={isNumber} parse={parseFloat} setFilter={props.setFilter} placeholder={props.placeholder} />
  );
}
