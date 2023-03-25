export default function isError(error) {
  if (error && error.stack && error.message) {
    return true;
  }

  return false;
}