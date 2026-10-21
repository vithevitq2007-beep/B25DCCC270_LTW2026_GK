const BUILD_TAG = "hb-9472";

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Contact } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';
import './App.css';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Contact[]>('/data/contacts.json', { signal: controller.signal })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.name === 'CanceledError') {
          return;
        }
        setError('Không tải được dữ liệu.');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDeleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="contacts/new"
          element={
            <AddContact
              contacts={contacts}
              onAddContact={handleAddContact}
            />
          }
        />
        <Route
          path="contacts/:id"
          element={<ContactDetail contacts={contacts} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
