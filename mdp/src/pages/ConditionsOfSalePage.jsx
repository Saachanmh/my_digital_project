import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConditionsOfSalePage = () => {
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
        <h1 className="text-2xl font-bold">Conditions Générales de Vente</h1>
      </div>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Objet</h2>
          <p className="text-gray-700">
            Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Fit'else et ses clients pour l'achat de services premium ou d'abonnements via l'application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Prix et paiement</h2>
          <p className="text-gray-700">
            Les prix de nos services sont indiqués en euros, toutes taxes comprises. Le paiement s'effectue en ligne via les méthodes de paiement proposées dans l'application. Votre abonnement sera activé après confirmation du paiement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Abonnements</h2>
          <p className="text-gray-700">
            Les abonnements sont renouvelés automatiquement à la fin de chaque période, sauf résiliation de votre part au moins 24 heures avant la date de renouvellement. Vous pouvez gérer et annuler vos abonnements depuis les paramètres de votre compte.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Droit de rétractation</h2>
          <p className="text-gray-700">
            Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la date d'achat pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Service client</h2>
          <p className="text-gray-700">
            Pour toute question relative à votre commande ou abonnement, notre service client est disponible par email à support@fitelse.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConditionsOfSalePage;