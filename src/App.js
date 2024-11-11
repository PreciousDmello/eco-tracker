import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/cards';
import { Button } from './components/ui/buttons';
import './index.css';

const ECO_ACTIONS = [
  { id: 1, name: 'Use Public Transport', reduction: 2.5 },
  { id: 2, name: 'Recycle Waste', reduction: 1.2 },
  { id: 3, name: 'Use Reusable Bag', reduction: 0.5 },
  { id: 4, name: 'Turn Off Unused Lights', reduction: 0.3 },
  { id: 5, name: 'Plant a Tree', reduction: 5.0 }
];

const App = () => {
  const [trackedActions, setTrackedActions] = useState([]);

  const handleAddAction = (action) => {
    setTrackedActions(prev => {
      const existing = prev.find(a => a.id === action.id);
      return existing
        ? prev.map(a => a.id === action.id ? { ...a, count: a.count + 1 } : a)
        : [...prev, { ...action, count: 1 }];
    });
  };

  const handleClearActions = () => setTrackedActions([]);
  
  const handleRemoveAction = (id) => {
    setTrackedActions(prev => prev.filter(a => a.id !== id));
  };

  const totalReduction = trackedActions.reduce((sum, a) => sum + a.reduction * a.count, 0);

  return (
    <div className="container">
      <h1>Eco Action Tracker</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {ECO_ACTIONS.map(action => (
            <div key={action.id}>
              <span>{action.name}</span>
              <Button onClick={() => handleAddAction(action)}>Add</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total CO2 Reduction: {totalReduction} kg</p>
          <Button onClick={handleClearActions}>Clear All</Button>
          {trackedActions.length === 0 ? (
            <p>No actions tracked yet</p>
          ) : (
            trackedActions.map(action => (
              <div key={action.id}>
                <p>{action.name} - {action.reduction * action.count} kg</p>
                <Button onClick={() => handleRemoveAction(action.id)}>Delete</Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
