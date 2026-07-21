function formatUser(raw) {
    return {
      id:       raw.user_id,
      fullName: `${raw.first_name} ${raw.last_name}`,
      email:    raw.email_address.toLowerCase(),
      isAdmin:  raw.role === 'admin',
    };
  }
  
  module.exports = { formatUser };