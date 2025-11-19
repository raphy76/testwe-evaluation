import React, { useState } from 'react';

interface FormulaireProps {
  handleSub: (titre: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  submitLabel?: string; // Nouveau prop
}

export default function Formulaire({
  handleSub,
  initialTitle = '',
  initialDescription = '',
  submitLabel = 'Envoyer',
}: FormulaireProps) {
  const [titre, setTitre] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSub(titre, description);
    setTitre('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
