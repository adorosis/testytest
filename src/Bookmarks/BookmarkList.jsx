const BookmarkList = ({ bookmarks }) => {
  return (
    <div className="mt-4">
      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">No bookmarks yet. Add some!</p>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="p-3 bg-gray-100 rounded-lg flex justify-between"
            >
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium"
              >
                {bookmark.title}
              </a>
              <span className="text-sm text-gray-500">
                [{bookmark.tags.join(", ")}]
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkList;
