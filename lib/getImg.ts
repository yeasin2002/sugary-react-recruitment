export const getImg = (url: string | undefined) => {
  const avatarUrl = url ? `https://d1wh1xji6f82aw.cloudfront.net/${url}` : "";
  return avatarUrl;
};
