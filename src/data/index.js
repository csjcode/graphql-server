const videoA = {
  id: 'a',
  title: 'Create a GraphQl server',
  duration: '120',
  watched: true,
}

const videoB = {
  id: 'b',
  title: 'Create another GraphQl server',
  duration: '110',
  watched: false,
}

const videos = [videoA,videoB];

const getVideoById = (id) => new Promise((resolve) => {
  const [video] = videos.filter((video) => {
    return video.id === id;
  });
  resolve(video);
})

exports.getVideoById = getVideoById;
