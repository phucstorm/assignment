import { Size, User } from '@acme/shared-models';
import { Avatar, Box, ListItemText, Tooltip, Typography } from '@mui/material';

const AVATAR_SIZE_XS = { width: '1.875rem', height: '1.875rem' };
const AVATAR_SIZE_MD = { width: '2rem', height: '2rem' };
const AVATAR_SIZE_LG = { width: '3rem', height: '3rem' };
const AvatarSize = {
  xs: AVATAR_SIZE_XS,
  md: AVATAR_SIZE_MD,
  lg: AVATAR_SIZE_LG,
};

interface UserInfoOptionalProps {
  displayName?: boolean;
  size?: Size;
}

type UserInfoProps = Pick<User, 'name'> & UserInfoOptionalProps;

const UserInfo: React.FC<UserInfoProps> = ({
  name,
  displayName = false,
  size = 'md',
}) => {

  const renderAvatar = () => {
    return (
      <Tooltip title={name} placement="right-start">
        <Box position={'relative'} sx={{ width: AvatarSize[size].width }}>
          <Avatar
            alt={name}
            sx={{
              ...AvatarSize[size],
              position: 'absolute',
              top: -(parseFloat(AvatarSize[size].height) * 16)/ 2,
              left: 0,
            }}
            children={
              <Typography variant="subtitle2">
                {name.split(' ')[0][0]}
              </Typography>
            }
          />
        </Box>
      </Tooltip>
    );
  };
  return (
    <Box display="flex" alignItems="center" gap="0.5rem">
      {renderAvatar()}
      {displayName && <ListItemText>{name}</ListItemText>}
    </Box>
  );
};

export default UserInfo;
