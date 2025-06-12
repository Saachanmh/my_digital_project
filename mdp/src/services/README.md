# Services de Stockage Local

Ce dossier contient les services de stockage local pour l'application d'entraînement. Il utilise IndexedDB pour stocker les données localement sur l'appareil de l'utilisateur.

## Structure

- `storageService.js` : Service principal qui gère l'interaction avec IndexedDB
- `useStorage.js` : Hook React personnalisé pour utiliser le service de stockage
- `StorageContext.jsx` : Contexte React pour fournir un accès global au service de stockage
- `models.js` : Modèles de données et fonctions de création d'objets

## Utilisation

### Dans App.jsx

L'application est enveloppée dans le `StorageProvider` pour rendre le service de stockage disponible dans tous les composants :

```jsx
import { StorageProvider } from "./services/StorageContext.jsx";

function App() {
  return (
    <StorageProvider>
      <MainLayout>
        <MainRouter/>
      </MainLayout>
    </StorageProvider>
  );
}
```

### Dans les composants

Pour utiliser le service de stockage dans un composant :

```jsx
import { useStorageContext } from '../services/StorageContext';
import { createSession } from '../services/models';

const MyComponent = () => {
  const { 
    addSession, 
    getAllSessions,
    isInitialized 
  } = useStorageContext();

  const handleCreateSession = async () => {
    const newSession = createSession('Ma séance', 'routine-id');
    await addSession(newSession);
  };

  return (
    // ...
  );
};
```

## Modèles de données

### Routine

```js
{
  id: String,
  name: String,
  description: String,
  days: Array<String>,
  createdAt: String (ISO date),
  updatedAt: String (ISO date)
}
```

### Session

```js
{
  id: String,
  name: String,
  routineId: String,
  duration: Number (minutes),
  calories: Number,
  completed: Boolean,
  scheduledDate: String (ISO date) | null,
  completedDate: String (ISO date) | null,
  createdAt: String (ISO date),
  updatedAt: String (ISO date)
}
```

### Exercise

```js
{
  id: String,
  name: String,
  sessionId: String,
  muscles: Array<String>,
  sets: Array<Set>,
  notes: String,
  imageUrl: String,
  order: Number,
  createdAt: String (ISO date),
  updatedAt: String (ISO date)
}
```

### Set

```js
{
  id: String,
  reps: Number,
  weight: Number,
  completed: Boolean
}
```