import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useAppSelector } from 'client/src/hooks';
import React, { useEffect, useState } from 'react';
import { UserInfo } from '../UserInfo';

interface SelectAssigneeProps {
  value: number;
  onChange: (assigneeId: number) => void;
}
const SelectAssignee: React.FC<SelectAssigneeProps> = ({ value, onChange }) => {
  const [selected, setSelected] = useState(0);
  const users = useAppSelector((state) => state.users.list);

  useEffect(() => {
    setSelected(value ?? 0)
  },[value])

  const onChangeAssignee = (e: SelectChangeEvent<number>) => {
    setSelected(Number(e.target.value));
    onChange(Number(e.target.value));
  };

  return (
    <FormControl size="small" fullWidth>
      <Select value={selected} onChange={onChangeAssignee}>
        <MenuItem value={0}>
          <UserInfo name={'Unassigned'} displayName size="xs" />
        </MenuItem>
        {users &&
          users.map((user) => (
            <MenuItem value={user.id}>
              <UserInfo name={user.name} displayName size="xs" />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectAssignee;
