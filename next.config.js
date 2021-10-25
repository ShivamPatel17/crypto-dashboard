module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/Login',
        permanent: true,
      },
    ]
  },
}
