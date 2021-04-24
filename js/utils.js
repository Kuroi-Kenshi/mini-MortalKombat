const getRandom = (limiter) => {
  return Math.ceil(Math.random() * limiter);
};

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

export { getRandom, createElement };
