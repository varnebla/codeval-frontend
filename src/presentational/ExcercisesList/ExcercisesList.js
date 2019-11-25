import React from 'react';

import ExercisesListItem from '../ExcercisesListItem/ExcercisesListItem';

function ExercisesList ( { exercises }) {

  return (
    <div style={{margin: '20px'}}>
      {exercises && exercises.map(oneExer => (
        <ExercisesListItem key={oneExer._id} exercise={oneExer}/>
      ))}
    </div>
  );
}

export default ExercisesList;