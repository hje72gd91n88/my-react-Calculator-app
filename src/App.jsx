import React, { useEffect, useState } from 'react';
import Display from './components/Display';
import History from './components/History';

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [history, setHistory] = useState([]);

  // دالة إدخال الأرقام
  const inputDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  // دالة العلامة العشرية
  const inputDecimal = () => {
    if (waitingForSecondValue) {
      setDisplayValue('0.');
      setWaitingForSecondValue(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // دالة مسح خانة واحدة
  const handleDelete = () => {
    setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
  };

  // مسح كامل للآلة الحاسبة
  const clearAll = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);
    
    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);
      setFirstValue(result);
      setDisplayValue(String(result));
    }

    setOperator(nextOperator);
    setWaitingForSecondValue(true);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);
    if (operator && firstValue !== null) {
      const result = calculate(firstValue, inputValue, operator);
      
      const currentCalculation = `${firstValue} ${operator} ${inputValue} = ${result}`;
      setHistory((prev) => [currentCalculation, ...prev].slice(0, 5));

      setDisplayValue(String(result));
      setOperator(null);
      setFirstValue(null);
      setWaitingForSecondValue(false);
    }
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue(String(currentValue / 100));
  };

  // ربط لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isNaN(e.key)) inputDigit(e.key);
      if (e.key === '.') inputDecimal();
      if (['+', '-', '*', '/'].includes(e.key)) {
        const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        handleOperator(op);
      }
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Backspace') handleDelete();
      if (e.key === 'Escape') clearAll();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, firstValue, operator, waitingForSecondValue]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 font-sans p-4">
      
      {/* حاوية رئيسية تجمع الحاسبة والسجل بشكل متجاوب */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-2xl items-center justify-center">
        
        {/* صندوق الآلة الحاسبة */}
        <div className="w-full max-w-sm backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* شاشة العرض */}
        <Display 
        firstValue={firstValue} 
        operator={operator} 
        displayValue={displayValue} 
      />
         

          {/* لوحة الأزرار */}
          <div className="p-4 grid grid-cols-4 gap-3 bg-black/40">
            <button onClick={clearAll} className="p-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-rose-400 font-medium text-lg">AC</button>
            <button onClick={handleDelete} className="p-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-amber-400 font-medium text-lg">⌫</button>
            <button onClick={handlePercentage} className="p-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-cyan-400 font-medium text-lg">%</button>
            <button onClick={() => handleOperator('÷')} className="p-4 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 active:scale-95 transition-all text-cyan-400 font-semibold text-xl">÷</button>

            <button onClick={() => inputDigit('7')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">7</button>
            <button onClick={() => inputDigit('8')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">8</button>
            <button onClick={() => inputDigit('9')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">9</button>
            <button onClick={() => handleOperator('×')} className="p-4 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 active:scale-95 transition-all text-cyan-400 font-semibold text-xl">×</button>

            <button onClick={() => inputDigit('4')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">4</button>
            <button onClick={() => inputDigit('5')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">5</button>
            <button onClick={() => inputDigit('6')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">6</button>
            <button onClick={() => handleOperator('-')} className="p-4 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 active:scale-95 transition-all text-cyan-400 font-semibold text-xl">-</button>

            <button onClick={() => inputDigit('1')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">1</button>
            <button onClick={() => inputDigit('2')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">2</button>
            <button onClick={() => inputDigit('3')} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">3</button>
            <button onClick={() => handleOperator('+')} className="p-4 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 active:scale-95 transition-all text-cyan-400 font-semibold text-xl">+</button>

            <button onClick={() => inputDigit('0')} className="col-span-2 p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg text-left pl-6">0</button>
            <button onClick={inputDecimal} className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-white font-medium text-lg">.</button>
            <button onClick={handleEquals} className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 active:scale-95 transition-all text-white font-semibold text-xl shadow-lg shadow-cyan-500/25">=</button>
          </div>
        </div>

        {/* صندوق السجل (History Panel) */}
        <History 
       setHistory={setHistory}
       history={history}
      />

      </div>
    </div>
  );
}