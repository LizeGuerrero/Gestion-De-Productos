import { User } from '../types/superuseradmin';

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => onDelete(user._id)}>Eliminar</button>
                {/* Aquí puedes agregar un botón de editar si lo necesitas */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
