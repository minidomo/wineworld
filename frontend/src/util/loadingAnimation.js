import Spinner from 'react-bootstrap/Spinner';

export function loading({ loaded, element, defaultElement }) {
  if (loaded) {
    return element;
  }

  if (defaultElement) {
    return defaultElement;
  }

  return <Spinner animation="border" role="status" />;
}
