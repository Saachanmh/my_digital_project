import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage.jsx'
import ExercicePage from '../pages/ExercicePage.jsx'
import StatistiquesPage from '../pages/StatistiquesPage.jsx'
import TrainingPage from '../pages/TrainingPage.jsx'
import WorkoutSessionPage from '../pages/WorkoutSessionPage.jsx'
import WorkoutTimerPage from '../pages/WorkoutTimerPage.jsx'
import EditExercisePage from '../pages/EditExercisePage.jsx'
import CreateExercisePage from '../pages/CreateExercisePage.jsx'
import ExerciseDetailPage from '../pages/ExerciseDetailPage.jsx'
import SignupPage from '../components/Auth/SignupPage.jsx'
import UserInfoPage from '../components/Auth/UserInfoPage.jsx'
import NewRoutinePage from '../pages/NewRoutinePage.jsx'
import CreateWorkoutPage from '../pages/CreateWorkoutPage.jsx'
import GCUPage from '../pages/GCUPage.jsx'
import ConditionsOfSalePage from '../pages/ConditionsOfSalePage.jsx'

function MainRouter () {
    return (
        <Routes>
            <Route
                path='*'
                element={<Navigate to='/' replace />}
            />
            <Route path='/' element={<TrainingPage />} />
            <Route path='/exercise' element={<ExercicePage/>} />
            <Route path='/stat' element={<StatistiquesPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/workout-session' element={<WorkoutSessionPage/>} />
            <Route path='/workout-session/:sessionId' element={<WorkoutSessionPage/>} />
            <Route path='/workout-timer' element={<WorkoutTimerPage/>} />
            <Route path='/workout-timer/:sessionId' element={<WorkoutTimerPage/>} />
            <Route path='/edit-exercise/:id' element={<EditExercisePage/>} />
            <Route path='/create-exercise' element={<CreateExercisePage/>} />
            <Route path='/exercise/:id' element={<ExerciseDetailPage/>} />
            <Route path='signup' element={<SignupPage/>} />
            <Route path='user-info' element={<UserInfoPage/>} />
            <Route path='/new-routine' element={<NewRoutinePage/>} />
            <Route path='/create-workout' element={<CreateWorkoutPage/>} />
            <Route path='/create-workout/:routineId' element={<CreateWorkoutPage/>} />
            <Route path='/gcu' element={<GCUPage/>} />
            <Route path='/conditions-of-sale' element={<ConditionsOfSalePage/>} />
        </Routes>
    )
}

export default MainRouter
