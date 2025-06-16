import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ExoCard = ({exo,...props}) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const handleClick = () => {
        navigate(`/exercise/${exo.id}`);
    };
    
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    
    return(
        <div 
            {...props} 
            onClick={handleClick} 
            className={`${props.className || ''} cursor-pointer w-full flex flex-col items-center`}
        >
            <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden rounded-2xl">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
                )}
                <img 
                    className={`rounded-2xl w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
                    src={exo.gifUrl} 
                    alt={exo.name}
                    onLoad={handleImageLoad}
                />
            </div>
            <h3 className="text-center mt-2">{exo.name}</h3>
        </div>
    )
}

export default ExoCard