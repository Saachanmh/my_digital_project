import { useNavigate } from 'react-router-dom';

const ExoCard = ({exo,...props}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/exercise/${exo.id}`);
    };
    
    return(
        <div {...props} onClick={handleClick} className={`${props.className || ''} cursor-pointer`}>
            <img className="rounded-2xl " src={exo.gifUrl} alt={exo.name}/>
            <h3 className="text-center">{exo.name}</h3>
        </div>
    )
}

export default ExoCard