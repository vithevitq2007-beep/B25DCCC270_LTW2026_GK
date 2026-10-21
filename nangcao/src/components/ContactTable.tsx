import React from 'react';
import { Contact } from '../types';
import ContactRow from './ContactRow';

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onDelete,
  onToggleFavorite
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Nhóm</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: 'center' }}>
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContactTable;
