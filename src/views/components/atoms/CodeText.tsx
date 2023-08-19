import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighligter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const customCode: CodeComponent = ({ inline, className, children }) => {
  const style = tomorrow;
  const match = /language-(\w+)(:?.+)?/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';
  const name = match && match[2] ? match[2].slice(1) : '';

  return !inline && match ? (
    <>
      {name && <span>{name}</span>}
      <SyntaxHighligter
        children={String(children).replace(/\n$/, '')}
        style={style}
        language={lang}
        PreTag='div'
      />
    </>
  ) : (
    <code className='mx-1 rounded-md bg-stone-200 py-1 px-2 text-blue-600 dark:bg-stone-600 dark:text-red-300'>
      {children}
    </code>
  );
};

export const articleComponents = {
  code: customCode,
};
