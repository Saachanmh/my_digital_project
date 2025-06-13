import React from 'react';
import { useNavigate } from 'react-router-dom';

const GCUPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-2 text-gray-600"
        >
          ← Retour
        </button>
        <h1 className="text-2xl font-bold">Conditions Générales d'Utilisation</h1>
      </div>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptation des conditions</h2>
          <p className="text-gray-700">
            En accédant et en utilisant l'application Fit'else, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Description du service</h2>
          <p className="text-gray-700">
            Fit'else est une application de fitness qui permet aux utilisateurs de suivre leurs entraînements, créer des routines d'exercices, et suivre leur progression.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Compte utilisateur</h2>
          <p className="text-gray-700">
            Pour utiliser certaines fonctionnalités de l'application, vous devrez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de compte et de toutes les activités qui se produisent sous votre compte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Confidentialité</h2>
          <p className="text-gray-700">
            Votre utilisation de l'application est également régie par notre Politique de Confidentialité, qui décrit comment nous collectons, utilisons et partageons vos informations personnelles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Modifications des conditions</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur l'application. Votre utilisation continue de l'application après de telles modifications constitue votre acceptation des nouvelles conditions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default GCUPage;