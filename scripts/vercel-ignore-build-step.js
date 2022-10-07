if (process.env.VERCEL_ENV === 'production' && !process.env.VERCEL_GIT_COMMIT_SHA) {
  console.log('🛑 - Build cancelled')
  return process.exit(0);
} 

process.exit(1);