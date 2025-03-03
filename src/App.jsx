import { useState } from "react";
import BookmarkForm from "./Bookmarks/BookmarkForm";
import BookmarkList from "./Bookmarks/BookmarkList";
import Search from "./Bookmarks/Search";

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);

  const addBookmark = (bookmark) => {
    setBookmarks((prev) => [...prev, { ...bookmark, id: Date.now() }]);
  };

  return (
    <div className="p-6">
      <BookmarkForm addBookmark={addBookmark} />
      <h1>Testing</h1>
      <Search
        bookmarks={bookmarks}
        setFilteredBookmarks={setFilteredBookmarks}
      />
      <BookmarkList
        bookmarks={filteredBookmarks.length ? filteredBookmarks : bookmarks}
      />
    </div>
  );
};

export default App;
