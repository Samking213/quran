/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Home from './components/Home';
import Reader from './components/Reader';

export default function App() {
  const [currentPara, setCurrentPara] = useState<number | null>(null);

  return (
    <>
      {currentPara ? (
        <Reader 
          paraNum={currentPara} 
          onBack={() => setCurrentPara(null)} 
          onNextPara={() => setCurrentPara(currentPara + 1)}
        />
      ) : (
        <Home onSelectPara={setCurrentPara} />
      )}
    </>
  );
}
