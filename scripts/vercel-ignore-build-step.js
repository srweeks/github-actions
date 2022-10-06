if (process.env.VERCEL_ENV === 'production') {
  console.log('🛑 - Build cancelled')
  return 0;
}

return 1;