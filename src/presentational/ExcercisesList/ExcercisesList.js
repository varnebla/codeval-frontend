import React from 'react';

import ExercisesListItem from '../ExcercisesListItem/ExcercisesListItem';
import './ExercisesList.css';

function ExercisesList ( { exercises }) {

  return (
    <div className="exerciseList-container">
      {exercises && exercises.map(oneExer => (
        <ExercisesListItem key={oneExer._id} exercise={oneExer}/>
      ))}
    </div>
  );
}

export default ExercisesList;