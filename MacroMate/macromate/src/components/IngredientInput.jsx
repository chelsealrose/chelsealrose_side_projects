import { useState, useEffect } from 'react';
import { searchFoods } from '../services/nutritionService';

export default function IngredientInput({ onAdd }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [amount, setAmount] = useState('');

  // Debounced search
  useEffect(() => {
    if (term.length < 2) return setResults([]);
    const timeout = setTimeout(async () => {
      const foods = await searchFoods(term);
      setResults(foods);
    }, 300);
    return () => clearTimeout(timeout);
  }, [term]);

  const choose = (food) => {
    onAdd({ 
      name: food.description, 
      fdcId: food.fdcId, 
      amount 
    });
    setTerm('');
    setResults([]);
    setAmount('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search ingredient..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (e.g., 1 cup)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {results.length > 0 && (
        <ul style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {results.map((food) => (
            <li 
              key={food.fdcId} 
              onClick={() => choose(food)}
              style={{ cursor: 'pointer', padding: '4px' }}
            >
              {food.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

