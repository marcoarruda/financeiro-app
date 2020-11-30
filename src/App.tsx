import React from 'react';

import AppProvider from './contexts/AppContext';
import Router from './router/Router';

const App: React.FC = () => {
  let rows = []
  for(let i = 0; i < 5; i++){
    rows.push(<p key={i}>Excepteur tempor nisi sint ea sunt fugiat fugiat magna sint ad est culpa Lorem. Officia nostrud consectetur do ullamco veniam esse do duis. Duis ad consequat culpa officia id est dolore eiusmod culpa eiusmod ullamco. Tempor culpa adipisicing aliquip officia ut incididunt culpa. Aliquip amet do enim exercitation ad dolor amet veniam. Cupidatat dolor nostrud eu adipisicing.</p>)
  }

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App
