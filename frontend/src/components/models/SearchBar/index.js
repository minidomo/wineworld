import Form from 'react-bootstrap/Form';

export function SearchBar(props) {
  const { placeholder, setValue } = props;
  const valueIfEmpty = 'valueIfEmpty' in props ? props.valueIfEmpty : '';

  function submit(e) {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');

    let value = input.value;
    if (value === '') {
      value = valueIfEmpty;
    }

    setValue(value);
  }

  return (
    <Form onSubmit={submit} className="d-flex mt-2">
      <Form.Control className="custom" type="search" placeholder={placeholder} size="sm" />
    </Form>
  );
}
