import { useEffect, useState } from 'react';
import './Issues.scss';
import Formulaire from './Formulaire';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface Column {
  id: string;
  title: string;
}

export default function Issues() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const groupedIssues = columns.map((col) => ({
    ...col,
    issues: issues.filter((i) => i.status === col.id),
  }));

  // Ajouter ou éditer une issue
  const handleSubmitIssue = (titre: string, description: string) => {
    if (selectedIssue) {
      // Edition
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === selectedIssue.id ? { ...issue, title: titre, description } : issue
        )
      );
    } else {
      // Ajout
      const newIssue: Issue = {
        id: (issues.length + 1).toString(),
        title: titre,
        description,
        status: 'todo',
      };
      setIssues([...issues, newIssue]);
    }
    setSelectedIssue(null);
    setIsIssueModalOpen(false);
  };

  // Drag & Drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('issueId', id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: string) => {
    const id = e.dataTransfer.getData('issueId');
    setIssues((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn: Column = {
      id: newColumnTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newColumnTitle,
    };

    setColumns((prev) => [...prev, newColumn]);
    setIsColumnModalOpen(false);
  };

  // Charger les issues et les colonnes depuis un fichier local
  useEffect(() => {
    window.electron.storage.getData().then((data) => {
      setColumns(data.columns && data.columns.length > 0 ? data.columns : DEFAULT_COLUMNS);
      setIssues(data.issues && data.issues.length > 0 ? data.issues : DEFAULT_ISSUES);
    });
  }, []);

  // Enregistrer les issues et les colonnes dans un fichier local à chaque changement
  useEffect(() => {
    window.electron.storage.saveData({ columns, issues });
  }, [columns, issues]);

  return (
    <div className="issue-container">
      {/* Bouton ajouter une issue */}
      <button
        className="add-issue-btn"
        onClick={() => {
          setSelectedIssue(null);
          setIsIssueModalOpen(true);
        }}
      >
        Ajouter une issue
      </button>

      {/* Bouton ajouter une colonne */}
      <button
        className="add-column-btn"
        onClick={() => {
          setNewColumnTitle('');
          setIsColumnModalOpen(true);
        }}
      >
        Ajouter une colonne
      </button>

      {/* Modal (pour ajout ou édition d'une issue) */}
      {isIssueModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsIssueModalOpen(false)}>
              ✕
            </button>
            {selectedIssue ? (
              <h3 style={{ opacity: 0 }}>Éditer une issue</h3>
            ) : (
              <h3>Ajouter une issue</h3>
            )}
            <Formulaire
              initialTitle={selectedIssue?.title || ''}
              initialDescription={selectedIssue?.description || ''}
              handleSub={handleSubmitIssue}
              submitLabel={selectedIssue ? 'Éditer' : 'Ajouter'}
            />
          </div>
        </div>
      )}

      {/* Modal pour ajout d'une colonne */}
      {isColumnModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsColumnModalOpen(false)}>
              ✕
            </button>
            <h3>Ajouter une colonne</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddColumn();
              }}
            >
              <input
                type="text"
                placeholder="Nom de la colonne"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
      )}

      {/* Affichage des colonnes et de leurs issues associées */}
      <div className="issue-columns">
        {groupedIssues.map((column) => (
          <div
            key={column.id}
            className="issue-column"
            onDrop={(e) => handleDrop(e, column.id)}
            onDragOver={handleDragOver}
          >
            <h2>{column.title}</h2>
            {column.issues.map((issue) => (
              <div
                key={issue.id}
                className="issue-item"
                draggable
                onDragStart={(e) => handleDragStart(e, issue.id)}
                onDoubleClick={() => {
                  setSelectedIssue(issue);
                  setIsIssueModalOpen(true);
                }}
              >
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
