import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as useModel from "@tensorflow-models/universal-sentence-encoder";

const Search = ({ bookmarks, setFilteredBookmarks }) => {
  const [query, setQuery] = useState("");
  const [model, setModel] = useState(null);
  const [embeddings, setEmbeddings] = useState([]);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await useModel.load();
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  useEffect(() => {
    async function computeEmbeddings() {
      if (model && bookmarks.length > 0) {
        const sentences = bookmarks.map((b) => b.description || b.title);
        const embeddingData = await model.embed(sentences);
        const embeddingArray = await embeddingData.array(); // ✅ Use `.array()` instead of `.arraySync()`
        setEmbeddings(embeddingArray);
      }
    }
    computeEmbeddings();
  }, [model, bookmarks]);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (!searchTerm) {
      setFilteredBookmarks(bookmarks);
      return;
    }

    if (!model || embeddings.length === 0) return;

    const searchEmbedding = await model.embed([searchTerm]);
    const searchVector = (await searchEmbedding.array())[0]; // ✅ Use `.array()`

    const scores = embeddings.map((embedding, index) => ({
      ...bookmarks[index],
      score: cosineSimilarity(searchVector, embedding),
    }));

    const rankedResults = scores.sort((a, b) => b.score - a.score);
    setFilteredBookmarks(rankedResults);
  };

  function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (normA * normB);
  }

  return (
    <input
      type="text"
      placeholder="🔍 AI Search..."
      value={query}
      onChange={handleSearch}
      className="w-full border p-2 mt-4 rounded-lg"
    />
  );
};

export default Search;
