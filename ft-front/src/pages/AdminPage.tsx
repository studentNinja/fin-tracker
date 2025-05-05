import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ADMIN_URL || 'http://localhost:8081/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface GetUsersData {
  allUsers: User[];
}

interface DeleteUserData {
  deleteUser: string;
}

interface DeleteUserVars {
  id: string;
}

const GET_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      username
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const AdminUserList: React.FC = () => {
  const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);
  const [deleteUser] = useMutation<DeleteUserData, DeleteUserVars>(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    awaitRefetchQueries: true
  });

  const handleDelete = React.useCallback((id: string) => {
    deleteUser({ variables: { id } });
  }, [deleteUser]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  const users = data?.allUsers ?? [];
  const userCount = users.length;

  return (
    <div className="dashboard-container admin-page-container shadow">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Users ({userCount})
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

const AdminUserListWrapper: React.FC = () => (
  <ApolloProvider client={client}>
    <AdminUserList />
  </ApolloProvider>
);

export default AdminUserListWrapper;
