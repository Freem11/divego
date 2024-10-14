import React, { useContext } from 'react';
import { AnimalContext } from '../contexts/animalContext';
import AnimalTag from './animalTags';
import './animalTag.css';

export default function AnimalTopAutoSuggest(props) {
  const { animalVal, setAnimalVal } = useContext(AnimalContext);

  return (
    <div className="tagContainer">
      {animalVal.length > 0 && (
        animalVal.map((animal) => {
          return (
            <AnimalTag
              key={animal}
              animalMultiSelection={animalVal}
              setAnimalMultiSelection={setAnimalVal}
              animalName={animal}
            />
          );
        })
      )}
    </div>

  );
}
