import styles from '../styles/QuotesForm.module.css';
import QuoteModel from '../model/quote';
import React, { useRef } from 'react';

const QuotesForm: React.FC<{onAddQuote: (quote: QuoteModel) => void}> = ({onAddQuote}) => {

  const authorRef = useRef<HTMLInputElement>(null);
  const quoteRef = useRef<HTMLTextAreaElement>(null);

  const addButtonClickHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const quote = new QuoteModel(
      Math.floor(Math.random()*100000 + 1), 
      quoteRef.current ? quoteRef.current.value : '',
      authorRef.current ? authorRef.current.value: ''
    );
    onAddQuote(quote);
  };

  return (
    <form className={styles.quotesForm} onSubmit={addButtonClickHandler}>
      <div className={styles.inputSection}>
        <label htmlFor="author">Author</label>
        <input id="author" type="text" placeholder="Name" ref={authorRef} />
      </div>
      <div className={styles.inputSection}>
        <label htmlFor="quote">Quote</label>
        <textarea id="quote" placeholder="Quote body" ref={quoteRef} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default QuotesForm;