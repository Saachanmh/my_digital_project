import React from 'react';
import { Drawer } from '@mui/material';
import ExoCard from '../Cards/ExoCard';

const CategoryDrawer = ({ category, open, onClose }) => {

  const data = [{
    bodyPart:"back",
    equipment:"cable",
    gifUrl:"https://v2.exercisedb.io/image/-NR4Wo2F592SoH",
    id:"0007",
    name:"alternate lateral pulldown",
    target:"lats",
    secondaryMuscles:'',
    instructions:'',
    },
    {
      bodyPart:"back",
      equipment:"cable",
      gifUrl:"https://v2.exercisedb.io/image/-NR4Wo2F592SoH",
      id:"0007",
      name:"machin truc",
      target:"lats",
      secondaryMuscles:'',
      instructions:'',
      },
      {
        bodyPart:"back",
        equipment:"cable",
        gifUrl:"https://v2.exercisedb.io/image/-NR4Wo2F592SoH",
        id:"0007",
        name:"machin bidule",
        target:"lats",
        secondaryMuscles:'',
        instructions:'',
        },
        {
          bodyPart:"back",
          equipment:"cable",
          gifUrl:"https://v2.exercisedb.io/image/-NR4Wo2F592SoH",
          id:"0007",
          name:"machin truc",
          target:"lats",
          secondaryMuscles:'',
          instructions:'',
          },
          {
            bodyPart:"back",
            equipment:"cable",
            gifUrl:"https://v2.exercisedb.io/image/-NR4Wo2F592SoH",
            id:"0007",
            name:"machin bidule",
            target:"lats",
            secondaryMuscles:'',
            instructions:'',
            }
  ]

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'rounded-t-xl p-4 h-2/3',
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{category.name}</h2>
        <button onClick={onClose} className="text-gray-600">
          Fermer
        </button>
      </div>
      <div className="overflow-y-auto">
        <p>Liste des exercices pour {category.name}</p>
        {/* Exercise list would go here */}
        <div className='grid grid-cols-2 gap-2.5'>
          {data.map((exo)=>{
            return (
              <ExoCard
                className="rounded-3xl bg-gray-200 p-2.5 w-full flex flex-col items-center"
                key={exo.id}
                exo={exo}
              />
            )
          })}
        </div>
      </div>
    </Drawer>
  );
};

export default CategoryDrawer;