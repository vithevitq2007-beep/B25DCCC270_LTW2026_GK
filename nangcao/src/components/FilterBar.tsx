import React from 'react';
import { GROUPS } from '../data';

interface FilterBarProps {
  searchQuery: string;
  handleQueryShift: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedGroup: string;
  onGroupChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  handleQueryShift,
  selectedGroup,
  onGroupChange
}) => {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="search">Tìm kiếm</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleQueryShift}
          placeholder="Tìm theo tên hoặc số điện thoại..."
        />
      </div>

      <div>
        <label htmlFor="groupFilter">Nhóm</label>
        <select
          id="groupFilter"
          value={selectedGroup}
          onChange={onGroupChange}
        >
          <option value="Tất cả">Tất cả</option>
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
