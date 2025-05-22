import TabBar from "../components/Tabbar/Tabbar"

const MainLayout = ({children}) =>{
    return(
        <main>
            <TabBar/>
            <div>
                {children}
            </div>
        </main>
    )
}

export default MainLayout