import TabBar from "../components/Tabbar/Tabbar"

const MainLayout = ({children}) =>{
    return(
        <main className="overflow-x-hidden">
            <TabBar/>
            <div className="px-2.5">
                {children}
            </div>
        </main>
    )
}

export default MainLayout