import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contact } from '../types';
import { GROUPS } from '../data';

interface AddContactProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
}

const AddContact: React.FC<AddContactProps> = ({ contacts, onAddContact }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [group, setGroup] = useState<string>('Bạn bè');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedGroup = group.trim();

    // 1. Kiểm tra ô trống (Mục 4)
    if (!trimmedName || !trimmedPhone || !trimmedEmail || !trimmedGroup) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra số điện thoại (Mục 8.1)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage(
        'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0'
      );
      return;
    }

    // 3. Kiểm tra email (Mục 8.2)
    if (!trimmedEmail.includes('@')) {
      setErrorMessage('Email không hợp lệ');
      return;
    }

    const maxId =
      contacts.length > 0
        ? Math.max(...contacts.map((c) => Number(c.id)))
        : 0;

    const newContact: Contact = {
      id: Number(maxId + 1),
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      group: trimmedGroup,
      favorite: false
    };

    onAddContact(newContact);
    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <h2>Thêm liên hệ mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ tên</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="group">Nhóm</label>
          <select
            id="group"
            value={group}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setGroup(e.target.value)
            }
          >
            {GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Thêm</button>
      </form>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default AddContact;
