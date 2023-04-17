import Dropdown from 'react-bootstrap/Dropdown';

export function SortDropdownItem(props) {
  const { name, id, setName, setId } = props;

  return (
    <Dropdown.Item
      onClick={() => {
        setName(`Sort By: ${name}`);
        setId(id);
      }}
    >
      {name}
    </Dropdown.Item>
  );
}
