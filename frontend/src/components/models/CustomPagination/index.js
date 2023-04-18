import Pagination from 'react-bootstrap/Pagination';

import { clamp } from '../../../util/clamp';

export function CustomPagination(props) {
  const { firstPage, lastPage, setPage, getCurrentPage } = props;

  function tryGoToPage(page) {
    setPage(clamp(firstPage, lastPage, page));
  }

  function handleClick(e) {
    const page = parseInt(e.currentTarget.text);
    tryGoToPage(page);
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => tryGoToPage(getCurrentPage() - 4)} disabled={getCurrentPage() === firstPage} />
      <Pagination.Prev onClick={() => tryGoToPage(getCurrentPage() - 1)} disabled={getCurrentPage() === firstPage} />
      {getCurrentPage() > 3 && (
        <Pagination.Item onClick={handleClick} active={getCurrentPage() === firstPage}>
          {firstPage}
        </Pagination.Item>
      )}
      {getCurrentPage() > 4 && <Pagination.Ellipsis />}
      <Pagination.Item onClick={handleClick} hidden={getCurrentPage() < 3}>
        {getCurrentPage() - 2}
      </Pagination.Item>
      <Pagination.Item onClick={handleClick} hidden={getCurrentPage() < 2}>
        {getCurrentPage() - 1}
      </Pagination.Item>
      <Pagination.Item active>{getCurrentPage()}</Pagination.Item>
      <Pagination.Item onClick={handleClick} hidden={getCurrentPage() > lastPage - 1}>
        {getCurrentPage() + 1}
      </Pagination.Item>
      <Pagination.Item onClick={handleClick} hidden={getCurrentPage() > lastPage - 2}>
        {getCurrentPage() + 2}
      </Pagination.Item>
      {getCurrentPage() < lastPage - 3 && <Pagination.Ellipsis />}
      {getCurrentPage() < lastPage - 2 && (
        <Pagination.Item onClick={handleClick} active={getCurrentPage() === lastPage}>
          {lastPage}
        </Pagination.Item>
      )}
      <Pagination.Next onClick={() => tryGoToPage(getCurrentPage() + 1)} disabled={getCurrentPage() === lastPage} />
      <Pagination.Last onClick={() => tryGoToPage(getCurrentPage() + 4)} disabled={getCurrentPage() === lastPage} />
    </Pagination>
  );
}
