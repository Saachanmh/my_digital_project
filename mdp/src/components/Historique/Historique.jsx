import React, { useState } from 'react';

const Historique = () => {
    // Exemple de données de séances
    const séances = [
        { id: 1, date: 'Mer. 16', résumé: 'Résumé de la séance du 16' },
        { id: 2, date: 'Mar. 15', résumé: 'Résumé de la séance du 15' },
        { id: 3, date: 'Lun. 14', résumé: 'Résumé de la séance du 14' },
        { id: 4, date: 'Jeu. 10', résumé: 'Résumé de la séance du 10' },
    ];

    const [popupVisible, setPopupVisible] = useState(false);
    const [séanceSelectionnée, setSéanceSelectionnée] = useState(null);

    const afficherPopup = (séance) => {
        setSéanceSelectionnée(séance);
        setPopupVisible(true);
    };

    const fermerPopup = () => {
        setPopupVisible(false);
        setSéanceSelectionnée(null);
    };

    return (
        <div>
            <h2>Historique de la semaine</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                {séances.map((séance) => (
                    <button key={séance.id} onClick={() => afficherPopup(séance)}>
                        {séance.date}
                    </button>
                ))}
            </div>

            {popupVisible && séanceSelectionnée && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Résumé de la séance</h3>
                    <p>{séanceSelectionnée.résumé}</p>
                    <button onClick={fermerPopup}>Fermer</button>
                </div>
            )}
        </div>
    );
};

export default Historique;
