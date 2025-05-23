const ExoCard = ({exo,...props}) => {
    return(
        <div {...props}>
            <img className="rounded-2xl " src={exo.gifUrl}/>
            <h3 className="text-center">{exo.name}</h3>
        </div>
    )
}

export default ExoCard