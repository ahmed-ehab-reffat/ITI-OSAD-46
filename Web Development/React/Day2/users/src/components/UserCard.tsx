import type {User} from '../types';

type Props = {
  user: User;
};

const roleColors: Record<User['role'], string> = {
  admin: 'bg-red-100 text-red-800',
  user: 'bg-blue-100 text-blue-800',
  moderator: 'bg-purple-100 text-purple-800'
};

export default function UserCard({user}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative w-full h-48 bg-linear-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {user.name}
            </h3>
            <p className="text-xs text-gray-400">ID: {user.id}</p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${roleColors[user.role]}`}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>

        <div className="space-y-2 flex-1">
          <div className="group">
            <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
            <a
              href={`mailto:${user.email}`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all transition-colors font-medium"
            >
              {user.email}
            </a>
          </div>
          <div className="group">
            <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
            <a
              href={`tel:${user.phone}`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
            >
              {user.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
