import Pagination from 'react-bootstrap/Pagination';

import { clamp } from '../../../util/clamp';

function isLeftEdge(firstPage, maxVisiblePages, page) {
  const half = Math.floor(maxVisiblePages / 2);
  const max = firstPage + half - 1;
  return page <= max;
}

function isRightEdge(lastPage, maxVisiblePages, page) {
  const half = Math.floor(maxVisiblePages / 2);
  const min = lastPage - half + 1;
  return page >= min;
}

export function CustomPagination(props) {
  const { firstPage, lastPage, maxVisiblePages, setPage, getCurrentPage } = props;

  const bounds = determineBounds();
  const items = createItems(bounds.start, bounds.end);

  function determineBounds() {
    let start, end;

    if (isLeftEdge(firstPage, maxVisiblePages, getCurrentPage())) {
      start = firstPage;
      end = Math.min(lastPage, firstPage + maxVisiblePages - 1);
    } else if (isRightEdge(lastPage, maxVisiblePages, getCurrentPage())) {
      start = Math.max(firstPage, lastPage - maxVisiblePages + 1);
      end = lastPage;
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      start = getCurrentPage() - half;
      end = start + maxVisiblePages - 1;
    }

    return { start, end };
  }

  function createItems(start, end) {
    const ret = [];

    for (let i = start; i <= end; i++) {
      ret.push(
        <Pagination.Item active={i === getCurrentPage()} onClick={handleClick}>
          {i}
        </Pagination.Item>,
      );
    }

    return ret;
  }

  function tryGoToPage(page) {
    const resPage = clamp(firstPage, lastPage, page);
    setPage(resPage);
  }

  function handleClick(e) {
    const parent = e.currentTarget.parentElement;
    if (parent.classList.contains('active')) return;

    const page = parseInt(e.currentTarget.text);
    tryGoToPage(page);
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => tryGoToPage(firstPage)} disabled={getCurrentPage() === firstPage} />
      <Pagination.Prev onClick={() => tryGoToPage(getCurrentPage() - 1)} disabled={getCurrentPage() === firstPage} />
      {items}
      <Pagination.Next onClick={() => tryGoToPage(getCurrentPage() + 1)} disabled={getCurrentPage() === lastPage} />
      <Pagination.Last onClick={() => tryGoToPage(lastPage)} disabled={getCurrentPage() === lastPage} />
    </Pagination>
  );
}
