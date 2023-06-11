const userSchema = [
  {
    id: 1,
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikd1aWxoZXJtZSBERVYiLCJlbWFpbCI6Imd1aWxoZXJtZS5nZG0xQGdtYWlsLmNvbSJ9.P_MNTNih1PG9bvyGon6wPCPmpFKBLQDkYw6XWU6A5Ys",
    permissions: {
      updateUsers: true,
      deleteUsers: true,
    },
  },
];

module.exports = userSchema;
