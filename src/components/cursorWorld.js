const cursorWorld = () => {
  const cursors = ['dog', 'planet', 'cactus', 'egg', 'paint', 'tv'];
  const index = Math.floor(Math.random() * cursors.length - 1) + 1;
  return cursors[index];
};

export default cursorWorld;
