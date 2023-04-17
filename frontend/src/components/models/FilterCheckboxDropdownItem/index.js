import './FilterCheckboxDropdownItem.css';

import Dropdown from 'react-bootstrap/Dropdown';
import FormCheck from 'react-bootstrap/FormCheck';

function updateFilterList(append, value, filters, setFilters) {
  let copy = filters.slice();

  if (append) {
    copy.push(value);
  } else {
    copy = copy.filter(e => e !== value);
  }

  setFilters(copy);
}

export function FilterCheckboxDropdownItem(props) {
  const { value, filters, setFilters } = props;

  return (
    <Dropdown.Item
      onClick={e => {
        e.stopPropagation();
        const checkbox = e.currentTarget.querySelector('input');
        checkbox.click();
      }}
    >
      <FormCheck
        type="checkbox"
        label={value}
        className="filter-checkbox"
        onClick={e => {
          e.stopPropagation();
          updateFilterList(e.currentTarget.checked, value, filters, setFilters);
        }}
      />
    </Dropdown.Item>
  );
}
