import React from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../types';

interface ContactRowProps {
  contact: Contact;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

const ContactRow: React.FC<ContactRowProps> = ({
  contact,
  onDelete,
  onToggleFavorite
}) => {
  const { id, name, phone, email, group, favorite } = contact;

  return (
    <tr className={favorite ? 'favorite-row' : ''}>
      <td>
        <Link to={`/contacts/${id}`}>{name}</Link>
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{group}</td>
      <td>
        <button type="button" onClick={() => onToggleFavorite(id)}>
          {favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        </button>
        <button type="button" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
