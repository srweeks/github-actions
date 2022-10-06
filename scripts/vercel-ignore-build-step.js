if (process.env.VERCEL_ENV === 'production') {
  console.log('🛑 - Build cancelled')
  return process.exit(0);
} 

process.exit(1);