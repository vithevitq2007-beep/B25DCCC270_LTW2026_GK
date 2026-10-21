import React from 'react';
import { Contact } from '../types';
import ContactTable from '../components/ContactTable';
import FilterBar from '../components/FilterBar';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDelete,
  onToggleFavorite
}) => {
  const handleQueryShift = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hàm xử lý tìm kiếm (phần nâng cao mục 6)
  };

  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <FilterBar handleQueryShift={handleQueryShift} />
      <ContactTable
        contacts={contacts}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default ContactList;
