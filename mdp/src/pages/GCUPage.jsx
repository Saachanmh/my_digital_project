import React from 'react';
import { useNavigate } from 'react-router-dom';

const GCUPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-auto">
      <div className="flex items-center p-4 border-b border-gray-200">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-2 text-[var(--color-purple)] hover:text-[var(--color-purple-700)]"
        >
          ← Retour
        </button>
        <h1 className="text-2xl font-bold text-[var(--color-purple)]">Conditions Générales d'Utilisation</h1>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">1. Acceptation des conditions</h2>
          <p className="text-gray-700">
            En accédant et en utilisant l'application Fit'else, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">2. Description du service</h2>
          <p className="text-gray-700">
            Fit'else est une application de fitness qui permet aux utilisateurs de suivre leurs entraînements, créer des routines d'exercices, et suivre leur progression.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">3. Compte utilisateur</h2>
          <p className="text-gray-700">
            Pour utiliser certaines fonctionnalités de l'application, vous devrez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de compte et de toutes les activités qui se produisent sous votre compte.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">4. Confidentialité</h2>
          <p className="text-gray-700">
            Votre utilisation de l'application est également régie par notre Politique de Confidentialité, qui décrit comment nous collectons, utilisons et partageons vos informations personnelles.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">5. Modifications des conditions</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur l'application. Votre utilisation continue de l'application après de telles modifications constitue votre acceptation des nouvelles conditions.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">6. Limitation de responsabilité</h2>
          <p className="text-gray-700">
            Fit'else et ses créateurs ne peuvent être tenus responsables des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser l'application. Vous utilisez l'application à vos propres risques.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">7. Propriété intellectuelle</h2>
          <p className="text-gray-700">
            Tous les droits de propriété intellectuelle relatifs à l'application Fit'else, y compris les droits d'auteur, les marques commerciales, les logos, les graphiques, et le contenu, sont la propriété exclusive de Fit'else ou de ses concédants de licence.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">8. Résiliation</h2>
          <p className="text-gray-700">
            Nous nous réservons le droit de résilier ou de suspendre votre accès à l'application, sans préavis, pour toute raison, y compris, sans limitation, si vous violez ces Conditions Générales d'Utilisation.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">9. Loi applicable</h2>
          <p className="text-gray-700">
            Ces Conditions Générales d'Utilisation sont régies par les lois françaises. Tout litige relatif à l'interprétation ou à l'exécution de ces conditions sera soumis à la compétence exclusive des tribunaux français.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">10. Contact</h2>
          <p className="text-gray-700">
            Si vous avez des questions concernant ces Conditions Générales d'Utilisation, veuillez nous contacter à l'adresse suivante : support@fitelse.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default GCUPage;