function CommetnList({ comments }) {
  // no longer need to fetch comments from comments service

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });
  return <ul>{renderedComments}</ul>;
}

export default CommetnList;
