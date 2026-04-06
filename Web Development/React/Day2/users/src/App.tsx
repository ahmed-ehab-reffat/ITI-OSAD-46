import {useState} from 'react';
import {faker} from '@faker-js/faker';
import type {User} from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import Footer from './components/Footer';

export default function App() {
  const [emailFilter, setEmailFilter] = useState<string>('');

  // switch state logic from filter to array
  // to use should should remove the emailFilter state and it's logic

  // const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // function handleFilter(emailFilter: string) {
  //   setFilteredUsers(
  //     users.filter((user: User) =>
  //       user.email.toLowerCase().includes(emailFilter.toLowerCase())
  //     )
  //   );
  // }

  let filteredUsers = [];
  if (emailFilter === '') {
    filteredUsers = users;
  } else {
    filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(emailFilter.toLowerCase())
    );
  }

  console.log('rendered');
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 py-12 px-4">
      <main className="max-w-6xl mx-auto">
        <Header />

        <SearchBar setEmailFilter={setEmailFilter} />

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredUsers.map((user: User) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No users found matching your search.
            </p>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}

const randomUser = (): User => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  role: faker.helpers.arrayElement(['admin', 'user', 'moderator']),
  image: faker.image.avatarGitHub()
});

const users = faker.helpers.multiple(randomUser, {count: 30});
