import React, { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Tất cả');

  // Hàm bắt buộc theo yêu cầu kỹ thuật của đề
  const handleQueryShift = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value);
  };

  // Lọc theo cả ô tìm kiếm (tên hoặc số điện thoại) và nhóm
  const query = searchQuery.trim().toLowerCase();
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      query === '' ||
      contact.name.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query);

    const matchesGroup =
      selectedGroup === 'Tất cả' || contact.group === selectedGroup;

    return matchesSearch && matchesGroup;
  });

  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <FilterBar
        searchQuery={searchQuery}
        handleQueryShift={handleQueryShift}
        selectedGroup={selectedGroup}
        onGroupChange={handleGroupChange}
      />
      <div>
        <p>Tìm thấy {filteredContacts.length} liên hệ</p>
      </div>
      <ContactTable
        contacts={filteredContacts}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default ContactList;
