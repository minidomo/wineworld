import latinize from 'latinize';
import Highlighter from 'react-highlight-words';

export function highlightText(text, query) {
  if (typeof query === 'string') {
    const words = query.split(/\s+/);
    return (
      <Highlighter
        highlightStyle={{
          padding: '0',
          backgroundColor: '#ffd54f',
        }}
        searchWords={words}
        sanitize={latinize}
        textToHighlight={text}
      />
    );
  }

  return text;
}
