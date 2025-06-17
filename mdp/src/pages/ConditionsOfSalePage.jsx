import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConditionsOfSalePage = () => {
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
        <h1 className="text-2xl font-bold text-[var(--color-purple)]">Conditions Générales de Vente</h1>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto pb-24">
        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">1. Objet</h2>
          <p className="text-gray-700">
            Les présentes Conditions Générales de Vente régissent les relations contractuelles entre Fit'else et ses clients pour l'achat de services premium ou d'abonnements via l'application.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">2. Prix et paiement</h2>
          <p className="text-gray-700">
            Les prix de nos services sont indiqués en euros, toutes taxes comprises. Le paiement s'effectue en ligne via les méthodes de paiement proposées dans l'application. Votre abonnement sera activé après confirmation du paiement.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">3. Abonnements</h2>
          <p className="text-gray-700">
            Les abonnements sont renouvelés automatiquement à la fin de chaque période, sauf résiliation de votre part au moins 24 heures avant la date de renouvellement. Vous pouvez gérer et annuler vos abonnements depuis les paramètres de votre compte.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">4. Droit de rétractation</h2>
          <p className="text-gray-700">
            Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la date d'achat pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">5. Service client</h2>
          <p className="text-gray-700">
            Pour toute question relative à votre commande ou abonnement, notre service client est disponible par email à support@fitelse.com.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">6. Modalités de remboursement</h2>
          <p className="text-gray-700">
            En cas d'exercice du droit de rétractation dans le délai imparti, Fit'else s'engage à vous rembourser la totalité des sommes versées, au plus tard dans les 14 jours suivant la date à laquelle nous sommes informés de votre décision de vous rétracter.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">7. Responsabilité</h2>
          <p className="text-gray-700">
            Fit'else ne pourra être tenu responsable de l'inexécution du contrat conclu en cas de rupture de stock, d'indisponibilité du service, de force majeure, de perturbation ou grève totale ou partielle notamment des services postaux et moyens de transport et/ou communications.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">8. Protection des données personnelles</h2>
          <p className="text-gray-700">
            Les informations collectées lors de l'achat d'un service ou d'un abonnement sont nécessaires au traitement de votre commande et sont destinées à Fit'else. Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et d'opposition aux données vous concernant.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">9. Propriété intellectuelle</h2>
          <p className="text-gray-700">
            L'ensemble des éléments (textes, logos, images, éléments graphiques, etc.) constitutifs de l'application Fit'else est la propriété exclusive de Fit'else ou de ses partenaires. Toute reproduction totale ou partielle de ces éléments est strictement interdite sans autorisation préalable.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[var(--color-yellow)]">
          <h2 className="text-xl font-semibold mb-2 text-[var(--color-purple-800)]">10. Loi applicable et juridiction compétente</h2>
          <p className="text-gray-700">
            Les présentes Conditions Générales de Vente sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConditionsOfSalePage;