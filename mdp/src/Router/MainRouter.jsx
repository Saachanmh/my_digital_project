import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProfilePage from '../pages/ProfilePage'
import ExercicePage from '../pages/ExercicePage.jsx'
import StatistiquesPage from '../pages/StatistiquesPage.jsx'
import TrainingPage from '../pages/TrainingPage.jsx'
import WorkoutSessionPage from '../pages/WorkoutSessionPage.jsx'

function MainRouter () {
    return (
        <Routes>
            <Route
                path='*'
                element={<Navigate to='/' replace />}
            />
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/exercise' element={<ExercicePage/>} />
            <Route path='/stat' element={<StatistiquesPage/>} />
            <Route path='/training' element={<TrainingPage/>} />
            <Route path='/workout-session' element={<WorkoutSessionPage/>} />
        </Routes>
    )
}

export default MainRouter
